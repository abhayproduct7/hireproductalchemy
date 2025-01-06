interface AuthLinksProps {
  setView: (view: "sign_in" | "sign_up") => void;
}

export const AuthLinks = ({ setView }: AuthLinksProps) => {
  return (
    <div className="space-y-4 text-center">
      <PasswordResetButton />
      <button
        type="button"
        onClick={() => setView("sign_up")}
        className="w-full text-sm text-accent hover:underline"
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
};