import { College } from '@/types/college';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, FileText, Send } from 'lucide-react';
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
  // Color coding for acceptance rate
  const getAcceptanceColor = (rate: number) => {
    if (rate < 20) return "bg-red-500";
    if (rate < 50) return "bg-orange-500";
    return "bg-green-500";
  };

  const acceptanceColor = getAcceptanceColor(college.acceptanceRate);
  
  // Format currency
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

      {/* Padding: p-4 on mobile (compact), p-5 on desktop (spacious) */}
      <div className="p-4 md:p-5 flex flex-col h-full">
        
        {/* Header Section */}
        <div className="flex justify-between items-start gap-3 mb-3 md:mb-4">
          <div className="flex-1 min-w-0 pt-2">
            {/* Title: smaller on mobile, large on desktop */}
            <h3 className="font-heading font-bold text-base md:text-lg leading-tight text-foreground truncate pr-2">
              {college.name}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{college.location}</span>
            </div>
          </div>

          {/* Deadline Badge */}
          <Badge 
            variant="outline" 
            className={cn(
              "flex-shrink-0 flex items-center gap-1.5 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border shadow-sm mt-1",
              college.deadlineStatus === 'red' ? "bg-red-500/10 text-red-500 border-red-500/20" :
              college.deadlineStatus === 'orange' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
              "bg-secondary text-muted-foreground border-border"
            )}
          >
            <Clock className="w-3 h-3" />
            <span className="text-[10px] md:text-xs font-bold whitespace-nowrap">
              {college.daysLeft < 0 ? "Passed" : 
               college.daysLeft > 365 ? "Rolling" : 
               `${college.daysLeft} Days`}
            </span>
          </Badge>
        </div>

        {/* Key Stats Grid - 3 Columns */}
        <div className="grid grid-cols-3 gap-2 py-3 md:py-4 border-y border-border/40 mb-3 md:mb-4 bg-secondary/20 rounded-lg px-2">
          
          {/* 1. Acceptance Rate */}
          <div className="flex flex-col items-center justify-center text-center p-1">
            <span className="text-[9px] md:text-[10px] uppercase text-muted-foreground font-semibold mb-1">Acceptance</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${acceptanceColor} animate-pulse`} />
              <span className="font-bold text-sm md:text-base">
                {college.acceptanceRate === -1 ? 'N/A' : `${college.acceptanceRate}%`}
              </span>
            </div>
          </div>

          {/* 2. Cost */}
          <div className="flex flex-col items-center justify-center text-center border-x border-border/40 p-1">
            <span className="text-[9px] md:text-[10px] uppercase text-muted-foreground font-semibold mb-1">Total Cost</span>
            <div className="flex items-center gap-1 text-foreground">
              <span className="font-bold text-sm md:text-base">
                {college.costOfAttendance > 0 ? formatCurrency(college.costOfAttendance) : 'N/A'}
              </span>
            </div>
          </div>

          {/* 3. SAT Range */}
          <div className="flex flex-col items-center justify-center text-center p-1">
            <span className="text-[9px] md:text-[10px] uppercase text-muted-foreground font-semibold mb-1">SAT Range</span>
            <span className="font-bold text-xs md:text-base truncate w-full px-1">
              {college.satMath25 > 0 ? `${college.satMath25+college.satRW25}-${college.satMath75+college.satRW75}` : 'Test Opt'}
            </span>
          </div>
        </div>

        {/* Feature Tags - Wrapped Flexbox */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
          {hasScoir && (
            <Badge variant="secondary" className="text-[10px] px-1.5 md:px-2 h-5 md:h-6 bg-blue-500/10 text-blue-600 border-blue-200">
              <Send className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" /> Scoir
            </Badge>
          )}
          {noEssay && (
            <Badge variant="secondary" className="text-[10px] px-1.5 md:px-2 h-5 md:h-6 bg-emerald-500/10 text-emerald-600 border-emerald-200">
              <FileText className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" /> No Essay
            </Badge>
          )}
          {englishReq && englishReq !== 'Not Reported' && (
            <Badge variant="outline" className="text-[10px] px-1.5 md:px-2 h-5 md:h-6 text-muted-foreground">
              DET: {englishReq}
            </Badge>
          )}
          {/* Private/Public Tag */}
          <Badge variant="outline" className="text-[10px] px-1.5 md:px-2 h-5 md:h-6 ml-auto border-dashed">
            {college.privateSchool ? "Private" : "Public"}
          </Badge>
        </div>
      </div>
      
      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary group-hover:h-1.5 transition-all">
        <div 
          className={`h-full ${acceptanceColor}`} 
          style={{ width: `${college.acceptanceRate}%` }} 
        />
      </div>
    </Card>
  );
};
