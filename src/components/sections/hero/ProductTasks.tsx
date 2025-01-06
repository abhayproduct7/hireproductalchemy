import { Search, ChartBar, Shuffle, Target, Lightbulb, Code, Clock } from "lucide-react";

export const ProductTasks = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#33C3F0] rounded-full"></div>
          <span className="text-sm font-medium text-gray-600">Traditional Product Tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">31h</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-12 bg-[#33C3F0]/10 rounded-md p-2">
          <div className="flex items-center">
            <Search className="w-4 h-4 text-[#33C3F0] mr-2" />
            <div>
              <div className="text-xs font-medium text-gray-700">Market Research</div>
              <div className="text-[10px] text-gray-500">Strategic Analysis</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-[#0EA5E9]/10 rounded-md p-2">
          <div className="flex items-center">
            <ChartBar className="w-4 h-4 text-[#0EA5E9] mr-2" />
            <div>
              <div className="text-xs font-medium text-gray-700">Data Analytics</div>
              <div className="text-[10px] text-gray-500">Performance Insights</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-[#1EAEDB]/10 rounded-md p-2">
          <div className="flex items-center">
            <Shuffle className="w-4 h-4 text-[#1EAEDB] mr-2" />
            <div>
              <div className="text-xs font-medium text-gray-700">A/B Testing</div>
              <div className="text-[10px] text-gray-500">Data-Driven Decisions</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-[#33C3F0]/10 rounded-md p-2">
          <div className="flex items-center">
            <Target className="w-4 h-4 text-[#33C3F0] mr-2" />
            <div>
              <div className="text-xs font-medium text-gray-700">User Research</div>
              <div className="text-[10px] text-gray-500">Customer Insights</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-[#0EA5E9]/10 rounded-md p-2">
          <div className="flex items-center">
            <Lightbulb className="w-4 h-4 text-[#0EA5E9] mr-2" />
            <div>
              <div className="text-xs font-medium text-gray-700">Feature Planning</div>
              <div className="text-[10px] text-gray-500">Innovation Strategy</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-[#1EAEDB]/10 rounded-md p-2">
          <div className="flex items-center">
            <Code className="w-4 h-4 text-[#1EAEDB] mr-2" />
            <div>
              <div className="text-xs font-medium text-gray-700">Tech Alignment</div>
              <div className="text-[10px] text-gray-500">Development Sync</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};