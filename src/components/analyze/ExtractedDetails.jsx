import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  DollarSign,
  User,
  Building,
  List,
  FileText,
  ExternalLink,
  Bed,
  Bath,
  Ruler
} from "lucide-react";

export default function ExtractedDetails({ details, originalUrl }) {
  if (!details) return null;

  const getFeatureIcon = (feature) => {
    if (feature.toLowerCase().includes("bed")) return <Bed className="w-4 h-4 text-blue-600" />;
    if (feature.toLowerCase().includes("bath")) return <Bath className="w-4 h-4 text-blue-600" />;
    if (feature.toLowerCase().includes("sqft") || feature.toLowerCase().includes("size")) return <Ruler className="w-4 h-4 text-blue-600" />;
    return <List className="w-4 h-4 text-blue-600" />;
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 mb-2">
              {details.listing_title}
            </CardTitle>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{details.address}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-blue-600 hover:text-blue-800"
          >
            <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              View Original
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Listing Price</p>
                <p className="text-xl font-bold text-gray-900">{details.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Listing Agent</p>
                <p className="font-semibold text-gray-800">{details.agent_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Source Platform</p>
                <p className="font-semibold text-gray-800 capitalize">{details.source_platform}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <List className="w-4 h-4" />
                Key Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {details.features?.map((feature, index) => (
                  <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 flex items-center gap-1">
                    {getFeatureIcon(feature)}
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description Summary
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed max-h-24 overflow-y-auto p-2 bg-gray-50 rounded-md">
                {details.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}