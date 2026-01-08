import { ArrowLeft, MapPin, GraduationCap, Users, DollarSign, Thermometer, TrendingUp, Award, BookOpen, Globe, ExternalLink, Video, PenOff, FileText, Wallet, Gift, Send, Clock, Calendar, TestTube } from 'lucide-react';
import { College } from '@/types/college';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CollegeDetailProps {
  college: College;
  onBack: () => void;
  englishData?: { DET: string; TOEFL: string; IELTS: string };
  requirementsData?: { teacherRecs: number; counselorRec: boolean; schoolReport: boolean };
  interviewData?: { admOfficer: boolean; alumni: boolean };
  websiteUrl?: string;
  hasScoir?: boolean;
  hasNoEssay?: boolean;
  scholarships?: Array<{ name: string; amount: number | null; deadline: string }>;
  costBreakdown?: { coa: { inState: number; outOfState: number }; tuition: { inState: number; outOfState: number }; roomBoard: number };
}

export const CollegeDetail = ({
  college,
  onBack,
  englishData,
  requirementsData,
  interviewData,
  websiteUrl,
  hasScoir,
  hasNoEssay,
  scholarships,
  costBreakdown
}: CollegeDetailProps) => {
  const c = college;
  
  const formatCurrency = (n: number) => `$${n.toLocaleString()}`;

  const renderScore = (score: string | number | null | undefined) => {
    if (score === 'N/A' || score === null || score === undefined || score === 0 || score === -1) {
      return <span className="text-muted-foreground">N/A</span>;
    }
    return score;
  };

  const StatItem = ({ label, value, highlight }: { label: string; value: string | React.ReactNode; highlight?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("text-sm font-semibold", highlight && "text-primary")}>{value}</span>
    </div>
  );

  const Section = ({ title, icon: Icon, children, className }: { title: string; icon: React.ElementType; children: React.ReactNode; className?: string }) => (
    <div className={cn("bg-card rounded-2xl p-6 shadow-card border border-border/50", className)}>
      <h2 className="flex items-center gap-2 font-heading text-lg font-bold mb-4">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="h-screen w-full bg-app-gradient flex flex-col">
      {/* Header */}
      <header className="glass-dark border-b border-border px-4 py-4 md:px-6 flex items-center gap-4 sticky top-0 z-30">
        <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-xl font-bold truncate">{c.name}</h1>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">{c.location}</span>
          </div>
        </div>
        <Badge variant={c.deadlineStatus === 'red' ? 'destructive' : c.deadlineStatus === 'orange' ? 'default' : 'secondary'} className="flex-shrink-0">
          <Clock className="w-3 h-3 mr-1" />
          {c.daysLeft < 0 ? "Passed" : c.daysLeft > 365 ? "Rolling" : `${c.daysLeft} Days`}
        </Badge>
      </header>

      <ScrollArea className="flex-1 px-4 py-6 md:px-8">
        {/* Quick Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 border-primary/30 text-primary">
                <ExternalLink className="w-3 h-3 mr-1" /> Visit Website
              </Badge>
            </a>
          )}
          {hasScoir && (
            <Badge className="bg-blue-500/20 text-blue-600 border-blue-300/50">
              <Send className="w-3 h-3 mr-1" /> Free via Scoir
            </Badge>
          )}
          {hasNoEssay && (
            <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-300/50">
              <PenOff className="w-3 h-3 mr-1" /> No Supplement Essays
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Admissions */}
          <Section title="Admissions" icon={GraduationCap}>
            <StatItem label="Overall Acceptance" value={c.acceptanceRate === -1 ? 'N/A' : `${c.acceptanceRate}%`} />
            <StatItem label="Intl Acceptance" value={c.intlAcceptanceRate === -1 ? 'N/A' : `${c.intlAcceptanceRate}%`} />
            <StatItem label="ED Acceptance" value={renderScore(c.edAcceptanceRate)} />
            <StatItem label="RD Acceptance" value={renderScore(c.regularAcceptanceRate)} />
            <StatItem label="Demonstrated Interest" value={renderScore(c.demonstratedInterest)} />
          </Section>

          {/* Test Scores */}
          <Section title="Test Scores" icon={TestTube}>
            <StatItem label="SAT Math" value={c.satMath25 > 0 ? `${c.satMath25}-${c.satMath75}` : 'N/A'} />
            <StatItem label="SAT R/W" value={c.satRW25 > 0 ? `${c.satRW25}-${c.satRW75}` : 'N/A'} />
            <StatItem label="SAT Total Range" value={c.satMath25 > 0 ? `${c.satMath25+c.satRW25}-${c.satMath75+c.satRW75}` : 'N/A'} highlight />
            <StatItem label="ACT Range" value={c.act25 > 0 ? `${c.act25}-${c.act75}` : 'N/A'} />
            <StatItem label="% Submitting SAT" value={renderScore(c.percentSubmittingSAT)} />
            <StatItem label="% Submitting ACT" value={renderScore(c.percentSubmittingACT)} />
          </Section>

          {/* Deadlines */}
          <Section title="Application Deadlines" icon={Calendar}>
            <StatItem label="EA 1" value={c.ea1 !== '-' ? c.ea1 : 'N/A'} />
            <StatItem label="EA 2" value={c.ea2 !== '-' ? c.ea2 : 'N/A'} />
            <StatItem label="ED 1" value={c.ed1 !== '-' ? c.ed1 : 'N/A'} />
            <StatItem label="ED 2" value={c.ed2 !== '-' ? c.ed2 : 'N/A'} />
            <StatItem label="Regular Decision" value={c.rd !== '-' ? c.rd : 'N/A'} highlight />
          </Section>

          {/* English Proficiency */}
          {englishData && (
            <Section title="English Proficiency" icon={BookOpen}>
              <StatItem label="DET" value={renderScore(englishData.DET)} />
              <StatItem label="TOEFL" value={renderScore(englishData.TOEFL)} />
              <StatItem label="IELTS" value={renderScore(englishData.IELTS)} />
            </Section>
          )}

          {/* Application Requirements */}
          {requirementsData && (
            <Section title="Application Requirements" icon={FileText}>
              <StatItem label="Teacher Recommendations" value={requirementsData.teacherRecs === 0 ? 'Not Required' : `${requirementsData.teacherRecs} Required`} />
              <StatItem label="Counselor Recommendation" value={requirementsData.counselorRec ? 'Required' : 'Not Required'} />
              <StatItem label="School Report" value={requirementsData.schoolReport ? 'Required' : 'Not Required'} />
            </Section>
          )}

          {/* Interviews */}
          {interviewData && (
            <Section title="Interview Options" icon={Video}>
              <StatItem label="Admissions Officer" value={interviewData.admOfficer ? 'Available' : 'Not Available'} />
              <StatItem label="Alumni Interview" value={interviewData.alumni ? 'Available' : 'Not Available'} />
            </Section>
          )}

          {/* Full Cost Breakdown */}
          <Section title="Full Cost Breakdown" icon={Wallet}>
            {costBreakdown ? (
              <>
                <StatItem label="Total COA (In-State)" value={formatCurrency(costBreakdown.coa.inState)} />
                <StatItem label="Total COA (Out-of-State)" value={formatCurrency(costBreakdown.coa.outOfState)} highlight={costBreakdown.coa.inState !== costBreakdown.coa.outOfState} />
                <StatItem label="Tuition (In-State)" value={formatCurrency(costBreakdown.tuition.inState)} />
                <StatItem label="Tuition (Out-of-State)" value={formatCurrency(costBreakdown.tuition.outOfState)} />
                <StatItem label="Room & Board" value={formatCurrency(costBreakdown.roomBoard)} />
                <StatItem label="Books & Supplies" value="~$1,200" />
              </>
            ) : (
              <>
                <StatItem label="Total Cost of Attendance" value={c.costDisplay} />
                <StatItem label="Room & Board" value={c.raw['Room and Board'] || 'N/A'} />
              </>
            )}
          </Section>

          {/* Financial Aid */}
          <Section title="Financial Aid" icon={DollarSign}>
            <StatItem label="% Need Met" value={c.needMet === -1 ? 'N/A' : `${c.needMet}%`} />
            <StatItem label="% Receiving Merit Aid" value={c.meritAidPercent === -1 ? 'N/A' : `${c.meritAidPercent}%`} />
            <StatItem label="Avg Merit Award" value={renderScore(c.avgMeritAward)} />
            <StatItem label="Avg Need-Based Grant" value={renderScore(c.avgNeedBasedGrant)} />
          </Section>

          {/* Student Body */}
          <Section title="Student Body" icon={Users}>
            <StatItem label="Enrollment" value={c.enrollment === -1 ? 'N/A' : c.enrollment.toLocaleString()} />
            <StatItem label="% International" value={c.percentIntl === -1 ? 'N/A' : `${c.percentIntl}%`} />
            <StatItem label="% Female" value={renderScore(c.percentFemale)} />
            <StatItem label="% Male" value={renderScore(c.percentMale)} />
          </Section>

          {/* Weather */}
          <Section title="Location & Climate" icon={Thermometer}>
            <StatItem label="Avg Jan Temp" value={c.weatherJan === -1 ? 'N/A' : `${c.weatherJan}°F`} />
            <StatItem label="Sunny Days/Year" value={renderScore(c.sunnyDays)} />
            <StatItem label="Rainy Days/Year" value={renderScore(c.precipDays)} />
          </Section>

          {/* Outcomes */}
          <Section title="Outcomes" icon={TrendingUp}>
            <StatItem label="Retention Rate" value={renderScore(c.retentionRate)} />
            <StatItem label="4-Year Grad Rate" value={renderScore(c.gradRate4)} />
            <StatItem label="6-Year Grad Rate" value={renderScore(c.gradRate6)} />
            <StatItem label="Median Earnings (6yr)" value={renderScore(c.earnings6yr)} />
            <StatItem label="Median Earnings (10yr)" value={renderScore(c.earnings10yr)} />
            <StatItem label="20-Year Net ROI" value={renderScore(c.roi20yr)} highlight />
            <StatItem label="CS Median Salary" value={renderScore(c.csSalary)} />
          </Section>

          {/* Campus Life */}
          <Section title="Campus Life" icon={Award}>
            <StatItem label="Housing Required" value={c.housingReq || 'N/A'} />
            <StatItem label="% Living On-Campus" value={renderScore(c.livingOnCampus)} />
          </Section>

          {/* Scholarships */}
          {scholarships && scholarships.length > 0 && (
            <div className="bg-gradient-to-br from-accent-orange/10 to-primary/10 rounded-2xl p-6 shadow-card border border-accent-orange/20 md:col-span-2 xl:col-span-3">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold mb-4">
                <Gift className="w-5 h-5 text-accent-orange" />
                Available Scholarships
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {scholarships.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-card/80 rounded-xl border border-border/50">
                    <div>
                      <p className="font-semibold text-foreground">{s.name}</p>
                      <p className="text-sm text-muted-foreground">Deadline: {s.deadline}</p>
                    </div>
                    <span className="text-lg font-bold text-accent-green">
                      {s.amount ? formatCurrency(s.amount) : 'Varies'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
