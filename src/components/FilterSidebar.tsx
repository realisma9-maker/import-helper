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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
        collapsed ? "-translate-x-full md:translate-x-0 md:w-0 md:border-r-0 md:overflow-hidden" : "translate-x-0 w-[85vw] md:w-80"
      )}
    >
      <div className="w-full h-full flex flex-col min-w-[85vw] md:min-w-80">
        <div className="p-6 border-b border-border flex justify-between items-center bg-card/50">
          <div className="flex items-center gap-3 text-primary">
            <GraduationCap className="w-7 h-7" />
            <span className="font-heading font-extrabold text-2xl tracking-tight">SmartApply</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onCloseMobile}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 pb-20 md:pb-6">
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
                    <Label className="text-xs text-muted-foreground">Max Overall Acceptance</Label>
                    <span className="text-xs font-bold">{filters.maxAcceptance}%</span>
                  </div>
                  <Slider
                    value={[filters.maxAcceptance]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, maxAcceptance: val }))}
                    min={0} max={100} step={5}
                    className="py-2"
                  />
                </div>
                
                {/* NEW: International Acceptance Rate */}
                <div className="space-y-3 pt-2 border-t border-border/50">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min Intl Acceptance</Label>
                    <span className="text-xs font-bold">{filters.minIntlAcceptance}%</span>
                  </div>
                  <Slider
                    value={[filters.minIntlAcceptance]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minIntlAcceptance: val }))}
                    min={0} max={100} step={1}
                    className="py-2"
                  />
                </div>

                <div className="space-y-3 pt-2 border-t border-border/50">
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

            <AccordionItem value="applications" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-orange-500/10 rounded-md"><Clock className="w-4 h-4 text-orange-500" /></div>
                  Deadlines & Types
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

                {/* NEW: Deadline Ranges */}
                <div className="space-y-3 pt-2 border-t border-border/50">
                  <Label className="text-xs text-muted-foreground block mb-2">Deadline Date Range</Label>
                  <RadioGroup 
                    value={filters.deadline} 
                    onValueChange={(val) => setFilters(f => ({...f, deadline: val}))}
                    className="gap-2"
                  >
                    {[
                      { val: 'all', label: 'Any Date' },
                      { val: 'jan-1-5', label: 'Jan 1 - Jan 5' },
                      { val: 'jan-6-10', label: 'Jan 6 - Jan 10' },
                      { val: 'jan-11-15', label: 'Jan 11 - Jan 15' },
                      { val: 'jan-16-feb-1', label: 'Jan 16 - Feb 1' },
                      { val: 'feb-2-plus', label: 'Feb 2 & Later' },
                    ].map((opt) => (
                      <div key={opt.val} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.val} id={`dl-${opt.val}`} />
                        <Label htmlFor={`dl-${opt.val}`} className="text-xs font-normal cursor-pointer">{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3 pt-2 border-t border-border/50">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Max DET Score</Label>
                    <span className="text-xs font-bold">{filters.maxDetScore}</span>
                  </div>
                  <Slider
                    value={[filters.maxDetScore]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, maxDetScore: val }))}
                    min={100} max={160} step={5}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Other Accordions (Financials, Location, Demographics, Academics, Campus) remain identical to previous versions */}
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

            <AccordionItem value="demographics" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-purple-500/10 rounded-md"><Users className="w-4 h-4 text-purple-500" /></div>
                  Student Body
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min Enrollment</Label>
                    <span className="text-xs font-bold">{filters.minEnrollment}+</span>
                  </div>
                  <Slider
                    value={[filters.minEnrollment]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minEnrollment: val }))}
                    min={0} max={30000} step={1000}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min Intl Students %</Label>
                    <span className="text-xs font-bold">{filters.minIntl}%</span>
                  </div>
                  <Slider
                    value={[filters.minIntl]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minIntl: val }))}
                    min={0} max={30} step={1}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="academics" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-red-400/10 rounded-md"><BookOpen className="w-4 h-4 text-red-400" /></div>
                  Academics
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min 4-Year Grad Rate</Label>
                    <span className="text-xs font-bold">{filters.minGradRate}%</span>
                  </div>
                  <Slider
                    value={[filters.minGradRate]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minGradRate: val }))}
                    min={0} max={100} step={5}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="campus" className="border border-border/60 rounded-xl px-4 shadow-sm bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-1.5 bg-indigo-500/10 rounded-md"><Home className="w-4 h-4 text-indigo-500" /></div>
                  Campus Life
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Min % Living On-Campus</Label>
                    <span className="text-xs font-bold">{filters.minOnCampus}%</span>
                  </div>
                  <Slider
                    value={[filters.minOnCampus]}
                    onValueChange={([val]) => setFilters(f => ({ ...f, minOnCampus: val }))}
                    min={0} max={100} step={10}
                  />
                </div>
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
