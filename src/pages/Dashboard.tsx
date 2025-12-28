import { useState, useEffect, useRef } from 'react';
import { Search, Sliders, School, Loader2, ListFilter, Home, AlertCircle } from 'lucide-react';
import { useCollegeData } from '@/hooks/useCollegeData';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeDetail } from '@/components/CollegeDetail';
import { HeroSection } from '@/components/HeroSection';
import { College } from '@/types/college';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { SIAMS_FILTERED_LIST } from '@/data/siams_filtered_list';

import { Helmet } from 'react-helmet';

const ITEMS_PER_PAGE = 24;

const Dashboard = () => {
  // Initialize state from localStorage to persist view on refresh
  const [showHero, setShowHero] = useState(() => {
    const saved = localStorage.getItem('smartApply_showHero');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState('explore');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Save state changes to localStorage
  useEffect(() => {
    localStorage.setItem('smartApply_showHero', JSON.stringify(showHero));
  }, [showHero]);

  const { 
    filteredColleges, 
    loading, 
    error,
    filters, 
    setFilters,
    NO_ESSAY_COLLEGES,
    ENGLISH_PROFICIENCY_DATA,
    REQUIREMENTS_DATA,
    INTERVIEW_DATA,
    WEBSITE_DATA,
    SCOIR_FREE_APP,
    SCHOLARSHIP_DATA,
    COST_BREAKDOWN_DATA
  } = useCollegeData();

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [filters, activeTab]);

  // Filter colleges for Siam's list
  const siamsColleges = filteredColleges.filter(c => SIAMS_FILTERED_LIST.has(c.name));
  
  const currentList = activeTab === 'explore' ? filteredColleges : siamsColleges;
  const totalItems = currentList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // Slice data for pagination
  const displayedColleges = currentList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of list
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (showHero) {
    return (
      <>
        <Helmet>
          <title>SmartApply | Find Your Dream University</title>
          <meta name="description" content="Smarter college decisions for international students. Track deadlines, calculate admission chances, and explore financial aid data for 350+ US universities." />
        </Helmet>
        <HeroSection onEnterApp={() => setShowHero(false)} />
      </>
    );
  }

  if (selectedCollege) {
    const englishData = ENGLISH_PROFICIENCY_DATA[selectedCollege.name];
    const reqData = REQUIREMENTS_DATA[selectedCollege.name];
    const interviewData = INTERVIEW_DATA[selectedCollege.name];
    const websiteUrl = WEBSITE_DATA[selectedCollege.name];
    const hasScoir = SCOIR_FREE_APP.has(selectedCollege.name);
    const hasNoEssay = NO_ESSAY_COLLEGES.has(selectedCollege.name);
    const scholarships = SCHOLARSHIP_DATA[selectedCollege.name];
    const costBreakdown = COST_BREAKDOWN_DATA[selectedCollege.name];
    
    return (
      <>
        <Helmet>
          <title>{selectedCollege.name} | SmartApply</title>
          <meta name="description" content={`Explore ${selectedCollege.name} - Acceptance rate: ${selectedCollege.raw['Overall Acceptance Rate']}, Cost: ${selectedCollege.costDisplay}, Location: ${selectedCollege.location}`} />
        </Helmet>
        <CollegeDetail 
          college={selectedCollege} 
          onBack={() => setSelectedCollege(null)}
          englishData={englishData}
          requirementsData={reqData}
          interviewData={interviewData}
          websiteUrl={websiteUrl}
          hasScoir={hasScoir}
          hasNoEssay={hasNoEssay}
          scholarships={scholarships}
          costBreakdown={costBreakdown}
        />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Explore Universities | SmartApply</title>
        <meta name="description" content="Browse 350+ US universities with acceptance rates, SAT ranges, tuition details, and financial aid information for international students." />
      </Helmet>
      
      <div className="flex h-screen bg-app-gradient overflow-hidden">
        {/* Filter Toggle (Mobile) */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`fixed top-4 left-4 z-50 w-12 h-12 rounded-xl shadow-md transition-all ${!sidebarCollapsed ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <Sliders className="w-5 h-5" />
        </Button>

        {/* Sidebar */}
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          collapsed={sidebarCollapsed} 
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="glass-dark border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-all duration-300">
            <div className="relative w-full max-w-md ml-12 md:ml-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search colleges, cities, states..."
                value={filters.search}
                onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                className="pl-10 bg-secondary/50 border-0 focus-visible:ring-primary transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full animate-in fade-in duration-500">
                <span className="font-bold">{totalItems}</span>
                <span className="text-sm">Schools Found</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowHero(true)}
                className="text-muted-foreground hover:text-foreground"
                title="Back to Home"
              >
                <Home className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Back to Home</span>
              </Button>
            </div>
          </header>

          {/* Content */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar"
          >
            {error && (
              <Alert variant="destructive" className="mb-6 animate-in slide-in-from-top-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 animate-pulse">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <span className="text-muted-foreground font-medium">Loading thousands of universities...</span>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-2 mb-8 bg-secondary/50 p-1 rounded-xl">
                  <TabsTrigger 
                    value="explore" 
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg font-semibold transition-all duration-300"
                  >
                    <School className="w-4 h-4" />
                    Explore Universities
                  </TabsTrigger>
                  <TabsTrigger 
                    value="siams" 
                    className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-orange data-[state=active]:to-primary data-[state=active]:text-white rounded-lg font-semibold transition-all duration-300"
                  >
                    <ListFilter className="w-4 h-4" />
                    Siam's Filtered List
                  </TabsTrigger>
                </TabsList>

                {totalItems === 0 ? (
                  <div className="text-center py-16 text-muted-foreground animate-in fade-in zoom-in-95 duration-500">
                    <School className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No colleges found matching your criteria.</p>
                    <p className="text-sm mt-2">Try adjusting your filters.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Grid of Cards */}
                    <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
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

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="py-4 animate-in fade-in duration-700 delay-100">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="gap-1 pl-2.5"
                              >
                                <span>Previous</span>
                              </Button>
                            </PaginationItem>
                            
                            {/* Smart Pagination Logic: Show start, end, and current window */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                              // Show first, last, current, and adjacent pages
                              if (
                                page === 1 || 
                                page === totalPages || 
                                (page >= currentPage - 1 && page <= currentPage + 1)
                              ) {
                                return (
                                  <PaginationItem key={page}>
                                    <PaginationLink 
                                      isActive={page === currentPage}
                                      onClick={() => handlePageChange(page)}
                                      className="cursor-pointer"
                                    >
                                      {page}
                                    </PaginationLink>
                                  </PaginationItem>
                                );
                              }
                              // Show ellipsis
                              if (
                                (page === currentPage - 2 && currentPage > 3) ||
                                (page === currentPage + 2 && currentPage < totalPages - 2)
                              ) {
                                return (
                                  <PaginationItem key={page}>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                );
                              }
                              return null;
                            })}

                            <PaginationItem>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="gap-1 pr-2.5"
                              >
                                <span>Next</span>
                              </Button>
                            </PaginationItem>
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
