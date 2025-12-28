import { MapPin, PenOff, Clock, Languages, ListFilter, ExternalLink } from 'lucide-react';
import { College } from '@/types/college';
import { cn } from '@/lib/utils';

interface CollegeCardProps {
  college: College;
  isCurated?: boolean;
  isSiamsPick?: boolean;
  noEssay?: boolean;
  englishReq?: string;
  hasScoir?: boolean;
  onClick: () => void;
}

export const CollegeCard = ({ college, isSiamsPick, noEssay, englishReq, hasScoir, onClick }: CollegeCardProps) => {
  const c = college;
  
  const daysText = c.daysLeft > 900 ? 'N/A' : (c.daysLeft < 0 ? 'Passed' : c.daysLeft);
  const labelText = c.daysLeft < 0 ? 'Deadline' : (c.daysLeft > 900 ? 'Rolling/Unk' : 'Days Left');

  const getProgressColor = (rate: number) => {
    if (rate > 50) return 'progress-green';
    if (rate > 20) return 'progress-orange';
    return 'progress-red';
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden animate-fade-in",
        isSiamsPick && "ring-2 ring-accent-orange/30 bg-gradient-to-br from-card to-accent-orange/5"
      )}
    >
      {/* Header */}
      <div className="p-6 pb-4 flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading font-bold text-xl text-foreground">{c.name}</h3>
            {isSiamsPick && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-accent-orange to-primary text-white text-xs font-semibold rounded-full">
                <ListFilter className="w-3 h-3" /> Siam's Pick
              </span>
            )}
          </div>
          <p className="flex items-center gap-1 text-muted-foreground text-sm mt-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {c.location}
          </p>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {noEssay && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-green-light text-accent-green text-xs font-medium rounded-full">
                <PenOff className="w-3 h-3" /> No Supps
              </span>
            )}
            {hasScoir && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium rounded-full">
                <ExternalLink className="w-3 h-3" /> Free via Scoir
              </span>
            )}
          </div>
        </div>

        {/* Deadline Badge */}
        <div className={cn(
          "flex flex-col items-center justify-center px-4 py-3 rounded-xl min-w-[70px] text-center",
          c.deadlineStatus === 'red' && 'badge-red',
          c.deadlineStatus === 'orange' && 'badge-orange',
          c.deadlineStatus === 'gray' && 'badge-gray'
        )}>
          <span className="text-xl font-bold">{daysText}</span>
          <span className="text-[10px] uppercase tracking-wide opacity-80">{labelText}</span>
        </div>
      </div>

      {/* Stats Grid - Landscape layout */}
      <div className="px-6 pb-5 grid grid-cols-4 gap-4">
        {/* Acceptance */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acceptance</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall:</span>
              <span className="font-semibold">{c.raw['Overall Acceptance Rate'] || 'N/A'}</span>
            </div>
            {c.acceptanceRate > 0 && (
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full", getProgressColor(c.acceptanceRate))}
                  style={{ width: `${c.acceptanceRate}%` }}
                />
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ED:</span>
              <span className="font-medium">{c.edAcceptanceRate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Intl:</span>
              <span className={cn("font-medium", c.intlAcceptanceRate > 20 && "text-accent-green")}>{c.rawIntlStr}</span>
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Demographics</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium">{c.raw['Total Undergraduate Enrollment'] || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Intl:</span>
              <span className="font-medium">{c.percentIntl !== -1 ? c.percentIntl + '%' : 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Asian:</span>
              <span className="font-medium">{c.percentAsian}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {c.percentMale} M / {c.percentFemale} F
            </p>
          </div>
        </div>

        {/* Financial */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Financial</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Need Met:</span>
              <span className="font-medium">{c.rawNeedStr}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium">{c.costDisplay.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Merit:</span>
              <span className="font-medium">{c.meritAidPercent > 0 ? `${c.meritAidPercent}%` : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Test Scores */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Test Scores</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">% SAT:</span>
              <span className="font-medium">{c.percentSubmittingSAT}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">% ACT:</span>
              <span className="font-medium">{c.percentSubmittingACT}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Interest:</span>
              <span className="font-medium text-xs">{c.demonstratedInterest}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-5 flex flex-wrap gap-2">
        {c.ed2 !== '-' && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent-orange-light text-accent-orange text-xs font-medium rounded-lg">
            <Clock className="w-3 h-3" /> ED2: {c.ed2}
          </span>
        )}
        {c.rd !== '-' && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg">
            <Clock className="w-3 h-3" /> RD: {c.rd}
          </span>
        )}
        {englishReq && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-lg">
            <Languages className="w-3 h-3" /> DET: {englishReq}
          </span>
        )}
      </div>
    </div>
  );
};
