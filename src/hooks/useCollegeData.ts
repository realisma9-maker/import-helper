import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { College, Filters } from '@/types/college';
import { COLLEGE_CSV_DATA } from '@/data/college_data';
import { APP_DEADLINES_CSV } from '@/data/deadline_data';
import { COST_DATA_CSV } from '@/data/cost_data';
import { ENGLISH_PROFICIENCY_DATA } from '@/data/english_proficiency_data';
import { REQUIREMENTS_DATA } from '@/data/requirements_data';
import { NO_ESSAY_COLLEGES, FULL_NEED_MET_INTL, SCOIR_FREE_APP, SCHOLARSHIP_DATA } from '@/data/scholarship_data';
import { CURATED_UNIVERSITIES } from '@/data/curated_data';
import { INTERVIEW_DATA } from '@/data/interview_data';
import { WEBSITE_DATA } from '@/data/website_data';
import { COST_BREAKDOWN_DATA } from '@/data/cost_breakdown_data';
import { useToast } from '@/hooks/use-toast';

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

const INITIAL_FILTERS: Filters = {
  search: '',
  maxAcceptance: 100,
  minIntlAcceptance: 0, // NEW DEFAULT
  testOptional: false,
  minSatSubmit: 0,
  minActSubmit: 0,
  demonstratedInterest: 'Any',
  maxCost: 100000,
  minNeedMet: 0,
  minMeritPercent: 0,
  minAvgMerit: 0,
  minRoi: 0,
  deadline: 'all',
  appType: [],
  scoirFree: false,
  noEssays: false,
  maxDetScore: 160,
  minJanTemp: 0,
  minSunnyDays: 0,
  maxPrecipDays: 365,
  minEnrollment: 0,
  minIntl: 0,
  minGradRate: 0,
  minRetention: 0,
  minOnCampus: 0,
  housingRequired: false
};

export const useCollegeData = () => {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<Filters>(() => {
    try {
      const saved = sessionStorage.getItem('smartApply_filters');
      return saved ? JSON.parse(saved) : INITIAL_FILTERS;
    } catch (e) {
      return INITIAL_FILTERS;
    }
  });

  useEffect(() => {
    sessionStorage.setItem('smartApply_filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
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

        Papa.parse(COLLEGE_CSV_DATA, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            try {
              const colleges = results.data
                .map((row: any) => processCollegeRow(row, deadlinesMap, costMap))
                .filter((c): c is College => c !== null && c.name !== '');
              
              colleges.sort((a, b) => a.daysLeft - b.daysLeft);
              setAllColleges(colleges);
              setLoading(false);
            } catch (processError) {
              console.error("Error processing data", processError);
              setError("Data Error");
              setLoading(false);
            }
          },
          error: () => {
            setError("Failed to load CSV");
            setLoading(false);
          }
        });
      } catch (e) {
        setError("Unknown Error");
        setLoading(false);
      }
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

    let costRaw = get('Cost of Attendance');
    let maxCost = 0;
    if (costRaw.includes('(OS)')) {
      const parts = costRaw.split('/');
      const osPart = parts.find(p => p.includes('(OS)')) || parts[1] || '';
      maxCost = parseNum(osPart);
    } else {
      maxCost = parseNum(costRaw);
    }

    const satMath = parseRange(get('SAT Math (25th-75th)'));
    const satRW = parseRange(get('SAT R/W (25th-75th)'));
    const act = parseRange(get('ACT (25th-75th)'));

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
      
      raw: row,
      // Note: We are no longer calculating/using privateSchool flag here explicitly as we removed the badge
    };
  };

  const filteredColleges = useMemo(() => {
    return allColleges.filter(c => {
      // 0. Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!c.name.toLowerCase().includes(q) &&
            !c.location.toLowerCase().includes(q) &&
            !c.state.toLowerCase().includes(q)) {
          return false;
        }
      }

      // 1. Admissions
      if (filters.maxAcceptance < 100 && c.acceptanceRate !== -1 && c.acceptanceRate > filters.maxAcceptance) return false;
      
      // NEW: International Acceptance Rate Filter
      if (filters.minIntlAcceptance > 0 && c.intlAcceptanceRate !== -1 && c.intlAcceptanceRate < filters.minIntlAcceptance) return false;

      if (filters.testOptional) {
        const subSAT = parseFloat(c.percentSubmittingSAT);
        const isBlind = c.percentSubmittingSAT.includes('Blind');
        if (!isBlind && (isNaN(subSAT) || subSAT > 30)) return false;
      }
      if (filters.minSatSubmit > 0) {
        const val = parseFloat(c.percentSubmittingSAT);
        if (isNaN(val) || val < filters.minSatSubmit) return false;
      }
      if (filters.minActSubmit > 0) {
        const val = parseFloat(c.percentSubmittingACT);
        if (isNaN(val) || val < filters.minActSubmit) return false;
      }
      if (filters.demonstratedInterest !== 'Any') {
        if (!c.demonstratedInterest.includes(filters.demonstratedInterest)) return false;
      }

      // 2. Financials
      if (filters.maxCost < 100000 && c.costOfAttendance !== -1 && c.costOfAttendance > filters.maxCost) return false;
      if (filters.minNeedMet > 0 && c.needMet !== -1 && c.needMet < filters.minNeedMet) return false;
      if (filters.minMeritPercent > 0 && c.meritAidPercent !== -1 && c.meritAidPercent < filters.minMeritPercent) return false;
      if (filters.minAvgMerit > 0) {
        const val = parseNum(c.avgMeritAward);
        if (val !== -1 && val < filters.minAvgMerit) return false;
      }
      if (filters.minRoi > 0) {
        const val = parseNum(c.roi20yr);
        if (val !== -1 && val < filters.minRoi) return false;
      }

      // 3. Application
      if (filters.scoirFree && !SCOIR_FREE_APP.has(c.name)) return false;
      if (filters.noEssays && !NO_ESSAY_COLLEGES.has(c.name)) return false;
      if (filters.maxDetScore < 160) {
        const detStr = ENGLISH_PROFICIENCY_DATA[c.name]?.DET;
        const det = parseNum(detStr);
        if (det !== -1 && det > filters.maxDetScore) return false;
      }
      if (filters.appType.length > 0) {
        let hasType = false;
        if (filters.appType.includes('ED1') && c.ed1 !== '-') hasType = true;
        if (filters.appType.includes('ED2') && c.ed2 !== '-') hasType = true;
        if (filters.appType.includes('EA') && (c.ea1 !== '-' || c.ea2 !== '-')) hasType = true;
        if (filters.appType.includes('RD') && c.rd !== '-') hasType = true;
        if (!hasType) return false;
      }
      
      // NEW: Specific Deadline Date Ranges
      if (filters.deadline !== 'all' && c.deadlineDate) {
        const m = c.deadlineDate.getMonth(); // 0-indexed (0 = Jan, 1 = Feb)
        const d = c.deadlineDate.getDate();
        
        // jan 1-5
        if (filters.deadline === 'jan-1-5') {
          if (m !== 0 || d < 1 || d > 5) return false;
        }
        // jan 6-10
        else if (filters.deadline === 'jan-6-10') {
          if (m !== 0 || d < 6 || d > 10) return false;
        }
        // jan 11-15
        else if (filters.deadline === 'jan-11-15') {
          if (m !== 0 || d < 11 || d > 15) return false;
        }
        // jan 16 - feb 1
        else if (filters.deadline === 'jan-16-feb-1') {
          // Keep if Month is Jan (0) and Day >= 16 OR Month is Feb (1) and Day <= 1
          const isJanLate = m === 0 && d >= 16;
          const isFeb1 = m === 1 && d <= 1;
          if (!isJanLate && !isFeb1) return false;
        }
        // feb 2 - rest
        else if (filters.deadline === 'feb-2-plus') {
          // Keep if Month is Feb (1) and Day >= 2 OR Month > Feb
          const isFebRest = m === 1 && d >= 2;
          const isLater = m > 1;
          if (!isFebRest && !isLater) return false;
        }
      }

      // 4. Location
      if (filters.minJanTemp > 0 && c.weatherJan !== -1 && c.weatherJan < filters.minJanTemp) return false;
      if (filters.minSunnyDays > 0) {
        const val = parseNum(c.sunnyDays);
        if (val !== -1 && val < filters.minSunnyDays) return false;
      }
      if (filters.maxPrecipDays < 365) {
        const val = parseNum(c.precipDays);
        if (val !== -1 && val > filters.maxPrecipDays) return false;
      }

      // 5. Demographics
      if (filters.minEnrollment > 0 && c.enrollment !== -1 && c.enrollment < filters.minEnrollment) return false;
      if (filters.minIntl > 0 && c.percentIntl !== -1 && c.percentIntl < filters.minIntl) return false;

      // 6. Academics
      if (filters.minGradRate > 0) {
        const val = parseNum(c.gradRate4, true);
        if (val !== -1 && val < filters.minGradRate) return false;
      }
      if (filters.minRetention > 0) {
        const val = parseNum(c.retentionRate, true);
        if (val !== -1 && val < filters.minRetention) return false;
      }

      // 7. Campus
      if (filters.minOnCampus > 0) {
        const val = parseNum(c.livingOnCampus, true);
        if (val !== -1 && val < filters.minOnCampus) return false;
      }
      if (filters.housingRequired && (!c.housingReq || c.housingReq === 'None' || c.housingReq === 'Not Reported')) return false;

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
    error,
    filters,
    setFilters,
    NO_ESSAY_COLLEGES,
    FULL_NEED_MET_INTL,
    SCOIR_FREE_APP,
    ENGLISH_PROFICIENCY_DATA,
    REQUIREMENTS_DATA,
    INTERVIEW_DATA,
    WEBSITE_DATA,
    SCHOLARSHIP_DATA,
    COST_BREAKDOWN_DATA
  };
};
