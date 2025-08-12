import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, HelpCircle, Search } from "lucide-react";

export default function RiskAssessment({ riskLevel, fraudIndicators }) {
  const getRiskConfig = (level) => {
    switch (level) {
      case 'All Clear':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          badgeColor: 'bg-green-100 text-green-800',
          title: 'All Clear - External Verification Successful'
        };
      case 'Caution':
        return {
          icon: <HelpCircle className="w-5 h-5" />,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          badgeColor: 'bg-yellow-100 text-yellow-800',
          title: 'Caution - Minor Inconsistencies Found'
        };
      case 'High Risk':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          badgeColor: 'bg-red-100 text-red-800',
          title: 'High Risk - Significant Red Flags Detected'
        };
      case 'Cannot Determine':
        return {
          icon: <Search className="w-5 h-5" />,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          badgeColor: 'bg-orange-100 text-orange-800',
          title: 'Cannot Determine - No Cross-Platform Matches'
        };
      default:
        return {
          icon: <Shield className="w-5 h-5" />,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          badgeColor: 'bg-gray-100 text-gray-800',
          title: 'Risk Assessment'
        };
    }
  };

  const config = getRiskConfig(riskLevel);

  return (
    <Card className={`border-none shadow-lg ${config.bgColor} ${config.borderColor} border`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 text-xl font-semibold ${config.color}`}>
          {config.icon}
          {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Risk Level:</span>
          <Badge className={`${config.badgeColor} font-semibold`}>
            {riskLevel?.toUpperCase()}
          </Badge>
        </div>

        {fraudIndicators && fraudIndicators.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Detected Issues & Inconsistencies:</h4>
            <ul className="space-y-2">
              {fraudIndicators.map((indicator, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-2 ${config.color.replace('text-', 'bg-')}`}></span>
                  <span className="text-gray-700">{indicator}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(!fraudIndicators || fraudIndicators.length === 0) && riskLevel === 'All Clear' && (
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ No significant inconsistencies detected across external platforms. This listing appears to be legitimate based on our cross-platform checks.
            </p>
          </div>
        )}

        {riskLevel === 'Cannot Determine' && (
          <div className="p-4 bg-orange-100 rounded-lg">
            <p className="text-orange-800 font-medium">
              ⚠️ Unable to verify this property on other platforms. Consider contacting the listing agent directly or checking additional sources for verification.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}