import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const FAQSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="h-5 w-5 text-secondary mr-2" />
            <span className="text-secondary font-medium">Common Questions</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our product management talent solutions
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const faqs = [
  {
    question: "How does your AI-powered talent matching work?",
    answer:
      "Our AI system analyzes your project requirements, industry focus, and specific needs to match you with the most suitable product managers from our expert community. The matching considers factors like experience, domain expertise, and project complexity to ensure the perfect fit.",
  },
  {
    question: "What makes your product managers different?",
    answer:
      "Our product managers are not only experienced professionals but are also equipped with our AI copilot, which helps them deliver faster and more consistent results. They receive continuous coaching and feedback, ensuring they stay at the top of their game while delivering value to your projects.",
  },
  {
    question: "How does the subscription model work?",
    answer:
      "We offer transparent monthly subscriptions with fixed payments and no hidden fees. You can scale up or down based on your needs, and we provide an easy replacement guarantee if you're not satisfied with the talent match.",
  },
  {
    question: "How does the AI copilot enhance productivity?",
    answer:
      "Our AI copilot assists product managers in various ways: drafting PRDs, brainstorming ideas, improving documentation, setting goals and metrics, and validating outputs. This results in faster delivery times and higher quality deliverables while reducing costs.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We provide comprehensive support including AI-powered assistance, regular check-ins, and quality assurance. Our platform ensures seamless communication between you and your product manager, while our AI tools help validate and optimize their outputs.",
  },
];