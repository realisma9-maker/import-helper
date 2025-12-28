import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Mail, MessageSquare, Bug, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent",
        description: "Thank you! We'll review your message and respond as soon as possible.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <Helmet>
        <title>Support Center | SmartApply</title>
        <meta name="description" content="Contact support, send feedback, or report issues." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 hover:bg-secondary/50 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>
        {/* ... Rest of support form UI ... */}
         <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold mb-2">How can we help?</h1>
          <p className="text-muted-foreground">Select an option below to get in touch with our team.</p>
        </div>
         <Tabs defaultValue="contact" className="w-full">
            {/* ... Tab content ... */}
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-secondary/50 rounded-xl">
                <TabsTrigger value="contact" className="py-3">Contact</TabsTrigger>
                <TabsTrigger value="feedback" className="py-3">Feedback</TabsTrigger>
                <TabsTrigger value="issue" className="py-3">Report Bug</TabsTrigger>
            </TabsList>
             <TabsContent value="contact">
                 <p className="mb-4">Email: siamahmedofficial01@gmail.com</p>
                 {/* Add form here */}
             </TabsContent>
              {/* Add other contents */}
         </Tabs>
      </div>
    </div>
  );
};

export default Support;
