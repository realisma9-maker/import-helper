import { GraduationCap, Check, School, BadgeDollarSign, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onEnterApp: () => void;
}

export const HeroSection = ({ onEnterApp }: HeroSectionProps) => {
  return (
    <section className="min-h-screen bg-hero-gradient overflow-y-auto flex flex-col">
      {/* Hero Content */}
      <div className="flex-1">
        {/* Hero */}
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-16 relative">
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
          
          <GraduationCap className="w-20 h-20 text-primary mb-6 animate-float relative z-10" />
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-3 relative z-10">
            Find Your Dream University
          </h1>
          
          <p className="text-primary font-semibold text-lg tracking-widest mb-4">
            Smart • Affordable • Global
          </p>
          
          <p className="text-muted-foreground text-lg max-w-xl mb-8 leading-relaxed">
            Personalized university discovery, scholarships, and admission guidance for
            international students — all in one place.
          </p>
          
          <Button 
            onClick={onEnterApp}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 text-lg font-bold rounded-xl shadow-glow hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Explore Universities 🚀
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 py-6 px-4 bg-card/60 backdrop-blur-sm">
          {[
            'Updated with 2025 verified data',
            'International-student friendly',
            'Transparent cost & aid insights'
          ].map((badge) => (
            <span key={badge} className="flex items-center gap-2 text-accent-green font-semibold text-sm">
              <span className="bg-accent-green-light p-1 rounded-full">
                <Check className="w-3 h-3" />
              </span>
              {badge}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6 py-16">
          <div className="bg-card p-8 rounded-2xl shadow-card text-center hover:-translate-y-1 hover:shadow-lg transition-all">
            <School className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">Universities</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Browse 350+ US universities with acceptance rates, SAT ranges, and tuition details.
            </p>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-card text-center hover:-translate-y-1 hover:shadow-lg transition-all">
            <BadgeDollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">Scholarships</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Explore need-based and merit scholarships available for international students.
            </p>
          </div>
        </div>

        {/* Value Section */}
        <div className="bg-primary text-primary-foreground py-16 px-6">
          <h2 className="font-heading text-3xl font-extrabold text-center mb-8">Why Use This App?</h2>
          <ul className="max-w-md mx-auto space-y-4">
            {[
              'Data-driven university recommendations',
              'Transparent cost & financial aid insights',
              'Built specifically for international students',
              'No fake rankings — real admission context'
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg">
                <CircleCheck className="w-5 h-5 opacity-80" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-heading text-3xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'Is this app free to use?', a: 'Yes, basic university browsing and information are completely free.' },
              { q: 'Does this app guarantee admission?', a: 'No. Admissions are holistic and competitive, especially for international students.' },
              { q: 'Is financial aid information accurate?', a: 'We use the most recent publicly available data, but always verify on official university websites.' },
              { q: 'Is this app suitable for low EFC students?', a: 'Yes. The app highlights need-blind and aid-friendly universities where possible.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <h4 className="font-heading font-bold mb-2">{q}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Legal Microcopy */}
      <footer className="bg-foreground text-primary-foreground text-center py-10 px-6 mt-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link to="/privacy" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</Link>
          <Link to="/terms" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Terms & Conditions</Link>
          <Link to="/support" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Contact Support</Link>
        </div>
        <p className="text-sm opacity-80">© 2025 SmartApply</p>
        <p className="text-sm opacity-60 mt-1">Built for international students worldwide 🌍</p>
      </footer>
    </section>
  );
};
