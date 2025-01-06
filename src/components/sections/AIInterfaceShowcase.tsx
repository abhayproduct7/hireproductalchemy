import { MessagesSquare, FileEdit, Rocket, CheckCircle } from "lucide-react";

export const AIInterfaceShowcase = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        {/* AI Assistant Logo */}
        <div className="relative w-16 h-16">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="assistantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F4C35" />
                <stop offset="100%" stopColor="#1B5E40" />
              </linearGradient>
            </defs>
            
            <path
              d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z"
              fill="url(#assistantGradient)"
              opacity="0.9"
            />
            
            <path
              d="M16 8 L22 12 M16 8 L10 12 M16 24 L22 20 M16 24 L10 20"
              stroke="white"
              strokeWidth="0.75"
              opacity="0.6"
            />
            
            <circle cx="16" cy="16" r="4" fill="white" opacity="0.9" />
            <circle cx="16" cy="8" r="2" fill="white" opacity="0.7" />
            <circle cx="22" cy="12" r="2" fill="white" opacity="0.7" />
            <circle cx="22" cy="20" r="2" fill="white" opacity="0.7" />
            <circle cx="16" cy="24" r="2" fill="white" opacity="0.7" />
            <circle cx="10" cy="20" r="2" fill="white" opacity="0.7" />
            <circle cx="10" cy="12" r="2" fill="white" opacity="0.7" />
          </svg>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-1">👋 How can I help you today?</h3>
          <p className="text-gray-600">Your AI product management copilot</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg p-4 hover:from-secondary/10 hover:to-secondary/20 transition-all cursor-pointer flex items-center justify-between group border border-secondary/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileEdit className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Help me write a PRD</span>
            </div>
            <p className="text-gray-600 text-sm">Create a new Product Requirements Document</p>
          </div>
          <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </div>

        <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg p-4 hover:from-secondary/10 hover:to-secondary/20 transition-all cursor-pointer flex items-center justify-between group border border-secondary/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessagesSquare className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Help me improve an existing document</span>
            </div>
            <p className="text-gray-600 text-sm">Get a review to make your work better</p>
          </div>
          <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </div>

        <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg p-4 hover:from-secondary/10 hover:to-secondary/20 transition-all cursor-pointer flex items-center justify-between group border border-secondary/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Brainstorm new features</span>
            </div>
            <p className="text-gray-600 text-sm">Generate ideas for your product roadmap</p>
          </div>
          <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </div>

        <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg p-4 hover:from-secondary/10 hover:to-secondary/20 transition-all cursor-pointer flex items-center justify-between group border border-secondary/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Help me validate the outputs from the PM</span>
            </div>
            <p className="text-gray-600 text-sm">Review and validate product management deliverables</p>
          </div>
          <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </div>
      </div>
    </div>
  );
};