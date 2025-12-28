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
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent",
        description: "Thank you! We'll review your message and respond as soon as possible.",
      });
      // Optional: clear form
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

        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold mb-2">How can we help?</h1>
          <p className="text-muted-foreground">Select an option below to get in touch with our team.</p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-secondary/50 rounded-xl">
            <TabsTrigger value="contact" className="py-3 gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="w-4 h-4" /> Contact
            </TabsTrigger>
            <TabsTrigger value="feedback" className="py-3 gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="w-4 h-4" /> Feedback
            </TabsTrigger>
            <TabsTrigger value="issue" className="py-3 gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bug className="w-4 h-4" /> Report Bug
            </TabsTrigger>
          </TabsList>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8">
            <TabsContent value="contact" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">General Support</h2>
                <p className="text-muted-foreground text-sm">Need help or have a question? Our support team is here to assist you.</p>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium text-primary">siamahmedofficial01@gmail.com</span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Name (Optional)</Label>
                  <Input id="c-name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email">Email Address</Label>
                  <Input id="c-email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-message">Message</Label>
                  <Textarea id="c-message" placeholder="How can we help you today?" className="min-h-[120px]" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="feedback" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Send Feedback</h2>
                <p className="text-muted-foreground text-sm">We’d love to hear your thoughts! Your feedback helps us improve the app.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="f-email">Email Address</Label>
                  <Input id="f-email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="f-feedback">Your Feedback</Label>
                  <Textarea id="f-feedback" placeholder="What do you like? What can we improve?" className="min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Submit Feedback</>}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="issue" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Report an Issue</h2>
                <p className="text-muted-foreground text-sm">Found a bug or incorrect data? Please report it so we can fix it quickly.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="i-email">Email Address</Label>
                    <Input id="i-email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="i-type">Issue Type</Label>
                    <Select required>
                      <SelectTrigger id="i-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bug">Software Bug</SelectItem>
                        <SelectItem value="data">Incorrect Data</SelectItem>
                        <SelectItem value="ui">UI/Visual Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="i-desc">Description</Label>
                  <Textarea id="i-desc" placeholder="Please describe what happened and steps to reproduce..." className="min-h-[120px]" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="i-screen">Screenshot URL (Optional)</Label>
                  <Input id="i-screen" placeholder="https://..." />
                </div>
                <Button type="submit" variant="destructive" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Report Issue'}
                </Button>
              </form>
            </TabsContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
