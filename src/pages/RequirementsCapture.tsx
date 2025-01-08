import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { questions } from "@/components/sections/requirements/questions";
import { QuestionDisplay } from "@/components/sections/requirements/QuestionDisplay";
import { AuthDialog } from "@/components/sections/join-form/AuthDialog";

export default function RequirementsCapture() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = async () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Please provide an answer",
        description: "This information helps us match you with the right talent.",
        variant: "destructive",
      });
      return;
    }

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
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Store answers in localStorage before showing auth dialog
        localStorage.setItem('pendingRequirements', JSON.stringify(updatedAnswers));
        setShowAuthDialog(true);
        return;
      }

      setIsSubmitting(true);
      try {
        const formattedAnswers = {
          type: updatedAnswers[1],
          industry: updatedAnswers[2],
          duration: updatedAnswers[3],
          responsibilities: updatedAnswers[4],
          timeline: updatedAnswers[5],
          email: updatedAnswers[6],
          company: updatedAnswers[7],
        };

        const { error: requirementError } = await supabase
          .from('requirements')
          .insert([{ 
            answers: formattedAnswers,
            user_id: session.user.id
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
        <QuestionDisplay
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          currentAnswer={currentAnswer}
          setCurrentAnswer={setCurrentAnswer}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isSubmitting={isSubmitting}
          handleKeyPress={handleKeyPress}
        />
        <AuthDialog 
          open={showAuthDialog} 
          onOpenChange={setShowAuthDialog} 
        />
      </div>
    </div>
  );
}