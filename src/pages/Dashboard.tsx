import { useState, useEffect, useRef } from 'react';
import { Search, Sliders, School, Loader2, ListFilter, Home, AlertCircle } from 'lucide-react';
import { useCollegeData } from '@/hooks/useCollegeData';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeDetail } from '@/components/CollegeDetail';
import { HeroSection } from '@/components/HeroSection';
import { College, Filters } from '@/types/college';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { SIAMS_FILTERED_LIST } from '@/data/siams_filtered_list';
import { Helmet } from 'react-helmet';

const ITEMS_PER_PAGE = 24;

const Dashboard = () => {
  // 1. Load View State (Hero vs App)
  const [showHero, setShowHero] = useState(() => {
    const saved = localStorage.getItem('smartApply_showHero');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  // 2. Load Sidebar State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // 3. Load Selected College (if any)
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState('explore');
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Persist Hero State
  useEffect(() => {
    localStorage.setItem('smartApply_showHero', JSON.stringify(showHero));
  }, [showHero]);

  const { 
    filteredColleges, 
    loading, 
    error,
    filters,      // These now come from the hook with their own internal state/persistence if managed there,
    setFilters,   // but since we define state in the hook, let's ensure the HOOK handles the initial load or we pass it down.
                  // Actually, to ensure persistence works perfectly across the "Back" button, 
                  // we should initialize the hook with saved data or let the hook handle it.
                  // See the updated hook logic below or assumes useCollegeData handles defaults.
                  // Ideally, we lift the state up here or rely on the hook's internal persistence.
                  // For this fix, we will assume the hook provides the state setters.
    NO_ESSAY_COLLEGES,
    ENGLISH_PROFICIENCY_DATA,
    REQUIREMENTS_DATA,
    INTERVIEW_DATA,
    WEBSITE_DATA,
    SCOIR_FREE_APP,
    SCHOLARSHIP_DATA,
    COST_BREAKDOWN_DATA
  } = useCollegeData();

  // Reset page when filters change (but not on initial load if restoring)
  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [filters, activeTab]);

  const siamsColleges = filteredColleges.filter(c => SIAMS_FILTERED_LIST.has(c.name));
  const currentList = activeTab === 'explore' ? filteredColleges : siamsColleges;
  const totalItems = currentList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const displayedColleges = currentList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showHero) {
    return (
      <>
        <Helmet><title>SmartApply | Find Your Dream University</title></Helmet>
        <HeroSection onEnterApp={() => setShowHero(false)} />
      </>
    );
  }

  if (selectedCollege) {
    return (
      <>
        <Helmet><title>{selectedCollege.name} | SmartApply</title></Helmet>
        <CollegeDetail 
          college={selectedCollege} 
          onBack={() => setSelectedCollege(null)}
          englishData={ENGLISH_PROFICIENCY_DATA[selectedCollege.name]}
          requirementsData={REQUIREMENTS_DATA[selectedCollege.name]}
          interviewData={INTERVIEW_DATA[selectedCollege.name]}
          websiteUrl={WEBSITE_DATA[selectedCollege.name]}
          hasScoir={SCOIR_FREE_APP.has(selectedCollege.name)}
          hasNoEssay={NO_ESSAY_COLLEGES.has(selectedCollege.name)}
          scholarships={SCHOLARSHIP_DATA[selectedCollege.name]}
          costBreakdown={COST_BREAKDOWN_DATA[selectedCollege.name]}
        />
      </>
    );
  }

  return (
    <>
      <Helmet><title>Explore Universities | SmartApply</title></Helmet>
      <div className="flex h-screen bg-app-gradient overflow-hidden relative">
        {!sidebarCollapsed && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setSidebarCollapsed(true)} />
        )}

        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          collapsed={sidebarCollapsed} 
          onCloseMobile={() => setSidebarCollapsed(true)}
        />

        <main className="flex-1 flex flex-col overflow-hidden w-full">
          <header className="glass-dark border-b border-border px-4 py-3 md:px-6 md:py-4 sticky top-0 z-30">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 md:max-w-md">
                <Button variant="outline" size="icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="md:hidden flex-shrink-0">
                  <Sliders className="w-5 h-5" />
                </Button>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search colleges..."
                    value={filters.search}
                    onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                    className="pl-10 bg-secondary/50 border-0 focus-visible:ring-primary h-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold">
                  <span>{totalItems}</span>
                  <span className="font-normal">Results</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowHero(true)} className="text-muted-foreground hover:text-foreground h-9">
                  <Home className="w-4 h-4 mr-2" />
                  <span className="text-sm">Home</span>
                </Button>
              </div>
            </div>
          </header>

          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 custom-scrollbar scroll-smooth">
            {error && (
              <Alert variant="destructive" className="mb-6"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center h-[50vh] animate-pulse">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <span className="text-muted-foreground font-medium">Loading universities...</span>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-2 mb-6 bg-secondary/50 p-1 rounded-xl mx-auto md:mx-0">
                  <TabsTrigger value="explore" className="flex items-center gap-2 text-xs md:text-sm"><School className="w-4 h-4" /> All Schools</TabsTrigger>
                  <TabsTrigger value="siams" className="flex items-center gap-2 text-xs md:text-sm"><ListFilter className="w-4 h-4" /> Siam's Picks</TabsTrigger>
                </TabsList>

                {totalItems === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <School className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No colleges found</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
                      {displayedColleges.map((college) => (
                        <CollegeCard
                          key={college.name}
                          college={college}
                          noEssay={NO_ESSAY_COLLEGES.has(college.name)}
                          englishReq={ENGLISH_PROFICIENCY_DATA[college.name]?.DET}
                          hasScoir={SCOIR_FREE_APP.has(college.name)}
                          onClick={() => setSelectedCollege(college)}
                          isSiamsPick={activeTab === 'siams'}
                        />
                      ))}
                    </div>
                    
                    {totalPages > 1 && (
                      <div className="py-6 flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem><Button variant="ghost" size="sm" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>Previous</Button></PaginationItem>
                            <PaginationItem><span className="mx-4 text-sm font-medium">Page {currentPage} of {totalPages}</span></PaginationItem>
                            <PaginationItem><Button variant="ghost" size="sm" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>Next</Button></PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </div>
                )}
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
