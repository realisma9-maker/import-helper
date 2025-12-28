import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <Helmet>
        <title>Privacy Policy | SmartApply</title>
        <meta name="description" content="Privacy Policy for SmartApply application." />
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground mt-1">Last Updated: October 2025</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <p className="text-lg leading-relaxed">
              We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our application.
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Academic details:</strong> GPA, SAT/ACT scores, test-optional status</li>
                <li><strong>Financial information:</strong> EFC range</li>
                <li><strong>Profile details:</strong> Intended major, extracurricular strength, essay strength</li>
                <li><strong>Usage data:</strong> App interactions, feature usage</li>
              </ul>
              <p className="bg-secondary/50 p-4 rounded-lg text-sm border-l-4 border-primary">
                We do <strong>not</strong> collect sensitive personal identifiers such as passports, bank details, or government IDs.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. How We Use Your Information</h2>
              <p>Your data is used solely to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide personalized university recommendations</li>
                <li>Categorize colleges into Reach, Match, and Safety</li>
                <li>Generate admission insights and application guidance</li>
                <li>Improve app performance and user experience</li>
              </ul>
              <p className="font-medium">We never sell or rent your data to third parties.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. AI & Data Processing</h2>
              <p className="text-muted-foreground">
                We use AI services to generate explanations and guidance based on the information you provide. All AI-generated insights are informational only and do not guarantee admission outcomes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. Data Storage & Security</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Data is stored securely using industry-standard practices</li>
                <li>Access is restricted and monitored</li>
                <li>We take reasonable steps to protect your information from unauthorized access</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">5. Third-Party Services</h2>
              <p className="text-muted-foreground">
                We may use trusted third-party tools (such as analytics or AI APIs) strictly to support app functionality. These services are bound by their own privacy and security policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">6. Your Control & Rights</h2>
              <p>You can:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Edit or delete your profile data</li>
                <li>Stop using the service at any time</li>
                <li>Request data removal by contacting support</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">7. Policy Updates</h2>
              <p className="text-muted-foreground">
                This Privacy Policy may be updated periodically. Continued use of the app indicates acceptance of the updated policy.
              </p>
            </section>

            <div className="pt-8 border-t border-border mt-8">
              <h3 className="font-bold mb-2">Contact for Privacy Questions</h3>
              <p className="text-muted-foreground">Email: <a href="mailto:siamahmedofficial01@gmail.com" className="text-primary hover:underline">siamahmedofficial01@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
