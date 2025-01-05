import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to Submit Your Application</DialogTitle>
          <DialogDescription>
            Your form data has been saved. Please sign in or create an account to submit your application.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Continue Editing
          </Button>
          <Button onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};