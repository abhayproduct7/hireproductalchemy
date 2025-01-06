import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-muted-foreground">
          View your ongoing projects and applications here.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;