
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Search, AlertTriangle, FileText, Users, TrendingUp, Link as LinkIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            🍁 Proudly Canadian • Testing Phase
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            Verify Canadian Real Estate Listings
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 block">
              Instantly & Securely
            </span>
          </h1>
          
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Enter a property listing URL to instantly verify its details across major platforms. Our AI-powered system helps Canadian homebuyers detect inconsistencies and avoid costly scams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link to={createPageUrl("Analyze")}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Shield className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Start Analysis
              </Button>
            </Link>
            <Link to={createPageUrl("FAQ")}>
              <Button variant="outline" className="w-full sm:w-auto border-red-200 text-red-700 hover:bg-red-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl">
                Learn How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
              </div>
              <div className="font-bold text-xl sm:text-2xl text-gray-900">47</div>
              <div className="text-sm sm:text-base text-gray-600">URLs Tested</div>
            </div>
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <AlertTriangle className="w-6 sm:w-8 h-6 sm:h-8 text-red-600" />
              </div>
              <div className="font-bold text-xl sm:text-2xl text-gray-900">12</div>
              <div className="text-sm sm:text-base text-gray-600">Issues Detected</div>
            </div>
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
              </div>
              <div className="font-bold text-xl sm:text-2xl text-gray-900">3</div>
              <div className="text-sm sm:text-base text-gray-600">Demo Scenarios</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              How PropertyGuard Works
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Our advanced AI system cross-references property listings across major Canadian real estate platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <LinkIcon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">1. Enter URL & Analyze</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Paste a listing URL from realtor.ca, zolo.ca, royallepage.ca, or other major platforms. Our system extracts key data and begins searching.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <AlertTriangle className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">2. Detect Inconsistencies</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We identify duplicate listings with different prices, agents, or details that may indicate fraudulent activity or outdated information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FileText className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">3. Get Verified Report</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Receive a comprehensive analysis with a risk assessment, highlighted flags, and actionable recommendations to protect your investment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Verify Your Next Property?
          </h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Join thousands of Canadians who trust PropertyGuard to keep them safe from real estate fraud.
          </p>
          <Link to={createPageUrl("Analyze")}>
            <Button className="bg-white text-red-700 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Shield className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Analyze Listing Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
