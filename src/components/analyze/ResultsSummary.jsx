import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ResultsSummary({ summary }) {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <FileText className="w-5 h-5 text-blue-600" />
          Analysis Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {summary || "No summary available for this analysis."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}