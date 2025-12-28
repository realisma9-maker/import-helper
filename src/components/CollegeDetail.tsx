import { ArrowLeft, MapPin, GraduationCap, Users, DollarSign, Thermometer, TrendingUp, Award, BookOpen, Globe } from 'lucide-react';
import { College } from '@/types/college';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CollegeDetailProps {
  college: College;
  onBack: () => void;
  englishData?: { TOEFL: string; IELTS: string; DET: string; Other: string };
  requirementsData?: { teacherRecs: number; counselorRec: boolean; schoolReport: boolean };
}

const StatItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={cn("font-semibold", highlight && "text-accent-green")}>{value}</p>
  </div>
);

const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl p-6 shadow-card">
    <h2 className="flex items-center gap-2 font-heading text-lg font-bold mb-4">
      <Icon className="w-5 h-5 text-primary" />
      {title}
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

export const CollegeDetail = ({ college, onBack, englishData, requirementsData }: CollegeDetailProps) => {
  const c = college;

  return (
    <div className="min-h-screen bg-app-gradient">
      <div className="max-w-5xl mx-auto px-6 py-8">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-foreground">{c.name}</h1>
              <p className="flex items-center gap-2 text-muted-foreground mt-2">
                <MapPin className="w-4 h-4" />
                {c.location}
              </p>
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

          {/* Application Deadlines */}
          <Section title="Application Deadlines" icon={BookOpen}>
            <StatItem label="Early Action I" value={c.ea1} />
            <StatItem label="Early Action II" value={c.ea2} />
            <StatItem label="Early Decision I" value={c.ed1} />
            <StatItem label="Early Decision II" value={c.ed2} />
            <StatItem label="Regular Decision" value={c.rd} />
          </Section>

          {/* Financial */}
          <Section title="Financial Aid" icon={DollarSign}>
            <StatItem label="Cost of Attendance" value={c.costDisplay} />
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
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};
