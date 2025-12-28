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
              By using this application, you agree to the following terms...
            </p>
             {/* ... Content abbreviated for brevity ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
