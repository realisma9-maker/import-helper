import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { College, Filters } from '@/types/college';
import { 
  COLLEGE_CSV_DATA, 
  APP_DEADLINES_CSV, 
  COST_DATA_CSV,
  ENGLISH_PROFICIENCY_DATA,
  NO_ESSAY_COLLEGES,
  FULL_NEED_MET_INTL,
  CURATED_UNIVERSITIES
} from '@/data/collegeData';

const parseNum = (val: string | undefined, isPercent = false): number => {
  if (!val || val === 'Not Reported' || val === 'N/A' || val.includes('Test Blind')) return -1;
  const clean = val.replace(/[^0-9.]/g, '');
  const num = parseFloat(clean);
  if (isNaN(num)) return -1;
  return num;
};

const parseRange = (val: string | undefined): { min: number; max: number } => {
  if (!val || !val.includes('-')) return { min: -1, max: -1 };
  const parts = val.split('-');
  return {
    min: parseFloat(parts[0]) || -1,
    max: parseFloat(parts[1]) || -1
  };
};

export const useCollegeData = () => {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    deadline: 'all',
    maxAcceptance: 100,
    testOptional: false,
    maxCost: 100000,
    minNeedMet: 0,
    minIntl: 0,
    housingRequired: false,
    minJanTemp: 0
  });

  useEffect(() => {
    const loadData = async () => {
      // Parse deadlines
      const deadlinesMap: Record<string, any> = {};
      Papa.parse(APP_DEADLINES_CSV, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          results.data.forEach((row: any) => {
            if (row['University']) {
              deadlinesMap[row['University'].trim()] = row;
            }
          });
        }
      });

      // Parse cost data
      const costMap: Record<string, any> = {};
      Papa.parse(COST_DATA_CSV, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          results.data.forEach((row: any) => {
            if (row['University']) {
              costMap[row['University'].trim()] = row;
            }
          });
        }
      });

      // Parse main college data
      Papa.parse(COLLEGE_CSV_DATA, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const colleges = results.data
            .map((row: any) => processCollegeRow(row, deadlinesMap, costMap))
            .filter((c): c is College => c !== null && c.name !== '');
          
          colleges.sort((a, b) => a.daysLeft - b.daysLeft);
          setAllColleges(colleges);
          setLoading(false);
        }
      });
    };

    loadData();
  }, []);

  const processCollegeRow = (
    row: Record<string, string>, 
    deadlinesMap: Record<string, any>,
    costMap: Record<string, any>
  ): College | null => {
    const get = (key: string) => row[key] || 'Not Reported';
    const name = get('Institution');
    
    if (!name || name === 'Not Reported') return null;

    const appData = deadlinesMap[name] || {};
    const costData = costMap[name] || {};

    // Parse cost
    let costRaw = get('Cost of Attendance');
    let maxCost = 0;
    if (costRaw.includes('(OS)')) {
      const parts = costRaw.split('/');
      const osPart = parts.find(p => p.includes('(OS)')) || parts[1] || '';
      maxCost = parseNum(osPart);
    } else {
      maxCost = parseNum(costRaw);
    }

    // Parse test scores
    const satMath = parseRange(get('SAT Math (25th-75th)'));
    const satRW = parseRange(get('SAT R/W (25th-75th)'));
    const act = parseRange(get('ACT (25th-75th)'));

    // Calculate deadline
    let countdownStr = appData['RD'] && appData['RD'] !== '-' ? appData['RD'] : get('Regular Decision Decision');
    let daysLeft = 999;
    let status: 'red' | 'orange' | 'gray' = 'gray';
    let deadlineDate: Date | null = null;
    const isAppDeadline = !!(appData['RD'] && appData['RD'] !== '-');

    if (countdownStr && countdownStr.length > 3 && countdownStr !== 'Not Reported' && !countdownStr.toLowerCase().includes('rolling')) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const monthMap: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

      const parts = countdownStr.toLowerCase().split(/[\s-]+/);
      const monthStr = parts[0].substring(0, 3);
      const day = parseInt(parts[1]);

      if (monthMap[monthStr] !== undefined) {
        const month = monthMap[monthStr];
        let targetYear = currentYear;
        if (month < 6 && today.getMonth() > 5) {
          targetYear = currentYear + 1;
        }

        deadlineDate = new Date(targetYear, month, day);
        const diffTime = deadlineDate.getTime() - today.getTime();
        daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (daysLeft < 0) status = 'gray';
        else if (daysLeft <= 14) status = 'red';
        else status = 'orange';
      }
    }

    return {
      name,
      location: `${get('City')}, ${get('State')}`,
      city: get('City'),
      state: get('State'),
      
      acceptanceRate: parseNum(get('Overall Acceptance Rate'), true),
      edAcceptanceRate: get('ED Acceptance Rate'),
      regularAcceptanceRate: get('Regular Acceptance Rate'),
      intlAcceptanceRate: parseNum(get('International Student Acceptance Rate'), true),
      rawIntlStr: get('International Student Acceptance Rate'),
      demonstratedInterest: get('Demonstrated Interest'),
      
      satMath25: satMath.min,
      satMath75: satMath.max,
      satRW25: satRW.min,
      satRW75: satRW.max,
      act25: act.min,
      act75: act.max,
      percentSubmittingSAT: get('% Submitting SAT'),
      percentSubmittingACT: get('% Submitting ACT'),
      
      costOfAttendance: maxCost,
      costDisplay: get('Cost of Attendance'),
      needMet: parseNum(get('% of Need Met'), true),
      rawNeedStr: get('% of Need Met'),
      meritAidPercent: parseNum(get('% Receiving Merit Aid (No Need)'), true),
      avgMeritAward: get('Avg Merit Award'),
      avgNeedBasedGrant: get('Avg Need-Based Grant'),
      
      enrollment: parseNum(get('Total Undergraduate Enrollment')),
      percentIntl: parseNum(get('% International'), true),
      percentFemale: get('% Female'),
      percentMale: get('% Male'),
      percentAsian: get('% Asian'),
      percentAfrican: get('% African-American'),
      percentHispanic: get('% Hispanic'),
      percentWhite: get('% White'),
      
      housingReq: get('On-Campus Housing Requirement'),
      livingOnCampus: get('% Living On-Campus'),
      weatherJan: parseInt(get('Avg Jan Temp')) || -1,
      sunnyDays: get('Sunny Days'),
      precipDays: get('Days w/ Precipitation'),
      
      retentionRate: get('Freshman Retention Rate'),
      gradRate4: get('4-Year Graduation Rate'),
      gradRate6: get('6-Year Graduation Rate'),
      earnings6yr: get('Median Earnings (6 Years)'),
      earnings10yr: get('Median Earnings (10 Years)'),
      roi20yr: get('20-Year Net ROI'),
      csSalary: get('Computer Science Graduate Median Starting Salary'),
      
      deadlineStatus: status,
      daysLeft,
      deadlineDate,
      deadlineDisplay: countdownStr || 'Rolling/Unknown',
      deadlineLabel: isAppDeadline ? 'App Deadline' : 'Fin Aid Deadline',
      
      ea1: appData['EA1'] || '-',
      ea2: appData['EA2'] || '-',
      ed1: appData['ED1'] || '-',
      ed2: appData['ED2'] || '-',
      rd: appData['RD'] || '-',
      
      raw: row
    };
  };

  const filteredColleges = useMemo(() => {
    return allColleges.filter(c => {
      // Search filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!c.name.toLowerCase().includes(q) &&
            !c.location.toLowerCase().includes(q) &&
            !c.state.toLowerCase().includes(q)) {
          return false;
        }
      }

      // Deadline filter
      if (filters.deadline !== 'all' && c.deadlineDate) {
        const m = c.deadlineDate.getMonth();
        const d = c.deadlineDate.getDate();
        if (filters.deadline === 'jan-1-5' && (m !== 0 || d > 5)) return false;
        if (filters.deadline === 'jan-6-10' && (m !== 0 || d < 6 || d > 10)) return false;
        if (filters.deadline === 'jan-11-15' && (m !== 0 || d < 11 || d > 15)) return false;
        if (filters.deadline === 'feb-plus' && m < 1) return false;
      }

      // Acceptance rate filter
      if (filters.maxAcceptance < 100 && c.acceptanceRate !== -1 && c.acceptanceRate > filters.maxAcceptance) {
        return false;
      }

      // Test optional filter
      if (filters.testOptional) {
        const subSAT = parseFloat(c.percentSubmittingSAT);
        const isBlind = c.percentSubmittingSAT.includes('Blind');
        if (!isBlind && (isNaN(subSAT) || subSAT > 30)) return false;
      }

      // Cost filter
      if (filters.maxCost < 100000 && c.costOfAttendance !== -1 && c.costOfAttendance > filters.maxCost) {
        return false;
      }

      // Need met filter
      if (filters.minNeedMet > 0 && c.needMet !== -1 && c.needMet < filters.minNeedMet) {
        return false;
      }

      // International % filter
      if (filters.minIntl > 0 && c.percentIntl !== -1 && c.percentIntl < filters.minIntl) {
        return false;
      }

      // Housing filter
      if (filters.housingRequired && (!c.housingReq || c.housingReq === 'None' || c.housingReq === 'Not Reported')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const aDays = a.daysLeft < 0 ? 9999 : a.daysLeft;
      const bDays = b.daysLeft < 0 ? 9999 : b.daysLeft;
      return aDays - bDays;
    });
  }, [allColleges, filters]);

  const curatedColleges = useMemo(() => {
    return filteredColleges.filter(c => CURATED_UNIVERSITIES.has(c.name));
  }, [filteredColleges]);

  return {
    allColleges,
    filteredColleges,
    curatedColleges,
    loading,
    filters,
    setFilters,
    NO_ESSAY_COLLEGES,
    FULL_NEED_MET_INTL,
    ENGLISH_PROFICIENCY_DATA
  };
};
