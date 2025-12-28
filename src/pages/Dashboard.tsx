import { useState } from 'react';
import { Search, Sliders, Star, School, Loader2 } from 'lucide-react';
import { useCollegeData } from '@/hooks/useCollegeData';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeDetail } from '@/components/CollegeDetail';
import { HeroSection } from '@/components/HeroSection';
import { College } from '@/types/college';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { REQUIREMENTS_DATA } from '@/data/collegeData';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [showHero, setShowHero] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  
  const { 
    filteredColleges, 
    curatedColleges, 
    loading, 
    filters, 
    setFilters,
    NO_ESSAY_COLLEGES,
    ENGLISH_PROFICIENCY_DATA
  } = useCollegeData();

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
          <header className="glass-dark border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search colleges, cities, states..."
                value={filters.search}
                onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                className="pl-10 bg-secondary/50 border-0 focus-visible:ring-primary"
              />
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <span className="font-bold">{filteredColleges.length}</span>
              <span className="text-sm">Schools Found</span>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading universities...</span>
              </div>
            ) : (
              <>
                {/* Curated Picks */}
                {curatedColleges.length > 0 && (
                  <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-accent-orange" />
                      <h2 className="font-heading text-xl font-bold">Curated Picks</h2>
                      <span className="text-sm text-muted-foreground ml-2">
                        Popular choices for international students
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {curatedColleges.map(college => (
                        <CollegeCard
                          key={college.name}
                          college={college}
                          isCurated
                          noEssay={NO_ESSAY_COLLEGES.has(college.name)}
                          englishReq={ENGLISH_PROFICIENCY_DATA[college.name]?.DET}
                          onClick={() => setSelectedCollege(college)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* All Universities */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <School className="w-5 h-5 text-primary" />
                    <h2 className="font-heading text-xl font-bold">Explore Universities</h2>
                    <span className="text-sm text-muted-foreground ml-2">
                      Browse all universities
                    </span>
                  </div>
                  
                  {filteredColleges.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <School className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No colleges found matching your criteria.</p>
                      <p className="text-sm mt-2">Try adjusting your filters.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredColleges.map(college => (
                        <CollegeCard
                          key={college.name}
                          college={college}
                          noEssay={NO_ESSAY_COLLEGES.has(college.name)}
                          englishReq={ENGLISH_PROFICIENCY_DATA[college.name]?.DET}
                          onClick={() => setSelectedCollege(college)}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
