import { ArrowLeft, MapPin, GraduationCap, Users, DollarSign, Thermometer, TrendingUp, Award, BookOpen, Globe, ExternalLink, Video, PenOff, FileText, Wallet } from 'lucide-react';
import { College } from '@/types/college';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CollegeDetailProps {
  college: College;
  onBack: () => void;
  englishData?: { TOEFL: string; IELTS: string; DET: string; Other: string };
  requirementsData?: { teacherRecs: number; counselorRec: boolean; schoolReport: boolean };
  interviewData?: { admOfficer: boolean; alumni: boolean };
  websiteUrl?: string;
  hasScoir?: boolean;
  hasNoEssay?: boolean;
}

const StatItem = ({ label, value, highlight, className }: { label: string; value: string; highlight?: boolean; className?: string }) => (
  <div className={cn("space-y-1", className)}>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={cn("font-semibold", highlight && "text-accent-green")}>{value}</p>
  </div>
);

const Section = ({ title, icon: Icon, children, className }: { title: string; icon: React.ElementType; children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-6 shadow-card", className)}>
    <h2 className="flex items-center gap-2 font-heading text-lg font-bold mb-4">
      <Icon className="w-5 h-5 text-primary" />
      {title}
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

export const CollegeDetail = ({ 
  college, 
  onBack, 
  englishData, 
  requirementsData,
  interviewData,
  websiteUrl,
  hasScoir,
  hasNoEssay
}: CollegeDetailProps) => {
  const c = college;

  return (
    <div className="min-h-screen bg-app-gradient">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="bg-card rounded-2xl p-8 shadow-card mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="font-heading text-3xl font-extrabold text-foreground">{c.name}</h1>
              <p className="flex items-center gap-2 text-muted-foreground mt-2">
                <MapPin className="w-4 h-4" />
                {c.location}
              </p>
              
              {/* Quick badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {hasNoEssay && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-green-light text-accent-green text-sm font-medium rounded-full">
                    <PenOff className="w-4 h-4" /> No Supplement Essays
                  </span>
                )}
                {hasScoir && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-medium rounded-full">
                    <ExternalLink className="w-4 h-4" /> Free App via Scoir
                  </span>
                )}
              </div>
              
              {/* Website Link */}
              {websiteUrl && (
                <a 
                  href={websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Official Website
                </a>
              )}
            </div>
            <div className={cn(
              "flex flex-col items-center justify-center px-6 py-4 rounded-xl min-w-[100px] text-center",
              c.deadlineStatus === 'red' && 'badge-red',
              c.deadlineStatus === 'orange' && 'badge-orange',
              c.deadlineStatus === 'gray' && 'badge-gray'
            )}>
              <span className="text-2xl font-bold">
                {c.daysLeft > 900 ? 'N/A' : (c.daysLeft < 0 ? 'Passed' : c.daysLeft)}
              </span>
              <span className="text-xs uppercase tracking-wide opacity-80">
                {c.daysLeft < 0 ? 'Deadline' : (c.daysLeft > 900 ? 'Rolling' : 'Days Left')}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Admissions */}
          <Section title="Admissions" icon={GraduationCap}>
            <StatItem label="Overall Acceptance" value={c.raw['Overall Acceptance Rate'] || 'N/A'} />
            <StatItem label="Early Decision" value={c.edAcceptanceRate} />
            <StatItem label="Regular Decision" value={c.regularAcceptanceRate} />
            <StatItem label="International" value={c.rawIntlStr} highlight={c.intlAcceptanceRate > 20} />
            <StatItem label="Demonstrated Interest" value={c.demonstratedInterest} />
            <StatItem label="SAT Math (25-75th)" value={c.satMath25 > 0 ? `${c.satMath25}-${c.satMath75}` : 'N/A'} />
            <StatItem label="SAT R/W (25-75th)" value={c.satRW25 > 0 ? `${c.satRW25}-${c.satRW75}` : 'N/A'} />
            <StatItem label="ACT (25-75th)" value={c.act25 > 0 ? `${c.act25}-${c.act75}` : 'N/A'} />
          </Section>

          {/* Test Score Submission */}
          <Section title="Test Score Submission" icon={FileText}>
            <StatItem label="% Submitting SAT" value={c.percentSubmittingSAT} />
            <StatItem label="% Submitting ACT" value={c.percentSubmittingACT} />
            <StatItem label="Test Policy" value={c.percentSubmittingSAT.includes('Blind') ? 'Test Blind' : (parseFloat(c.percentSubmittingSAT) < 50 ? 'Test Optional' : 'Test Required/Recommended')} />
          </Section>

          {/* Interview Info */}
          {interviewData && (
            <Section title="Interview Options" icon={Video}>
              <StatItem 
                label="Admissions Officer Interview" 
                value={interviewData.admOfficer ? 'Available' : 'Not Offered'} 
                highlight={interviewData.admOfficer}
              />
              <StatItem 
                label="Alumni Interview" 
                value={interviewData.alumni ? 'Available' : 'Not Offered'} 
                highlight={interviewData.alumni}
              />
              <StatItem 
                label="Interview Required" 
                value={interviewData.admOfficer || interviewData.alumni ? 'Optional/Recommended' : 'Not Required'} 
              />
            </Section>
          )}

          {/* Application Deadlines */}
          <Section title="Application Deadlines" icon={BookOpen}>
            <StatItem label="Early Action I" value={c.ea1} />
            <StatItem label="Early Action II" value={c.ea2} />
            <StatItem label="Early Decision I" value={c.ed1} />
            <StatItem label="Early Decision II" value={c.ed2} />
            <StatItem label="Regular Decision" value={c.rd} />
          </Section>

          {/* Full Cost Breakdown */}
          <Section title="Full Cost Breakdown" icon={Wallet}>
            <StatItem label="Total Cost of Attendance" value={c.costDisplay} />
            <StatItem label="Estimated Tuition & Fees" value={c.raw['Tuition and Fees'] || c.costDisplay.split('/')[0] || 'N/A'} />
            <StatItem label="Room & Board" value={c.raw['Room and Board'] || 'N/A'} />
            <StatItem label="Books & Supplies" value={c.raw['Books and Supplies'] || '~$1,000'} />
            <StatItem label="Personal Expenses" value={c.raw['Personal Expenses'] || 'Varies'} />
            <StatItem label="In-State vs Out-of-State" value={c.costDisplay.includes('/') ? 'Different rates' : 'Same for all'} />
          </Section>

          {/* Financial Aid */}
          <Section title="Financial Aid" icon={DollarSign}>
            <StatItem label="% of Need Met" value={c.rawNeedStr} highlight={c.needMet >= 90} />
            <StatItem label="Merit Aid %" value={c.meritAidPercent > 0 ? `${c.meritAidPercent}%` : 'N/A'} />
            <StatItem label="Avg Merit Award" value={c.avgMeritAward} />
            <StatItem label="Avg Need-Based Grant" value={c.avgNeedBasedGrant} />
          </Section>

          {/* Demographics */}
          <Section title="Demographics" icon={Users}>
            <StatItem label="Total Enrollment" value={c.enrollment > 0 ? c.enrollment.toLocaleString() : 'N/A'} />
            <StatItem label="% International" value={c.percentIntl > 0 ? `${c.percentIntl}%` : 'N/A'} />
            <StatItem label="% Female" value={c.percentFemale} />
            <StatItem label="% Male" value={c.percentMale} />
            <StatItem label="% Asian" value={c.percentAsian} />
            <StatItem label="% African-American" value={c.percentAfrican} />
            <StatItem label="% Hispanic" value={c.percentHispanic} />
            <StatItem label="% White" value={c.percentWhite} />
          </Section>

          {/* Campus */}
          <Section title="Campus Life" icon={Thermometer}>
            <StatItem label="Housing Requirement" value={c.housingReq} />
            <StatItem label="% Living On-Campus" value={c.livingOnCampus} />
            <StatItem label="Jan Avg Temp" value={c.raw['Avg Jan Temp'] || 'N/A'} />
            <StatItem label="July Avg Temp" value={c.raw['Avg July Temp'] || 'N/A'} />
            <StatItem label="Sunny Days/Year" value={c.sunnyDays} />
            <StatItem label="Precip Days/Year" value={c.precipDays} />
          </Section>

          {/* Outcomes */}
          <Section title="Outcomes" icon={TrendingUp}>
            <StatItem label="Freshman Retention" value={c.retentionRate} highlight={parseFloat(c.retentionRate) > 90} />
            <StatItem label="4-Year Grad Rate" value={c.gradRate4} />
            <StatItem label="6-Year Grad Rate" value={c.gradRate6} />
            <StatItem label="Median Earnings (6yr)" value={c.earnings6yr} />
            <StatItem label="Median Earnings (10yr)" value={c.earnings10yr} />
            <StatItem label="20-Year Net ROI" value={c.roi20yr} />
            {c.csSalary && <StatItem label="CS Starting Salary" value={c.csSalary} />}
          </Section>

          {/* English Requirements */}
          {englishData && (
            <Section title="English Proficiency Requirements" icon={Globe}>
              <StatItem label="TOEFL" value={englishData.TOEFL} />
              <StatItem label="IELTS" value={englishData.IELTS} />
              <StatItem label="Duolingo (DET)" value={englishData.DET} />
              <div className="col-span-full">
                <p className="text-xs text-muted-foreground">Other</p>
                <p className="text-sm">{englishData.Other}</p>
              </div>
            </Section>
          )}

          {/* Application Requirements */}
          {requirementsData && (
            <Section title="Application Requirements" icon={Award}>
              <StatItem label="Teacher Recommendations" value={requirementsData.teacherRecs.toString()} />
              <StatItem label="Counselor Recommendation" value={requirementsData.counselorRec ? 'Required' : 'Not Required'} />
              <StatItem label="School Report" value={requirementsData.schoolReport ? 'Required' : 'Not Required'} />
              <StatItem label="Supplement Essays" value={hasNoEssay ? 'Not Required' : 'Required'} />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};
