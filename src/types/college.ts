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
}

export interface Filters {
  search: string;
  deadline: string;
  maxAcceptance: number;
  testOptional: boolean;
  maxCost: number;
  minNeedMet: number;
  minIntl: number;
  housingRequired: boolean;
  minJanTemp: number;
}
