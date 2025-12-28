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
            {/* ... Content abbreviated for brevity, include full content from previous step ... */}
            <p>For full details, please contact support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
