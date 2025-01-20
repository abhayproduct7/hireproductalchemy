import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export const ProcessComparisonGraph = () => {
  const comparisonData = [
    {
      aspect: "Strategic Decision Making",
      aiAssisted: "Human expertise enhanced by AI",
      traditional: "Human expertise only",
      aiOnly: "Limited decision capability",
      highlight: true,
    },
    {
      aspect: "AI Tools Proficiency",
      aiAssisted: true,
      traditional: false,
      aiOnly: true,
      highlight: true,
    },
    {
      aspect: "Ownership & Accountability",
      aiAssisted: true,
      traditional: true,
      aiOnly: false,
      highlight: true,
    },
    {
      aspect: "Processing Speed",
      aiAssisted: "10x faster with AI",
      traditional: "Standard",
      aiOnly: "Very fast but error-prone",
      highlight: true,
    },
    {
      aspect: "Stakeholder Management",
      aiAssisted: true,
      traditional: true,
      aiOnly: false,
      highlight: true,
    },
    {
      aspect: "Data Analysis",
      aiAssisted: "AI-enhanced human analysis",
      traditional: "Manual analysis",
      aiOnly: "Automated analysis only",
      highlight: false,
    },
    {
      aspect: "Creative Problem Solving",
      aiAssisted: "Enhanced by AI suggestions",
      traditional: "Human creativity only",
      aiOnly: "Pattern-based solutions",
      highlight: true,
    },
    {
      aspect: "Risk Management",
      aiAssisted: true,
      traditional: true,
      aiOnly: false,
      highlight: true,
    }
  ];

  return (
    <div className="w-full space-y-6 bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-primary mb-6">The Future of Product Management</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-4 text-left font-medium text-muted-foreground">Capabilities</th>
              <th className="py-4 px-4 text-center bg-secondary/5 font-medium text-secondary">
                AI-Assisted PM
              </th>
              <th className="py-4 px-4 text-center font-medium text-muted-foreground">
                Traditional PM
              </th>
              <th className="py-4 px-4 text-center font-medium text-muted-foreground">
                AI-Only Agent
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
                  {typeof item.aiAssisted === 'boolean' ? (
                    item.aiAssisted ? (
                      <Check className="h-5 w-5 text-secondary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className={item.highlight ? 'text-secondary font-medium' : ''}>
                      {item.aiAssisted}
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
                  {typeof item.aiOnly === 'boolean' ? (
                    item.aiOnly ? (
                      <Check className="h-5 w-5 text-gray-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span>{item.aiOnly}</span>
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
            ProductHire's AI-assisted PMs combine the best of both worlds: human expertise in strategic thinking, 
            stakeholder management, and accountability, enhanced by AI capabilities for faster processing, 
            data analysis, and creative problem-solving. This unique combination delivers superior results 
            compared to both traditional PMs and AI-only solutions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};