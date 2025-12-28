export interface College {
  name: string;
  location: string;
  city: string;
  state: string;
  
  // Admissions
  acceptanceRate: number;
  edAcceptanceRate: string;
  regularAcceptanceRate: string;
  intlAcceptanceRate: number;
  rawIntlStr: string;
  demonstratedInterest: string;
  
  // Test Scores
  satMath25: number;
  satMath75: number;
  satRW25: number;
  satRW75: number;
  act25: number;
  act75: number;
  percentSubmittingSAT: string;
  percentSubmittingACT: string;
  
  // Financials
  costOfAttendance: number;
  costDisplay: string;
  needMet: number;
  rawNeedStr: string;
  meritAidPercent: number;
  avgMeritAward: string;
  avgNeedBasedGrant: string;
  
  // Demographics
  enrollment: number;
  percentIntl: number;
  percentFemale: string;
  percentMale: string;
  percentAsian: string;
  percentAfrican: string;
  percentHispanic: string;
  percentWhite: string;
  
  // Campus
  housingReq: string;
  livingOnCampus: string;
  weatherJan: number;
  sunnyDays: string;
  precipDays: string;
  
  // Outcomes
  retentionRate: string;
  gradRate4: string;
  gradRate6: string;
  earnings6yr: string;
  earnings10yr: string;
  roi20yr: string;
  csSalary: string;
  
  // Deadlines
  deadlineStatus: 'red' | 'orange' | 'gray';
  daysLeft: number;
  deadlineDate: Date | null;
  deadlineDisplay: string;
  deadlineLabel: string;
  
  // App deadlines
  ea1: string;
  ea2: string;
  ed1: string;
  ed2: string;
  rd: string;
  
  // Raw data
  raw: Record<string, string>;
  privateSchool?: boolean; // Optional flag if derived
}

export interface Filters {
  search: string;
  
  // 1. Admissions & Selectivity
  maxAcceptance: number;
  minIntlAcceptance: number; // NEW FILTER
  testOptional: boolean;
  minSatSubmit: number;
  minActSubmit: number;
  demonstratedInterest: string;
  
  // 2. Financials & Affordability
  maxCost: number;
  minNeedMet: number;
  minMeritPercent: number;
  minAvgMerit: number;
  minRoi: number;
  
  // 3. Application Details
  deadline: string; // Values: 'all', 'jan-1-5', 'jan-6-10', 'jan-11-15', 'jan-16-feb-1', 'feb-2-plus'
  appType: string[];
  scoirFree: boolean;
  noEssays: boolean;
  maxDetScore: number;
  
  // 4. Location & Environment
  minJanTemp: number;
  minSunnyDays: number;
  maxPrecipDays: number;
  
  // 5. Student Body
  minEnrollment: number;
  minIntl: number;
  
  // 6. Academics
  minGradRate: number;
  minRetention: number;
  
  // 7. Campus Life
  minOnCampus: number;
  housingRequired: boolean;
}
