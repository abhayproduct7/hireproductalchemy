import { useState, useEffect } from "react";
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
  }
];

export default function RequirementsCapture() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Add authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to submit requirements",
          variant: "destructive",
        });
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

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

    const updatedAnswers = {
      ...answers,
      [questions[currentQuestion].id]: currentAnswer,
    };
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentQuestion === questions.length - 1) {
      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please sign in to submit requirements",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        const { error } = await supabase
          .from("requirements")
          .insert([{ 
            answers: updatedAnswers,
            user_id: session.user.id // Include user_id in the insert
          }]);

        if (error) {
          console.error("Error submitting requirements:", error);
          throw error;
        }

        toast({
          title: "Requirements submitted successfully!",
          description: "We'll be in touch with matched candidates soon.",
        });
        
        navigate("/hire");
      } catch (error) {
        console.error("Error submitting requirements:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
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
              type="text"
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
                disabled={currentQuestion === 0}
                className="w-28"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} className="w-28">
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                {currentQuestion !== questions.length - 1 && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}