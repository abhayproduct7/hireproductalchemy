import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export const ProcessComparisonGraph = () => {
  const comparisonData = [
    {
      aspect: "Time to Hire",
      producthire: "3-5 days",
      traditional: "1-3 months",
      freelance: "2-3 weeks",
      highlight: true,
    },
    {
      aspect: "Pre-vetted AI-Enhanced PMs",
      producthire: true,
      traditional: false,
      freelance: false,
      highlight: true,
    },
    {
      aspect: "Fixed Transparent Pricing",
      producthire: true,
      traditional: false,
      freelance: false,
      highlight: true,
    },
    {
      aspect: "AI-Powered Matching",
      producthire: true,
      traditional: false,
      freelance: false,
      highlight: true,
    },
    {
      aspect: "Cost Level",
      producthire: "££",
      traditional: "££££",
      freelance: "£",
      highlight: false,
    },
    {
      aspect: "Failure Rate",
      producthire: "Very Low",
      traditional: "Low",
      freelance: "Very High",
      highlight: true,
    },
    {
      aspect: "Free Rematching",
      producthire: true,
      traditional: false,
      freelance: false,
      highlight: true,
    },
    {
      aspect: "AI Training & Tools",
      producthire: true,
      traditional: false,
      freelance: false,
      highlight: true,
    }
  ];

  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-6">See How We Compare</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-4 text-left font-medium text-muted-foreground">Features</th>
              <th className="py-4 px-4 text-center bg-secondary/5 font-medium text-secondary">
                ProductHire
              </th>
              <th className="py-4 px-4 text-center font-medium text-muted-foreground">
                In-House Hire
              </th>
              <th className="py-4 px-4 text-center font-medium text-muted-foreground">
                Freelance Platform
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr 
                key={index} 
                className={`border-b ${item.highlight ? 'bg-secondary/5' : ''}`}
              >
                <td className="py-4 px-4 font-medium">{item.aspect}</td>
                <td className="py-4 px-4 text-center">
                  {typeof item.producthire === 'boolean' ? (
                    item.producthire ? (
                      <Check className="h-5 w-5 text-secondary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className={item.highlight ? 'text-secondary font-medium' : ''}>
                      {item.producthire}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {typeof item.traditional === 'boolean' ? (
                    item.traditional ? (
                      <Check className="h-5 w-5 text-gray-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span>{item.traditional}</span>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {typeof item.freelance === 'boolean' ? (
                    item.freelance ? (
                      <Check className="h-5 w-5 text-gray-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span>{item.freelance}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card className="mt-6 border-2 border-muted bg-muted/5">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            ProductHire combines AI-enhanced product managers with cutting-edge tools and fixed pricing, 
            ensuring consistent quality and faster time-to-hire while maintaining competitive costs. 
            Our PMs are trained on advanced AI solutions for modern product management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};