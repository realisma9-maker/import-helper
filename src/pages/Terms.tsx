import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <Helmet>
        <title>Terms & Conditions | SmartApply</title>
        <meta name="description" content="Terms and Conditions for SmartApply application." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 hover:bg-secondary/50 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <div className="bg-primary/10 p-3 rounded-xl">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold">Terms and Conditions</h1>
              <p className="text-muted-foreground mt-1">Last Updated: October 2025</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <p className="text-lg leading-relaxed font-medium">
              By using this application, you agree to the following terms:
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Purpose of the App</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>This app provides informational guidance on university selection, financial aid, and admissions for international students.</li>
                <li>It is not affiliated with or endorsed by any university.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. No Admission Guarantee</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Admission decisions are made solely by universities.</li>
                <li>All recommendations are estimates based on available data.</li>
                <li><strong>We do not guarantee admission, scholarships, or financial aid.</strong></li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. User Responsibility</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Verifying information on official university websites</li>
                <li>Submitting accurate application materials</li>
                <li>Making final academic and financial decisions</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. AI-Generated Content Disclaimer</h2>
              <div className="bg-secondary/30 p-4 rounded-lg border border-border text-sm">
                <p>AI-generated advice:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Is for guidance only</li>
                  <li>May not reflect the most recent policy changes</li>
                  <li>Should not replace official or professional advice</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">We are not liable for:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Admission rejections</li>
                <li>Financial losses</li>
                <li>Decisions made based on app content</li>
              </ul>
              <p className="mt-2 text-sm italic">Use of the app is at your own discretion.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">6. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All app content, design, and logic are the property of the app creator. Unauthorized copying or redistribution is prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">7. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to update these terms at any time. Continued use implies acceptance.
              </p>
            </section>

            <div className="pt-8 border-t border-border mt-8">
              <h3 className="font-bold mb-2">Contact for Legal Queries</h3>
              <p className="text-muted-foreground">Email: <a href="mailto:siamahmedofficial01@gmail.com" className="text-primary hover:underline">siamahmedofficial01@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
