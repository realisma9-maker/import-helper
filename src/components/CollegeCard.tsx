import { College } from '@/types/college';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, FileText, Send, DollarSign, GraduationCap, Percent, CalendarDays } from 'lucide-react';
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
    if (rate < 20) return "text-red-500";
    if (rate < 50) return "text-orange-500";
    return "text-green-500";
  };

  const acceptanceColor = getAcceptanceColor(college.acceptanceRate);
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 3,
    }).format(val);
  };

  return (
    <Card 
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer hover:shadow-glow transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm active:scale-[0.98]"
    >
      {/* Siam's Pick Badge */}
      {isSiamsPick && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-accent-orange to-primary text-white text-[10px] uppercase font-bold px-3 py-1 rounded-br-xl z-10 shadow-sm">
          Siam's Pick
        </div>
      )}

      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-4">
          <div className="flex-1 min-w-0 pt-2">
            <h3 className="font-heading font-bold text-lg leading-tight text-foreground truncate pr-2">
              {college.name}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{college.location}</span>
            </div>
          </div>

          <Badge 
            variant="outline" 
            className={cn(
              "flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm mt-1",
              college.deadlineStatus === 'red' ? "bg-red-500/10 text-red-500 border-red-500/20" :
              college.deadlineStatus === 'orange' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
              "bg-secondary text-muted-foreground border-border"
            )}
          >
            <Clock className="w-3 h-3" />
            <span className="text-xs font-bold whitespace-nowrap">
              {college.daysLeft < 0 ? "Passed" : 
               college.daysLeft > 365 ? "Rolling" : 
               `${college.daysLeft} Days`}
            </span>
          </Badge>
        </div>

        {/* Data Grid: 1 Col on Mobile, 2 Cols on Laptop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 bg-secondary/10 p-3 rounded-xl border border-border/30">
          
          {/* Acceptance */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-background rounded-md shadow-sm">
                <Percent className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold uppercase">Acceptance</span>
            </div>
            <p className={cn("text-lg font-bold pl-1", acceptanceColor)}>
              {college.acceptanceRate === -1 ? 'N/A' : `${college.acceptanceRate}%`}
            </p>
          </div>

          {/* Cost */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-background rounded-md shadow-sm">
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold uppercase">Total Cost</span>
            </div>
            <p className="text-lg font-bold pl-1 text-foreground">
              {college.costOfAttendance > 0 ? formatCurrency(college.costOfAttendance) : 'N/A'}
            </p>
          </div>

          {/* SAT - Hidden on Mobile, Visible on Desktop */}
          <div className="space-y-1 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-background rounded-md shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold uppercase">SAT Range</span>
            </div>
            <p className="text-sm font-medium pl-1">
              {college.satMath25 > 0 ? `${college.satMath25+college.satRW25}-${college.satMath75+college.satRW75}` : 'Test Optional'}
            </p>
          </div>

          {/* Mobile Only: Simplified SAT/Requirements Row */}
          <div className="space-y-1 md:hidden pt-1">
             <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>SAT: <span className="font-medium text-foreground">{college.satMath25 > 0 ? `${college.satMath25+college.satRW25}+` : 'Opt'}</span></span>
             </div>
          </div>
        </div>

        {/* Specific Deadlines Row (ED2 & RD) */}
        {(college.ed2 !== '-' || college.rd !== '-') && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 px-1">
            <div className="flex items-center gap-1.5 text-xs">
              <CalendarDays className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground font-medium">Deadlines:</span>
            </div>
            
            {college.ed2 && college.ed2 !== '-' && (
              <div className="text-xs">
                <span className="text-muted-foreground mr-1">ED II:</span>
                <span className="font-semibold text-foreground">{college.ed2}</span>
              </div>
            )}
            
            {college.rd && college.rd !== '-' && (
              <div className="text-xs">
                <span className="text-muted-foreground mr-1">RD:</span>
                <span className="font-semibold text-foreground">{college.rd}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {hasScoir && (
            <Badge variant="secondary" className="text-[10px] px-2 h-6 bg-blue-500/10 text-blue-600 border-blue-200">
              <Send className="w-3 h-3 mr-1" /> Scoir
            </Badge>
          )}
          {noEssay && (
            <Badge variant="secondary" className="text-[10px] px-2 h-6 bg-emerald-500/10 text-emerald-600 border-emerald-200">
              <FileText className="w-3 h-3 mr-1" /> No Essay
            </Badge>
          )}
          {englishReq && englishReq !== 'Not Reported' && (
            <Badge variant="outline" className="text-[10px] px-2 h-6 text-muted-foreground">
              DET: {englishReq}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary group-hover:h-1.5 transition-all">
        <div 
          className={cn("h-full", 
            college.acceptanceRate < 20 ? "bg-red-500" : 
            college.acceptanceRate < 50 ? "bg-orange-500" : "bg-green-500"
          )} 
          style={{ width: `${college.acceptanceRate}%` }} 
        />
      </div>
    </Card>
  );
};
