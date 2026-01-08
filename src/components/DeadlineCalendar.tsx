import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { College } from '@/types/college';
import { cn } from '@/lib/utils';

interface DeadlineCalendarProps {
  colleges: College[];
  onCollegeClick: (college: College) => void;
  onClose: () => void;
}

export const DeadlineCalendar = ({ colleges, onCollegeClick, onClose }: DeadlineCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Parse deadlines from colleges
  const deadlineMap = useMemo(() => {
    const map: Record<string, College[]> = {};
    
    colleges.forEach(college => {
      const deadlines = [college.ed1, college.ed2, college.rd].filter(d => d && d !== '-');
      deadlines.forEach(deadline => {
        if (!deadline) return;
        // Parse date like "Jan 1" or "January 15"
        const dateStr = deadline.trim();
        const parsed = new Date(`${dateStr}, ${year}`);
        if (!isNaN(parsed.getTime())) {
          const key = parsed.toISOString().split('T')[0];
          if (!map[key]) map[key] = [];
          if (!map[key].find(c => c.name === college.name)) {
            map[key].push(college);
          }
        }
      });
    });
    
    return map;
  }, [colleges, year]);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const todayKey = today.toISOString().split('T')[0];

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, prevMonthDays - i), isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  }, [year, month, daysInMonth, firstDay]);

  // Week view
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }, [currentDate]);

  const prevWeek = () => setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  const nextWeek = () => setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));

  const getDeadlinesForDate = (date: Date) => {
    const key = date.toISOString().split('T')[0];
    return deadlineMap[key] || [];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-lg">Deadline Calendar</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
                className="h-7 text-xs"
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
                className="h-7 text-xs"
              >
                Week
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <Button variant="outline" size="icon" onClick={viewMode === 'month' ? prevMonth : prevWeek} className="h-8 w-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="font-heading font-bold text-base">
            {viewMode === 'month' 
              ? `${monthNames[month]} ${year}`
              : `Week of ${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
            }
          </h3>
          <Button variant="outline" size="icon" onClick={viewMode === 'month' ? nextMonth : nextWeek} className="h-8 w-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <ScrollArea className="flex-1">
          {viewMode === 'month' ? (
            <div className="p-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar cells */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) => {
                  const dateKey = day.date.toISOString().split('T')[0];
                  const deadlines = getDeadlinesForDate(day.date);
                  const isToday = dateKey === todayKey;
                  
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "min-h-[80px] p-1.5 rounded-lg border transition-colors",
                        day.isCurrentMonth ? "bg-background border-border/50" : "bg-muted/30 border-transparent",
                        isToday && "ring-2 ring-primary ring-offset-1",
                        deadlines.length > 0 && "bg-primary/5 border-primary/20"
                      )}
                    >
                      <div className={cn(
                        "text-xs font-medium mb-1",
                        !day.isCurrentMonth && "text-muted-foreground/50",
                        isToday && "text-primary font-bold"
                      )}>
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-0.5">
                        {deadlines.slice(0, 3).map((college, i) => (
                          <button
                            key={i}
                            onClick={() => onCollegeClick(college)}
                            className="w-full text-left text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary truncate hover:bg-primary/20 transition-colors"
                          >
                            {college.name.split(' ').slice(0, 2).join(' ')}
                          </button>
                        ))}
                        {deadlines.length > 3 && (
                          <span className="text-[10px] text-muted-foreground pl-1">
                            +{deadlines.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((date, idx) => {
                  const dateKey = date.toISOString().split('T')[0];
                  const deadlines = getDeadlinesForDate(date);
                  const isToday = dateKey === todayKey;
                  
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "min-h-[300px] p-3 rounded-xl border",
                        isToday ? "bg-primary/5 border-primary/30" : "bg-background border-border/50"
                      )}
                    >
                      <div className="text-center mb-3">
                        <div className="text-xs text-muted-foreground">{dayNames[idx]}</div>
                        <div className={cn(
                          "text-lg font-bold",
                          isToday && "text-primary"
                        )}>
                          {date.getDate()}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {deadlines.map((college, i) => (
                          <button
                            key={i}
                            onClick={() => onCollegeClick(college)}
                            className="w-full text-left text-xs p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <div className="font-medium truncate">{college.name}</div>
                            <div className="text-[10px] text-muted-foreground">
                              {college.acceptanceRate}% acc.
                            </div>
                          </button>
                        ))}
                        {deadlines.length === 0 && (
                          <div className="text-xs text-muted-foreground/50 text-center py-4">
                            No deadlines
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Legend */}
        <div className="flex items-center gap-4 px-4 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-primary/10 border border-primary/20" />
            <span>Has deadlines</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded ring-2 ring-primary" />
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};
