import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Question = {
  id: number;
  question: string;
  placeholder: string;
  type?: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "What type of product manager are you looking for?",
    placeholder: "e.g., Technical PM, Growth PM, Enterprise PM...",
  },
  {
    id: 2,
    question: "What industry does your company operate in?",
    placeholder: "e.g., SaaS, Fintech, Healthcare...",
  },
  {
    id: 3,
    question: "What's the expected duration of the engagement?",
    placeholder: "e.g., 3 months, 6 months, 1 year...",
  },
  {
    id: 4,
    question: "What are the key responsibilities for this role?",
    placeholder: "e.g., Product strategy, Feature prioritization...",
  },
  {
    id: 5,
    question: "What's your target timeline for bringing someone onboard?",
    placeholder: "e.g., Immediately, Within 2 weeks, Next month...",
  },
  {
    id: 6,
    question: "What's your email address?",
    placeholder: "e.g., john@company.com",
    type: "email",
  },
  {
    id: 7,
    question: "What's your company name?",
    placeholder: "e.g., Acme Inc",
  }
];

export default function RequirementsCapture() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = async () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Please provide an answer",
        description: "This information helps us match you with the right talent.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format for email question
    if (questions[currentQuestion].type === 'email' && !currentAnswer.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    const updatedAnswers = {
      ...answers,
      [questions[currentQuestion].id]: currentAnswer,
    };
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentQuestion === questions.length - 1) {
      setIsSubmitting(true);
      try {
        // Get current user session
        const { data: { session } } = await supabase.auth.getSession();
        
        // Format answers for database
        const formattedAnswers = {
          type: updatedAnswers[1],
          industry: updatedAnswers[2],
          duration: updatedAnswers[3],
          responsibilities: updatedAnswers[4],
          timeline: updatedAnswers[5],
          email: updatedAnswers[6],
          company: updatedAnswers[7],
        };

        // Insert requirement
        const { error: requirementError } = await supabase
          .from('requirements')
          .insert([{ 
            answers: formattedAnswers,
            user_id: session?.user?.id || null
          }]);

        if (requirementError) throw requirementError;

        toast({
          title: "Requirements submitted successfully!",
          description: "We'll be in touch with matched candidates soon.",
        });
        
        navigate("/thank-you");
      } catch (error: any) {
        console.error("Error submitting requirements:", error);
        toast({
          title: "Something went wrong",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setCurrentAnswer(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {questions[currentQuestion].question}
            </h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="space-y-4">
            <input
              type={questions[currentQuestion].type || "text"}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={questions[currentQuestion].placeholder}
              className="w-full p-4 text-lg rounded-lg border border-input bg-background"
              autoFocus
            />

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || isSubmitting}
                className="w-28"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="w-28"
                disabled={isSubmitting}
              >
                {currentQuestion === questions.length - 1 ? (
                  isSubmitting ? "Submitting..." : "Submit"
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}