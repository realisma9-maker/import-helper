import { 
  GraduationCap, Clock, Ticket, BadgeDollarSign, CloudSun, 
  Users, BookOpen, Home, CheckCircle2, X 
} from 'lucide-react';
import { Filters } from '@/types/college';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  collapsed: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar = ({ filters, setFilters, collapsed, onCloseMobile }: FilterSidebarProps) => {
  
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
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl border-r border-border transition-all duration-300 ease-in-out shadow-2xl md:shadow-none md:relative",
        // Mobile Logic: Translate X to hide/show
        // Desktop Logic: Width 0 to hide, Width 80 to show
        collapsed ? "-translate-x-full md:translate-x-0 md:w-0 md:border-r-0 md:overflow-hidden" : "translate-x-0 w-[85vw] md:w-80"
      )}
    >
      <div className="w-full h-full flex flex-col min-w-[85vw] md:min-w-80">
        {/* Brand Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-card/50">
          <div className="flex items-center gap-3 text-primary">
            <GraduationCap className="w-7 h-7" />
            <span className="font-heading font-extrabold text-2xl tracking-tight">SmartApply</span>
          </div>
          {/* Mobile Close Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onCloseMobile}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 pb-20 md:pb-6">
          
          {/* Quick Filters */}
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/50 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Quick Filters
            </h3>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Scoir App Free</Label>
              <Switch
                checked={filters.scoirFree}
                onCheckedChange={(checked) => setFilters(f => ({ ...f, scoirFree: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">No Supp Essays</Label>
              <Switch
                checked={filters.noEssays}
                onCheckedChange={(checked) => setFilters(f => ({ ...f, noEssays: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Test Optional</Label>
              <Switch
                checked={filters.testOptional}
                onCheckedChange={(checked) => setFilters(f => ({ ...f, testOptional: checked }))}
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            
            {/* 1. Admissions */}
            <AccordionItem value="admissions" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-primary/10 rounded-md"><Ticket className="w-4 h-4 text-primary" /></div>
                  Admissions
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Max Acceptance Rate</Label>
                    <span className="text-xs font-bold">{filters.maxAcceptance}%</span>
                  </div>
                  <Slider
                    value={[filters.maxAcceptance]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, maxAcceptance: val }))}
                    min={0} max={100} step={5}
                    className="py-2"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min % Submitting SAT</Label>
                    <span className="text-xs font-bold">{filters.minSatSubmit}%</span>
                  </div>
                  <Slider
                    value={[filters.minSatSubmit]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minSatSubmit: val }))}
                    min={0} max={100} step={10}
                    className="py-2"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 2. Financials */}
            <AccordionItem value="financials" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-green-500/10 rounded-md"><BadgeDollarSign className="w-4 h-4 text-green-600" /></div>
                  Financials
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Max Total Cost</Label>
                    <span className="text-xs font-bold">${(filters.maxCost / 1000).toFixed(0)}k</span>
                  </div>
                  <Slider
                    value={[filters.maxCost]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, maxCost: val }))}
                    min={20000} max={100000} step={2500}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min Need Met</Label>
                    <span className="text-xs font-bold">{filters.minNeedMet}%</span>
                  </div>
                  <Slider
                    value={[filters.minNeedMet]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minNeedMet: val }))}
                    min={0} max={100} step={10}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 3. Applications */}
            <AccordionItem value="applications" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-orange-500/10 rounded-md"><Clock className="w-4 h-4 text-orange-500" /></div>
                  Applications
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2 pb-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground mb-2 block">Application Types</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['ED1', 'ED2', 'EA', 'RD'].map((type) => (
                      <div key={type} className="flex items-center space-x-2 border border-border p-2 rounded-lg bg-secondary/10">
                        <Checkbox 
                          id={type} 
                          checked={filters.appType.includes(type)}
                          onCheckedChange={(checked) => handleAppTypeChange(type, checked as boolean)}
                        />
                        <label htmlFor={type} className="text-xs font-medium leading-none cursor-pointer w-full">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 4. Location */}
            <AccordionItem value="location" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-blue-400/10 rounded-md"><CloudSun className="w-4 h-4 text-blue-400" /></div>
                  Location & Weather
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min Jan Temp (°F)</Label>
                    <span className="text-xs font-bold">{filters.minJanTemp}°F</span>
                  </div>
                  <Slider
                    value={[filters.minJanTemp]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minJanTemp: val }))}
                    min={0} max={70} step={5}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 5. Campus */}
            <AccordionItem value="campus" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-indigo-500/10 rounded-md"><Home className="w-4 h-4 text-indigo-500" /></div>
                  Campus Life
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-4">
                <div className="flex items-center justify-between border border-border p-2 rounded-lg bg-secondary/10">
                  <Label className="text-xs font-medium cursor-pointer" htmlFor="housing-req">Housing Required</Label>
                  <Switch
                    id="housing-req"
                    checked={filters.housingRequired}
                    onCheckedChange={(checked) => setFilters(f => ({ ...f, housingRequired: checked }))}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </aside>
  );
};
