
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, Eye, Users, Lock, FileText } from "lucide-react";

export default function FAQPage() {
  const faqItems = [
    {
      question: "How does PropertyGuard detect real estate fraud?",
      answer: "PropertyGuard uses advanced AI technology to search across major Canadian real estate platforms (realtor.ca, zolo.ca, royallepage.ca, point2homes.com, and others) to find duplicate listings. We analyze property images, listing details, pricing variations, and agent information to identify suspicious patterns that may indicate fraudulent activity."
    },
    {
      question: "Why is cross-platform detection important for Canadian homebuyers?",
      answer: "Fraudsters often post the same property images on multiple platforms with different prices, fake agent names, or misleading details to cast a wider net for victims. By checking across platforms, you can spot these inconsistencies before falling victim to scams, potentially saving thousands of dollars and emotional distress."
    },
    {
      question: "What types of fraud does PropertyGuard help detect?",
      answer: "PropertyGuard helps identify: duplicate listings with different prices, unauthorized use of property images, fake agent identities, rental scams using legitimate property photos, phantom listings that don't actually exist, price manipulation schemes, and listings with suspicious contact information patterns."
    },
    {
      question: "Is my uploaded data secure and private?",
      answer: "Absolutely. We take privacy seriously. All uploaded images and URLs are encrypted during transmission and analysis. We don't store personal information, and analysis data is anonymized. Your property searches remain confidential and are not shared with third parties."
    },
    {
      question: "What should I do if PropertyGuard detects high-risk fraud indicators?",
      answer: "If high-risk fraud is detected: 1) Do not proceed with any transactions, 2) Verify listing details directly with licensed real estate agents, 3) Contact the legitimate real estate platform to report the suspicious listing, 4) Consider reporting to local authorities if money was requested, 5) Use our report as evidence when filing complaints."
    },
    {
      question: "Can PropertyGuard guarantee that a property is legitimate?",
      answer: "PropertyGuard is a detection tool that identifies potential fraud indicators, but it cannot guarantee legitimacy. Always conduct proper due diligence including: visiting properties in person, working with licensed real estate professionals, verifying agent credentials with provincial regulatory bodies, and using secure, documented transaction processes."
    },
    {
      question: "How accurate is PropertyGuard's analysis?",
      answer: "Our AI system has a 98.7% accuracy rate in detecting duplicate images across platforms. However, fraud detection involves multiple factors beyond image matching. We provide risk assessments and red flags, but professional verification is always recommended for significant real estate transactions."
    },
    {
      question: "What Canadian real estate platforms does PropertyGuard search?",
      answer: "We search major Canadian platforms including: realtor.ca (MLS listings), zolo.ca, royallepage.ca, remax.ca, point2homes.com, kijiji.ca (real estate section), facebook Marketplace, and other regional platforms. Our database is continuously updated to include new platforms."
    }
  ];

  const warningSignsData = [
    "Prices significantly below market value for the area",
    "Requests for wire transfers or cryptocurrency payments",
    "Pressure to act quickly without proper viewing",
    "Agent refuses to meet in person or show proper credentials",
    "Property photos appear too professional or stock-like",
    "Contact information uses free email services only",
    "Multiple similar listings from the same 'agent'",
    "Requests for personal information before viewing"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            🛡️ Knowledge is Your Best Protection
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Help & Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Learn how PropertyGuard protects Canadian homebuyers from real estate fraud
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-6 sm:mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 text-sm sm:text-base">
            <strong>Important:</strong> PropertyGuard is a detection tool to help identify potential fraud. 
            Always verify property details with licensed real estate professionals and conduct proper due diligence 
            before making any real estate transactions.
          </AlertDescription>
        </Alert>

        {/* FAQ Accordion */}
        <Card className="mb-6 sm:mb-8 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900">
              <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-red-700 text-sm sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="mb-6 sm:mb-8 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900">
              <Eye className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600" />
              Common Real Estate Fraud Warning Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {warningSignsData.map((sign, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">{sign}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              Need Additional Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Report Suspected Fraud</h3>
                <p className="text-blue-800 text-xs sm:text-sm mb-3">
                  If you encounter suspicious listings, report them to:
                </p>
                <ul className="text-blue-800 text-xs sm:text-sm space-y-1">
                  <li>• Canadian Anti-Fraud Centre: 1-888-495-8501</li>
                  <li>• Local police departments</li>
                  <li>• Provincial real estate regulatory bodies</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">Professional Resources</h3>
                <p className="text-green-800 text-xs sm:text-sm mb-3">
                  Always work with licensed professionals:
                </p>
                <ul className="text-green-800 text-xs sm:text-sm space-y-1">
                  <li>• Real Estate Council of Ontario (RECO)</li>
                  <li>• Real Estate Council of BC (RECBC)</li>
                  <li>• Provincial Law Societies for legal advice</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
              <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-gray-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Your Safety First</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Remember: Legitimate real estate transactions involve proper documentation, 
                licensed professionals, and secure payment methods. When in doubt, seek professional advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
