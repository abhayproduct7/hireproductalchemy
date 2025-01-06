export const DeliveredResults = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-sm font-medium text-gray-600">Delivered Results</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-12 bg-green-50 rounded-md p-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <div>
              <div className="text-xs font-medium text-gray-700">Strategic Market Insights</div>
              <div className="text-[10px] text-green-600">Expert Analysis + AI Validation</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-green-50 rounded-md p-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <div>
              <div className="text-xs font-medium text-gray-700">Performance Metrics</div>
              <div className="text-[10px] text-green-600">Data-Driven Optimization</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-green-50 rounded-md p-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <div>
              <div className="text-xs font-medium text-gray-700">Conversion Improvements</div>
              <div className="text-[10px] text-green-600">Testing + Implementation</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-green-50 rounded-md p-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <div>
              <div className="text-xs font-medium text-gray-700">User-Centric Solutions</div>
              <div className="text-[10px] text-green-600">Validated Improvements</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-green-50 rounded-md p-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <div>
              <div className="text-xs font-medium text-gray-700">Product Innovation</div>
              <div className="text-[10px] text-green-600">Market-Ready Features</div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-green-50 rounded-md p-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <div>
              <div className="text-xs font-medium text-gray-700">Technical Roadmap</div>
              <div className="text-[10px] text-green-600">Optimized Development</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};