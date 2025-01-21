import { Card, CardContent } from "@/components/ui/card";
import { Brain, Check, Clock, Users, X, Lightbulb, Shield } from "lucide-react";

export const ProcessComparisonGraph = () => {
  const comparisonData = [
    {
      aspect: "Strategic Decision Making",
      icon: Brain,
      aiAssisted: {
        label: "Human expertise enhanced by AI",
        highlight: true
      },
      traditional: {
        label: "Human expertise only",
        highlight: false
      },
      aiOnly: {
        label: "Limited decision capability",
        highlight: false
      }
    },
    {
      aspect: "Processing Speed",
      icon: Clock,
      aiAssisted: {
        label: "10x faster with AI",
        highlight: true
      },
      traditional: {
        label: "Standard",
        highlight: false
      },
      aiOnly: {
        label: "Very fast but error-prone",
        highlight: false
      }
    },
    {
      aspect: "Creative Problem Solving",
      icon: Lightbulb,
      aiAssisted: {
        label: "Enhanced by AI suggestions",
        highlight: true
      },
      traditional: {
        label: "Human creativity only",
        highlight: false
      },
      aiOnly: {
        label: "Pattern-based solutions",
        highlight: false
      }
    },
    {
      aspect: "Ownership & Accountability",
      icon: Shield,
      aiAssisted: {
        value: true,
        highlight: true
      },
      traditional: {
        value: true,
        highlight: false
      },
      aiOnly: {
        value: false,
        highlight: false
      }
    }
  ];

  return (
    <div className="w-full space-y-8 bg-white rounded-xl p-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-primary">
          The Future of Product Management
        </h3>
        <p className="text-muted-foreground">
          Compare how AI-assisted product managers deliver superior results through
          the perfect blend of human expertise and artificial intelligence
        </p>
      </div>

      {/* Mobile view: Separate cards for each PM type */}
      <div className="md:hidden space-y-8">
        {/* AI-Assisted PM Card */}
        <Card className="border-2 border-secondary bg-secondary/5">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-center mb-4">AI-Assisted PM</h4>
            <div className="space-y-4">
              {comparisonData.map((item, index) => (
                <div key={`ai-assisted-${index}`} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 shrink-0">
                    <item.icon className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.aspect}</p>
                    <p className="text-sm text-secondary">
                      {'value' in item.aiAssisted 
                        ? item.aiAssisted.value 
                          ? <Check className="w-4 h-4 inline" />
                          : <X className="w-4 h-4 inline" />
                        : item.aiAssisted.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traditional PM Card */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-center mb-4">Traditional PM</h4>
            <div className="space-y-4">
              {comparisonData.map((item, index) => (
                <div key={`traditional-${index}`} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 shrink-0">
                    <item.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.aspect}</p>
                    <p className="text-sm text-gray-600">
                      {'value' in item.traditional 
                        ? item.traditional.value 
                          ? <Check className="w-4 h-4 inline" />
                          : <X className="w-4 h-4 inline" />
                        : item.traditional.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI-Only Card */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-center mb-4">AI-Only Agent</h4>
            <div className="space-y-4">
              {comparisonData.map((item, index) => (
                <div key={`ai-only-${index}`} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 shrink-0">
                    <item.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.aspect}</p>
                    <p className="text-sm text-gray-600">
                      {'value' in item.aiOnly 
                        ? item.aiOnly.value 
                          ? <Check className="w-4 h-4 inline" />
                          : <X className="w-4 h-4 inline" />
                        : item.aiOnly.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop view: Original table layout */}
      <div className="hidden md:block">
        {/* Column Headers */}
        <div className="grid grid-cols-4 gap-4 items-center mb-6">
          <div className="font-medium text-primary"></div>
          <div className="text-center font-medium text-secondary">AI-Assisted PM</div>
          <div className="text-center font-medium">Traditional PM</div>
          <div className="text-center font-medium">AI-Only Agent</div>
        </div>

        <div className="space-y-6">
          {comparisonData.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/5">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <span className="font-medium text-primary">{item.aspect}</span>
              </div>

              <Card className={`border-2 ${item.aiAssisted.highlight ? 'border-secondary bg-secondary/5' : 'border-muted'}`}>
                <CardContent className="p-4 text-center">
                  {'value' in item.aiAssisted ? (
                    item.aiAssisted.value ? (
                      <Check className="w-5 h-5 text-secondary mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-medium text-secondary">
                      {item.aiAssisted.label}
                    </span>
                  )}
                </CardContent>
              </Card>

              <Card className="border-muted">
                <CardContent className="p-4 text-center">
                  {'value' in item.traditional ? (
                    item.traditional.value ? (
                      <Check className="w-5 h-5 text-gray-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm">
                      {item.traditional.label}
                    </span>
                  )}
                </CardContent>
              </Card>

              <Card className="border-muted">
                <CardContent className="p-4 text-center">
                  {'value' in item.aiOnly ? (
                    item.aiOnly.value ? (
                      <Check className="w-5 h-5 text-gray-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm">
                      {item.aiOnly.label}
                    </span>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Card className="mt-8 border-2 border-muted bg-muted/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-secondary/5">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-primary block mb-2">Why ProductHire's AI-assisted PMs are the future</span>
              Our PMs combine human expertise with AI capabilities, delivering better results through enhanced 
              decision-making, faster processing, and data-driven insights - all while maintaining full accountability.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};