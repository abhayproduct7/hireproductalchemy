export type Question = {
  id: number;
  question: string;
  placeholder: string;
  type?: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What type of product manager are you looking for?",
    placeholder: "e.g., Technical PM, Growth PM, Enterprise PM...",
  },
  {
    id: 2,
    question: "What industry does your company operate in?",
    placeholder: "e.g., SaaS, Fintech, Healthcare...",
  },
  {
    id: 3,
    question: "What's the expected duration of the engagement?",
    placeholder: "e.g., 3 months, 6 months, 1 year...",
  },
  {
    id: 4,
    question: "What are the key responsibilities for this role?",
    placeholder: "e.g., Product strategy, Feature prioritization...",
  },
  {
    id: 5,
    question: "What's your target timeline for bringing someone onboard?",
    placeholder: "e.g., Immediately, Within 2 weeks, Next month...",
  },
  {
    id: 6,
    question: "What's your email address?",
    placeholder: "e.g., john@company.com",
    type: "email",
  },
  {
    id: 7,
    question: "What's your company name?",
    placeholder: "e.g., Acme Inc",
  }
];