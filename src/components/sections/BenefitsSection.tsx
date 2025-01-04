import { Clock, Globe, Wallet, Shield } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Flexible Engagement",
      description: "Choose between part-time, fractional, or full-time roles that align with your preferred work-life balance."
    },
    {
      icon: Globe,
      title: "Remote-First",
      description: "Work with innovative companies globally while maintaining your freedom to work from anywhere."
    },
    {
      icon: Wallet,
      title: "Competitive Compensation",
      description: "Access premium opportunities with companies that value experienced product leadership."
    },
    {
      icon: Shield,
      title: "Vetted Opportunities",
      description: "We carefully screen all companies to ensure meaningful engagements and professional growth."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Join Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the freedom of choosing how you want to work while making a significant impact on growing products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-6 bg-muted rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};