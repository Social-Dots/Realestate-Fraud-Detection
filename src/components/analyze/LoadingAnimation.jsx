
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Search, AlertTriangle, FileText } from "lucide-react";

export default function LoadingAnimation() {
  const steps = [
    { icon: Search, text: "Searching Canadian real estate platforms...", delay: 0 },
    { icon: Shield, text: "Analyzing property images and details...", delay: 1000 },
    { icon: AlertTriangle, text: "Detecting suspicious variations...", delay: 2000 },
    { icon: FileText, text: "Generating comprehensive report...", delay: 3000 },
  ];

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-xl">
      <CardContent className="p-4 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
            <div className="w-6 sm:w-8 h-6 sm:h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Analyzing Your Property
          </h3>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            This may take 30-60 seconds as we search across multiple platforms
          </p>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-500"
              style={{
                animationDelay: `${step.delay}ms`,
                animation: `fadeInUp 0.5s ease-out ${step.delay}ms both`
              }}
            >
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
                <step.icon className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 font-medium text-sm sm:text-base">{step.text}</p>
              </div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <p className="text-xs sm:text-sm text-blue-800 text-center">
            🔒 Your data is encrypted and secure. We don't store personal information.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
