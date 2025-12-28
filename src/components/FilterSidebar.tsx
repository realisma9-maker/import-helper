import { 
  GraduationCap, Clock, Ticket, BadgeDollarSign, CloudSun, 
  Users, BookOpen, Home, CheckCircle2 
} from 'lucide-react';
import { Filters } from '@/types/college';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  collapsed: boolean;
}

export const FilterSidebar = ({ filters, setFilters, collapsed }: FilterSidebarProps) => {
  
  const handleAppTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      appType: checked 
        ? [...prev.appType, type]
        : prev.appType.filter(t => t !== type)
    }));
  };

  return (
    <aside 
      className={cn(
        "w-80 bg-card/95 backdrop-blur-xl border-r border-border flex flex-col transition-all duration-300 z-10 h-full",
        collapsed && "w-0 opacity-0 pointer-events-none -translate-x-full"
      )}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 text-primary">
          <GraduationCap className="w-7 h-7" />
          <span className="font-heading font-extrabold text-2xl tracking-tight">SmartApply</span>
        </div>
      </div>

      {/* Scrollable Filters */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        
        {/* Quick Filters */}
        <div className="mb-6 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Quick Filters
          </h3>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Scoir App Free</Label>
            <Switch
              checked={filters.scoirFree}
              onCheckedChange={(checked) => setFilters(f => ({ ...f, scoirFree: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">No Supp Essays</Label>
            <Switch
              checked={filters.noEssays}
              onCheckedChange={(checked) => setFilters(f => ({ ...f, noEssays: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Test Optional Only</Label>
            <Switch
              checked={filters.testOptional}
              onCheckedChange={(checked) => setFilters(f => ({ ...f, testOptional: checked }))}
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          
          {/* 1. Admissions */}
          <AccordionItem value="admissions" className="border rounded-xl px-3 shadow-sm bg-card/50">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Ticket className="w-4 h-4 text-primary" /> Admissions
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Max Acceptance Rate</Label>
                <Slider
                  value={[filters.maxAcceptance]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, maxAcceptance: val }))}
                  min={0} max={100} step={5}
                />
                <p className="text-xs text-right font-medium">{filters.maxAcceptance}%</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min % Submitting SAT</Label>
                <Slider
                  value={[filters.minSatSubmit]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minSatSubmit: val }))}
                  min={0} max={100} step={10}
                />
                <p className="text-xs text-right font-medium">{filters.minSatSubmit}%</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. Financials */}
          <AccordionItem value="financials" className="border rounded-xl px-3 shadow-sm bg-card/50">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BadgeDollarSign className="w-4 h-4 text-green-600" /> Financials
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Max Total Cost (COA)</Label>
                <Slider
                  value={[filters.maxCost]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, maxCost: val }))}
                  min={20000} max={100000} step={2500}
                />
                <p className="text-xs text-right font-medium">${(filters.maxCost / 1000).toFixed(0)}k</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Need Met</Label>
                <Slider
                  value={[filters.minNeedMet]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minNeedMet: val }))}
                  min={0} max={100} step={10}
                />
                <p className="text-xs text-right font-medium">{filters.minNeedMet}%</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Merit Aid Award</Label>
                <Slider
                  value={[filters.minAvgMerit]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minAvgMerit: val }))}
                  min={0} max={50000} step={5000}
                />
                <p className="text-xs text-right font-medium">${(filters.minAvgMerit / 1000).toFixed(0)}k+</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min 20-Yr ROI</Label>
                <Slider
                  value={[filters.minRoi]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minRoi: val }))}
                  min={0} max={1000000} step={50000}
                />
                <p className="text-xs text-right font-medium">${(filters.minRoi / 1000).toFixed(0)}k+</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. Applications */}
          <AccordionItem value="applications" className="border rounded-xl px-3 shadow-sm bg-card/50">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="w-4 h-4 text-orange-500" /> Applications
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground mb-2 block">Application Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['ED1', 'ED2', 'EA', 'RD'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={type} 
                        checked={filters.appType.includes(type)}
                        onCheckedChange={(checked) => handleAppTypeChange(type, checked as boolean)}
                      />
                      <label htmlFor={type} className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Max DET Score Req</Label>
                <Slider
                  value={[filters.maxDetScore]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, maxDetScore: val }))}
                  min={100} max={160} step={5}
                />
                <p className="text-xs text-right font-medium">{filters.maxDetScore}</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 4. Location */}
          <AccordionItem value="location" className="border rounded-xl px-3 shadow-sm bg-card/50">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CloudSun className="w-4 h-4 text-blue-400" /> Location
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Jan Temp (°F)</Label>
                <Slider
                  value={[filters.minJanTemp]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minJanTemp: val }))}
                  min={0} max={70} step={5}
                />
                <p className="text-xs text-right font-medium">{filters.minJanTemp}°F</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Sunny Days</Label>
                <Slider
                  value={[filters.minSunnyDays]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minSunnyDays: val }))}
                  min={0} max={300} step={20}
                />
                <p className="text-xs text-right font-medium">{filters.minSunnyDays}+</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 5. Demographics */}
          <AccordionItem value="demographics" className="border rounded-xl px-3 shadow-sm bg-card/50">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users className="w-4 h-4 text-purple-500" /> Student Body
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Enrollment</Label>
                <Slider
                  value={[filters.minEnrollment]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minEnrollment: val }))}
                  min={0} max={30000} step={1000}
                />
                <p className="text-xs text-right font-medium">{filters.minEnrollment}+</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Intl Students %</Label>
                <Slider
                  value={[filters.minIntl]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minIntl: val }))}
                  min={0} max={30} step={1}
                />
                <p className="text-xs text-right font-medium">{filters.minIntl}%</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 6. Academics */}
          <AccordionItem value="academics" className="border rounded-xl px-3 shadow-sm bg-card/50">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="w-4 h-4 text-red-400" /> Academics
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min 4-Year Grad Rate</Label>
                <Slider
                  value={[filters.minGradRate]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minGradRate: val }))}
                  min={0} max={100} step={5}
                />
                <p className="text-xs text-right font-medium">{filters.minGradRate}%</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Retention Rate</Label>
                <Slider
                  value={[filters.minRetention]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minRetention: val }))}
                  min={0} max={100} step={5}
                />
                <p className="text-xs text-right font-medium">{filters.minRetention}%</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 7. Campus */}
          <AccordionItem value="campus" className="border rounded-xl px-3 shadow-sm bg-card/50">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Home className="w-4 h-4 text-indigo-500" /> Campus Life
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min % Living On-Campus</Label>
                <Slider
                  value={[filters.minOnCampus]}
                  onValueChange={([val]) => setFilters(f => ({ ...f, minOnCampus: val }))}
                  min={0} max={100} step={10}
                />
                <p className="text-xs text-right font-medium">{filters.minOnCampus}%</p>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Housing Required</Label>
                <Switch
                  checked={filters.housingRequired}
                  onCheckedChange={(checked) => setFilters(f => ({ ...f, housingRequired: checked }))}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </aside>
  );
};
