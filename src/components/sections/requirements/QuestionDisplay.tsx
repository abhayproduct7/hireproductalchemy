import { Question } from "./questions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuestionDisplayProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  isSubmitting: boolean;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export const QuestionDisplay = ({
  question,
  currentQuestion,
  totalQuestions,
  currentAnswer,
  setCurrentAnswer,
  handleNext,
  handlePrevious,
  isSubmitting,
  handleKeyPress,
}: QuestionDisplayProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {question.question}
        </h1>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="space-y-4">
        <input
          type={question.type || "text"}
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={question.placeholder}
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
            {currentQuestion === totalQuestions - 1 ? (
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
  );
};