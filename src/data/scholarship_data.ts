// Scholarship and Special Features Data

// Colleges with No Supplemental Essays
export const NO_ESSAY_COLLEGES = new Set([
    "Bard College", "Bates College", "Beloit College", "Bowdoin College",
    "Case Western Reserve University", "Clark University", "Clarkson University",
    "Clemson University", "Connecticut College", "Colby College", "DePaul University",
    "Drexel University", "Franklin and Marshall College", "Fordham University",
    "Gettysburg College", "Goucher College", "Grinnell College", "Hamilton College",
    "Kenyon College", "Miami University-Oxford", "Middlebury College", "Providence College",
    "Skidmore College", "Spelman College", "Binghamton University", "University at Buffalo",
    "Stony Brook University", "St Lawrence University", "Stevens Institute of Technology",
    "Temple University", "Trinity University", "Union College", "The University of Alabama",
    "University of Arkansas", "University of Connecticut (UConn)", "University of Delaware",
    "University of Denver", "University of Iowa", "University of Minnesota-Twin Cities",
    "University of New Hampshire (UNH)", "Washington and Lee University", "Wesleyan University",
    "Whitman College"
]);

// Colleges Meeting 100% Demonstrated Need for International Students
export const FULL_NEED_MET_INTL: Record<string, { fullRide: boolean; note?: string }> = {
    "Barnard College": { fullRide: false, note: "Women's College" },
    "Bates College": { fullRide: false },
    "Bennington College": { fullRide: true },
    "Berea College": { fullRide: true },
    "Bowdoin College": { fullRide: false },
    "Brown University": { fullRide: true },
    "Bryn Mawr College": { fullRide: false, note: "Women's College" },
    "Carleton College": { fullRide: true },
    "Colby College": { fullRide: false },
    "Colgate University": { fullRide: false },
    "Colorado College": { fullRide: true },
    "Columbia University": { fullRide: true },
    "Connecticut College": { fullRide: false },
    "Cornell University": { fullRide: true },
    "Dartmouth College": { fullRide: true },
    "Davidson College": { fullRide: true },
    "Dickinson College": { fullRide: false },
    "Duke University": { fullRide: true },
    "Franklin and Marshall College": { fullRide: false },
    "Gettysburg College": { fullRide: false },
    "Hamilton College": { fullRide: false },
    "Harvey Mudd College": { fullRide: false },
    "Haverford College": { fullRide: true },
    "Johns Hopkins University": { fullRide: false },
    "Kenyon College": { fullRide: true },
    "Lafayette College": { fullRide: false },
    "Lehigh University": { fullRide: true },
    "Macalester College": { fullRide: false },
    "Middlebury College": { fullRide: true },
    "Oberlin College": { fullRide: false },
    "Pomona College": { fullRide: false },
    "Rice University": { fullRide: true },
    "Skidmore College": { fullRide: false },
    "Smith College": { fullRide: false, note: "Women's College" },
    "Swarthmore College": { fullRide: false },
    "Stanford University": { fullRide: true },
    "Trinity College": { fullRide: false },
    "Tufts University": { fullRide: true },
    "University of Chicago": { fullRide: false },
    "University of Miami (UM)": { fullRide: false },
    "University of Pennsylvania (UPenn)": { fullRide: false },
    "University of Richmond": { fullRide: false },
    "Vanderbilt University": { fullRide: true },
    "Vassar College": { fullRide: false },
    "Washington University in St. Louis (WashU)": { fullRide: false },
    "Wellesley College": { fullRide: false, note: "Women's College" },
    "Williams College": { fullRide: true }
};

// Free Application via Scoir
export const SCOIR_FREE_APP = new Set([
    "Allegheny College", "Beloit College", "Clark University", "Colby College",
    "Colorado College", "DePauw University", "Denison University", "Florida Southern College",
    "Furman University", "Hobart William Smith Colleges", "Kenyon College", "Knox College",
    "Loyola University Chicago", "Le Moyne College", "Lawrence University", "Oberlin College",
    "Ohio Wesleyan University", "Reed College", "Rollins College", "Southwestern University",
    "St Olaf College", "The College of Wooster", "Trinity University"
]);

// Scholarship Data - Name, Amount, Deadline
export const SCHOLARSHIP_DATA: Record<string, Array<{ name: string; amount: number | null; deadline: string }>> = {
    "Vassar College": [
        { name: "Full-Ride Scholarship", amount: 89270, deadline: "Jan 1, 2026" }
    ],
    "Yale University": [
        { name: "Yale Scholarship", amount: 90550, deadline: "Jan 2, 2026" }
    ],
    "Swarthmore College": [
        { name: "Grant Aid", amount: null, deadline: "Jan 4, 2026" }
    ],
    "Bowdoin College": [
        { name: "Full-Ride Scholarship", amount: 93800, deadline: "Jan 5, 2026" }
    ],
    "Williams College": [
        { name: "Full-Ride Scholarship", amount: 90750, deadline: "Jan 5, 2026" }
    ],
    "Pitzer College": [
        { name: "Trustee Scholarship", amount: 80000, deadline: "Jan 5, 2026" }
    ],
    "Pomona College": [
        { name: "Full Ride Scholarship", amount: null, deadline: "Jan 8, 2026" }
    ],
    "Haverford College": [
        { name: "Full-Ride Scholarship", amount: 93600, deadline: "Jan 10, 2026" }
    ],
    "Bucknell University": [
        { name: "Merit Scholarships", amount: 20000, deadline: "Jan 10, 2026" }
    ],
    "Davidson College": [
        { name: "Need-Based Full Ride", amount: null, deadline: "Jan 11, 2026" }
    ],
    "Amherst College": [
        { name: "Full-Ride Scholarship", amount: 93090, deadline: "Jan 15, 2026" }
    ],
    "Wellesley College": [
        { name: "Full-Ride Scholarship", amount: 92440, deadline: "Jan 15, 2026" }
    ],
    "Carleton College": [
        { name: "Starr Scholarship Program", amount: 90462, deadline: "Jan 15, 2026" }
    ],
    "Wesleyan University": [
        { name: "Full-Ride Scholarship", amount: 96596, deadline: "Jan 15, 2026" },
        { name: "Need-Based Aid", amount: 96596, deadline: "Jan 15, 2026" }
    ],
    "Hamilton College": [
        { name: "Full-Ride Scholarship", amount: 91150, deadline: "Jan 15, 2026" }
    ],
    "Colgate University": [
        { name: "Full-Ride Scholarship", amount: 95216, deadline: "Jan 15, 2026" }
    ],
    "University of Richmond": [
        { name: "Need-Based Full Ride", amount: 96596, deadline: "Jan 15, 2026" }
    ],
    "Barnard College": [
        { name: "Full-Ride Scholarship", amount: 90924, deadline: "Jan 15, 2026" }
    ],
    "Smith College": [
        { name: "Full-Ride Scholarship", amount: 94396, deadline: "Jan 15, 2026" }
    ],
    "Grinnell College": [
        { name: "Full-Ride Scholarship", amount: 91094, deadline: "Jan 15, 2026" }
    ],
    "Lafayette College": [
        { name: "Lafayette Awards", amount: 5000, deadline: "Jan 15, 2026" },
        { name: "Marquis Fellowship", amount: 88080, deadline: "Jan 15, 2026" }
    ],
    "Macalester College": [
        { name: "Charles J. Turck Presidential Honor", amount: 80000, deadline: "Jan 15, 2026" }
    ],
    "Claremont McKenna College": [
        { name: "Full-Ride Scholarship", amount: 85850, deadline: "Jan 15, 2026" }
    ],
    "Middlebury College": [
        { name: "Full-Ride Scholarship", amount: 96596, deadline: "Feb 1, 2026" }
    ],
    "Harvey Mudd College": [
        { name: "Full-Ride Scholarship", amount: 98984, deadline: "Feb 1, 2026" }
    ],
    "Washington and Lee University": [
        { name: "Need-Based Full Ride", amount: 90100, deadline: "Feb 15, 2026" }
    ],
    "University of Redlands": [
        { name: "Hunsaker Scholarship", amount: 76338, deadline: "Feb 28, 2026" }
    ],
    "Rhodes College": [
        { name: "Merit Scholarship", amount: 37000, deadline: "Jan 15, 2026" }
    ],
    "Gettysburg College": [
        { name: "Merit Scholarship", amount: 43000, deadline: "Jan 15, 2026" },
        { name: "Abraham Lincoln Scholarship", amount: 52000, deadline: "Jan 15, 2026" },
        { name: "Presidential Scholarship", amount: 40000, deadline: "Jan 15, 2026" }
    ],
    "Lawrence University": [
        { name: "Merit Scholarship", amount: 32500, deadline: "Jan 15, 2026" }
    ],
    "New Jersey Institute of Technology": [
        { name: "Merit Scholarship", amount: 22000, deadline: "Jan 15, 2026" }
    ],
    "Clark University": [
        { name: "Presidential LEEP Scholarship", amount: 70000, deadline: "Jan 15, 2026" }
    ],
    "Connecticut College": [
        { name: "Merit Scholarship", amount: 25000, deadline: "Jan 15, 2026" }
    ],
    "Wabash College": [
        { name: "Presidential International Scholarships", amount: 43000, deadline: "Jan 15, 2026" }
    ],
    "Knox College": [
        { name: "Merit Scholarship", amount: 40000, deadline: "Jan 15, 2026" }
    ],
    "Bennington College": [
        { name: "Merit Scholarship", amount: 23750, deadline: "Jan 15, 2026" },
        { name: "Need Based Aid", amount: 33760, deadline: "Jan 15, 2026" }
    ],
    "Wofford College": [
        { name: "Merit Scholarship", amount: 22500, deadline: "Jan 15, 2026" }
    ],
    "Kenyon College": [
        { name: "Honor and Science Scholarships", amount: 25000, deadline: "Jan 15, 2026" },
        { name: "Distinguished Academic Scholarship", amount: 15000, deadline: "Jan 15, 2026" },
        { name: "Kenyon Promise Scholarship", amount: 10000, deadline: "Jan 15, 2026" },
        { name: "Studio Art, Music, or Writing Scholarships", amount: 25000, deadline: "Jan 15, 2026" }
    ],
    "Hanover College": [
        { name: "HAQ Scholarship", amount: 32000, deadline: "Jan 15, 2026" },
        { name: "Music Scholarship", amount: 2500, deadline: "Jan 15, 2026" },
        { name: "Theatre Scholarship", amount: 2500, deadline: "Jan 15, 2026" }
    ],
    "Whitman College": [
        { name: "Merit Scholarship", amount: 30000, deadline: "Jan 15, 2026" },
        { name: "Talent-Based Scholarship", amount: 10000, deadline: "Jan 15, 2026" }
    ],
    "University of San Francisco (USF)": [
        { name: "Merit-Based Scholarship", amount: 22000, deadline: "Jan 15, 2026" }
    ],
    "University of Kansas": [
        { name: "International Excellence Award", amount: 9500, deadline: "Jan 15, 2026" },
        { name: "Chancellor's Scholarship", amount: 10000, deadline: "Mar 1, 2026" }
    ],
    "University of South Florida (USF)": [
        { name: "International Academic Award", amount: 10000, deadline: "Jan 15, 2026" }
    ],
    "Trinity College": [
        { name: "Global Scholars Program", amount: 85000, deadline: "Jan 15, 2026" }
    ],
    "The University of Alabama": [
        { name: "International Merit Scholarship", amount: 17000, deadline: "Jan 15, 2026" }
    ],
    "University of Colorado Boulder": [
        { name: "International Merit Award", amount: 9500, deadline: "Jan 15, 2026" }
    ],
    "University of Arizona": [
        { name: "International Merit Award", amount: 14000, deadline: "Feb 1, 2026" }
    ],
    "Marist College": [
        { name: "Presidential Scholarship", amount: 25000, deadline: "Feb 1, 2026" }
    ],
    "Drake University": [
        { name: "Founders Scholarship", amount: 24000, deadline: "Feb 1, 2026" }
    ],
    "Michigan State University": [
        { name: "International Excellence Scholarship", amount: 25000, deadline: "Feb 1, 2026" }
    ],
    "Temple University": [
        { name: "Merit Scholarship", amount: 20000, deadline: "Feb 1, 2026" },
        { name: "#YouAreWelcomeHere Scholarship", amount: 20000, deadline: "Feb 1, 2026" },
        { name: "#WhyUS Scholarship", amount: 6000, deadline: "Mar 1, 2026" }
    ],
    "Oregon State University": [
        { name: "International Merit Scholarship", amount: 12000, deadline: "Feb 1, 2026" },
        { name: "Regional Scholarships", amount: 10000, deadline: "Feb 1, 2026" }
    ],
    "University of Oregon": [
        { name: "International Cultural Service Program", amount: 15000, deadline: "Feb 14, 2026" }
    ],
    "Syracuse University": [
        { name: "College Scholarship", amount: 30000, deadline: "Jan 1, 2026" },
        { name: "Founders' Scholarship", amount: 20000, deadline: "Jan 15, 2026" }
    ],
    "Northeastern University": [
        { name: "International Scholars Award", amount: 28000, deadline: "Jan 15, 2026" }
    ],
    "Drexel University": [
        { name: "Global Scholar Award", amount: 27000, deadline: "Jan 15, 2026" }
    ],
    "Brandeis University": [
        { name: "Wien International Scholarship Program", amount: 40000, deadline: "Jan 15, 2026" }
    ],
    "Stevens Institute of Technology": [
        { name: "International Student Scholarship", amount: 35000, deadline: "Jan 15, 2026" }
    ],
    "University of Massachusetts-Amherst": [
        { name: "Provost Scholarship", amount: 20000, deadline: "Jan 15, 2026" }
    ],
    "Virginia Commonwealth University (VCU)": [
        { name: "Presidential Scholarship", amount: 15000, deadline: "Feb 1, 2026" }
    ],
    "University of Maryland-Baltimore County (UMBC)": [
        { name: "Dean's Scholarships", amount: 12000, deadline: "Jan 15, 2026" }
    ],
    "University of North Carolina at Greensboro": [
        { name: "Presidential Scholarship", amount: 20000, deadline: "Feb 1, 2026" }
    ],
    "Gonzaga University": [
        { name: "Dean's Scholarships", amount: 20000, deadline: "Jan 15, 2026" }
    ],
    "Seattle University": [
        { name: "Merit Scholarship", amount: 20000, deadline: "Jan 15, 2026" }
    ],
    "Fairfield University": [
        { name: "Provost Merit Award", amount: 25000, deadline: "Jan 15, 2026" }
    ],
    "DePaul University": [
        { name: "Global Studies Scholarship", amount: 20000, deadline: "Feb 1, 2026" },
        { name: "International Student Scholarship", amount: 18000, deadline: "Feb 1, 2026" }
    ],
    "University of San Diego (USD)": [
        { name: "Dean's Scholarships", amount: 30000, deadline: "Jan 15, 2026" }
    ],
    "Villanova University": [
        { name: "Trustee Scholarship", amount: null, deadline: "Jan 15, 2026" }
    ],
    "Creighton University": [
        { name: "President's Scholarship", amount: 24000, deadline: "Jan 15, 2026" }
    ],
    "Quinnipiac University": [
        { name: "Merit Scholarship", amount: 30000, deadline: "Feb 1, 2026" }
    ],
    "University of Houston": [
        { name: "Academic Excellence Scholarship", amount: 20000, deadline: "Jan 15, 2026" }
    ],
    "Stony Brook University": [
        { name: "Provost Scholarship", amount: 12000, deadline: "Jan 15, 2026" }
    ],
    "University of Alabama at Birmingham (UAB)": [
        { name: "Honors Scholarship", amount: 10000, deadline: "Mar 1, 2026" }
    ]
};

