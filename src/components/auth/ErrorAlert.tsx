import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};