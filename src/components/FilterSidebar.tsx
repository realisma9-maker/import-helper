import { GraduationCap, Clock, Ticket, BadgeDollarSign, CloudSun } from 'lucide-react';
import { Filters } from '@/types/college';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  collapsed: boolean;
}

const deadlineOptions = [
  { value: 'all', label: 'All' },
  { value: 'jan-1-5', label: 'Jan 1-5' },
  { value: 'jan-6-10', label: '6-10' },
  { value: 'jan-11-15', label: '11-15' },
  { value: 'feb-plus', label: 'Feb+' },
];

export const FilterSidebar = ({ filters, setFilters, collapsed }: FilterSidebarProps) => {
  return (
    <aside 
      className={cn(
        "w-80 bg-card/95 backdrop-blur-xl border-r border-border p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar transition-all duration-300 z-10",
        collapsed && "w-0 p-0 opacity-0 pointer-events-none -translate-x-full"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 text-primary">
        <GraduationCap className="w-7 h-7" />
        <span className="font-heading font-extrabold text-2xl tracking-tight">SmartApply</span>
      </div>

      {/* Deadlines */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Clock className="w-4 h-4" />
          Deadlines
        </h3>
        <div className="flex flex-wrap gap-2">
          {deadlineOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilters(f => ({ ...f, deadline: opt.value }))}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                filters.deadline === opt.value
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-transparent border-border text-foreground hover:border-primary hover:bg-primary-light hover:text-primary"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Admissions */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Ticket className="w-4 h-4" />
          Admissions
        </h3>
        
        <div className="space-y-2">
          <Label className="text-sm">Max Acceptance Rate</Label>
          <Slider
            value={[filters.maxAcceptance]}
            onValueChange={([val]) => setFilters(f => ({ ...f, maxAcceptance: val }))}
            min={0}
            max={100}
            step={5}
            className="py-2"
          />
          <p className="text-sm font-semibold">Under {filters.maxAcceptance}%</p>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm">Test Optional Only</Label>
          <Switch
            checked={filters.testOptional}
            onCheckedChange={(checked) => setFilters(f => ({ ...f, testOptional: checked }))}
          />
        </div>
      </div>

      {/* Financials */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <BadgeDollarSign className="w-4 h-4" />
          Financials
        </h3>
        
        <div className="space-y-2">
          <Label className="text-sm">Max Cost (COA)</Label>
          <Slider
            value={[filters.maxCost]}
            onValueChange={([val]) => setFilters(f => ({ ...f, maxCost: val }))}
            min={0}
            max={100000}
            step={5000}
            className="py-2"
          />
          <p className="text-sm font-semibold">Under ${Math.round(filters.maxCost / 1000)}k</p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Min Need Met</Label>
          <Slider
            value={[filters.minNeedMet]}
            onValueChange={([val]) => setFilters(f => ({ ...f, minNeedMet: val }))}
            min={0}
            max={100}
            step={10}
            className="py-2"
          />
          <p className="text-sm font-semibold">At least {filters.minNeedMet}%</p>
        </div>
      </div>

      {/* Campus Life */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <CloudSun className="w-4 h-4" />
          Campus Life
        </h3>
        
        <div className="space-y-2">
          <Label className="text-sm">Min Jan Temp (°F)</Label>
          <Slider
            value={[filters.minJanTemp]}
            onValueChange={([val]) => setFilters(f => ({ ...f, minJanTemp: val }))}
            min={0}
            max={80}
            step={10}
            className="py-2"
          />
          <p className="text-sm font-semibold">Warmer than {filters.minJanTemp}°F</p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Min Intl Students</Label>
          <Slider
            value={[filters.minIntl]}
            onValueChange={([val]) => setFilters(f => ({ ...f, minIntl: val }))}
            min={0}
            max={50}
            step={5}
            className="py-2"
          />
          <p className="text-sm font-semibold">At least {filters.minIntl}%</p>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm">Housing Required</Label>
          <Switch
            checked={filters.housingRequired}
            onCheckedChange={(checked) => setFilters(f => ({ ...f, housingRequired: checked }))}
          />
        </div>
      </div>
    </aside>
  );
};
