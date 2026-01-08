import { College } from '@/types/college';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, FileText, Send, DollarSign, GraduationCap, Percent, CalendarDays, Users, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollegeCardProps {
  college: College;
  onClick: () => void;
  noEssay?: boolean;
  englishReq?: string;
  hasScoir?: boolean;
  isSiamsPick?: boolean;
}

export const CollegeCard = ({ 
  college, 
  onClick, 
  noEssay, 
  englishReq, 
  hasScoir,
  isSiamsPick 
}: CollegeCardProps) => {
  const getAcceptanceColor = (rate: number) => {
    if (rate < 20) return "text-destructive";
    if (rate < 50) return "text-accent-orange";
    return "text-accent-green";
  };

  const acceptanceColor = getAcceptanceColor(college.acceptanceRate);
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 3,
    }).format(val);
  };

  // Find earliest deadline
  const getEarliestDeadline = () => {
    const deadlines = [
      { type: 'ED I', date: college.ed1 },
      { type: 'ED II', date: college.ed2 },
      { type: 'RD', date: college.rd }
    ].filter(d => d.date && d.date !== '-');
    return deadlines[0];
  };

  const earliestDeadline = getEarliestDeadline();

  return (
    <Card 
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer hover:shadow-glow transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm active:scale-[0.98]"
    >
      {/* Siam's Pick Badge */}
      {isSiamsPick && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-accent-orange to-primary text-white text-[10px] uppercase font-bold px-3 py-1 rounded-br-xl z-10 shadow-sm">
          Siam's Pick
        </div>
      )}

      <div className="p-4 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-heading font-bold text-base leading-tight text-foreground line-clamp-2">
              {college.name}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{college.location}</span>
            </div>
          </div>

          <Badge 
            variant="outline" 
            className={cn(
              "flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full border shadow-sm",
              college.deadlineStatus === 'red' ? "bg-destructive/10 text-destructive border-destructive/20" :
              college.deadlineStatus === 'orange' ? "bg-accent-orange/10 text-accent-orange border-accent-orange/20" :
              "bg-secondary text-muted-foreground border-border"
            )}
          >
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-bold whitespace-nowrap">
              {college.daysLeft < 0 ? "Passed" : 
               college.daysLeft > 365 ? "Rolling" : 
               `${college.daysLeft}d`}
            </span>
          </Badge>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Acceptance Rate */}
          <div className="bg-secondary/30 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Percent className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase">Accept</span>
            </div>
            <p className={cn("text-lg font-bold", acceptanceColor)}>
              {college.acceptanceRate === -1 ? 'N/A' : `${college.acceptanceRate}%`}
            </p>
          </div>

          {/* Cost */}
          <div className="bg-secondary/30 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase">Cost</span>
            </div>
            <p className="text-base font-bold text-foreground">
              {college.costOfAttendance > 0 ? formatCurrency(college.costOfAttendance) : 'N/A'}
            </p>
          </div>

          {/* SAT Range */}
          <div className="bg-secondary/30 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <GraduationCap className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase">SAT</span>
            </div>
            <p className="text-sm font-semibold">
              {college.satMath25 > 0 ? `${college.satMath25+college.satRW25}-${college.satMath75+college.satRW75}` : 'Optional'}
            </p>
          </div>

          {/* Enrollment */}
          <div className="bg-secondary/30 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase">Size</span>
            </div>
            <p className="text-sm font-semibold">
              {college.enrollment > 0 ? `${(college.enrollment / 1000).toFixed(1)}K` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Deadline & Grad Rate Row */}
        <div className="flex items-center justify-between text-xs mb-3 px-1">
          {earliestDeadline && (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground">{earliestDeadline.type}:</span>
              <span className="font-semibold">{earliestDeadline.date}</span>
            </div>
          )}
          {college.gradRate4 && Number(college.gradRate4) > 0 && (
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-accent-green" />
              <span className="font-semibold">{college.gradRate4}% grad</span>
            </div>
          )}
        </div>

        {/* Footer Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {hasScoir && (
            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5 bg-blue-500/10 text-blue-600 border-blue-200">
              <Send className="w-2.5 h-2.5 mr-1" /> Free App
            </Badge>
          )}
          {noEssay && (
            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5 bg-emerald-500/10 text-emerald-600 border-emerald-200">
              <FileText className="w-2.5 h-2.5 mr-1" /> No Supps
            </Badge>
          )}
          {englishReq && englishReq !== 'Not Reported' && (
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-5 text-muted-foreground">
              DET {englishReq}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary group-hover:h-1.5 transition-all">
        <div 
          className={cn("h-full", 
            college.acceptanceRate < 20 ? "bg-destructive" : 
            college.acceptanceRate < 50 ? "bg-accent-orange" : "bg-accent-green"
          )} 
          style={{ width: `${Math.max(5, college.acceptanceRate)}%` }} 
        />
      </div>
    </Card>
  );
};
