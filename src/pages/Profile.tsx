import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <p className="mt-4 text-muted-foreground">
          Edit your profile and community details here.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;