import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileEdit, MessagesSquare, Rocket, CheckCircle } from "lucide-react";

export const AIInterfaceShowcase = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">👋 How can I help you today?</h3>
        <p className="text-gray-600">Your AI product management copilot</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileEdit className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Help me write a PRD</span>
            </div>
            <p className="text-gray-600 text-sm">Create a new Product Requirements Document</p>
          </div>
          <span className="text-gray-400 group-hover:text-secondary transition-colors">→</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessagesSquare className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Help me improve an existing document</span>
            </div>
            <p className="text-gray-600 text-sm">Get a review to make your work better</p>
          </div>
          <span className="text-gray-400 group-hover:text-secondary transition-colors">→</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Brainstorm new features</span>
            </div>
            <p className="text-gray-600 text-sm">Generate ideas for your product roadmap</p>
          </div>
          <span className="text-gray-400 group-hover:text-secondary transition-colors">→</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <span className="font-medium text-gray-800">Help me validate the outputs from the PM</span>
            </div>
            <p className="text-gray-600 text-sm">Review and validate product management deliverables</p>
          </div>
          <span className="text-gray-400 group-hover:text-secondary transition-colors">→</span>
        </div>
      </div>
    </div>
  );
};