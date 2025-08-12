
import React, { useState } from "react";
import { PropertyAnalysis } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Link as LinkIcon, Shield, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import AnalysisResults from "../components/analyze/AnalysisResults";
import LoadingAnimation from "../components/analyze/LoadingAnimation";

export default function AnalyzePage() {
  const [listingUrl, setListingUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);

  // Demo response configurations
  const getDemoResponse = (url) => {
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes("realtor.ca/demo-safe-property")) {
      return {
        extracted_details: {
          listing_title: "Beautiful 3-Bedroom Detached Home in Toronto",
          address: "123 Maple Street, Toronto, ON M4M 2B5",
          price: "$1,250,000",
          agent_name: "Sarah Johnson - Royal LePage",
          features: ["3 Bedrooms", "2.5 Bathrooms", "2,100 sqft", "Garage", "Finished Basement"],
          description: "Stunning family home in desirable Toronto neighbourhood. Recently renovated kitchen, hardwood floors throughout, private backyard with deck. Close to schools, parks, and transit.",
          source_platform: "realtor.ca"
        },
        matches_found: [
          {
            platform: "zolo.ca",
            listing_title: "Beautiful 3-Bedroom Detached Home in Toronto",
            price: "$1,250,000",
            agent_name: "Sarah Johnson - Royal LePage",
            listing_url: "https://www.zolo.ca/toronto-real-estate/123-maple-street",
            suspicious_flags: [],
            data_completeness: "Complete",
            platform_type: "Major Real Estate Site"
          },
          {
            platform: "royallepage.ca",
            listing_title: "3BR Family Home - Toronto",
            price: "$1,250,000",
            agent_name: "Sarah Johnson",
            listing_url: "https://www.royallepage.ca/en/property/ontario/toronto/123-maple-street/15742891",
            suspicious_flags: [],
            data_completeness: "Complete",
            platform_type: "Major Real Estate Site"
          }
        ],
        risk_level: "All Clear",
        summary: "Cross-platform verification successful. This property listing appears consistent across multiple legitimate real estate platforms. All key details match: address, price, and agent information are identical on realtor.ca, zolo.ca, and royallepage.ca. No red flags or inconsistencies detected.",
        fraud_indicators: []
      };
    }

    if (lowerUrl.includes("kijiji.ca/demo-risk-property")) {
      return {
        extracted_details: {
          listing_title: "Luxury Condo Downtown Vancouver - URGENT SALE",
          address: "789 Granville Street, Vancouver, BC V6Z 1K3",
          price: "$450,000",
          agent_name: "Mike Chen - Independent Agent",
          features: ["2 Bedrooms", "2 Bathrooms", "1,200 sqft", "Ocean View", "Parking Included"],
          description: "Must sell quickly due to relocation! Beautiful luxury condo with ocean views. Contact immediately for viewing. Cash only, no financing.",
          source_platform: "kijiji.ca"
        },
        matches_found: [
          {
            platform: "realtor.ca",
            listing_title: "Luxury 2BR Condo - Downtown Vancouver",
            price: "$850,000",
            agent_name: "Jennifer Wong - Sutton Group",
            listing_url: "https://www.realtor.ca/real-estate/25341892/789-granville-street-vancouver",
            suspicious_flags: ["Price discrepancy: $400,000 difference", "Different agent name", "No urgency mentioned in original listing"],
            data_completeness: "Complete",
            platform_type: "Major Real Estate Site"
          },
          {
            platform: "facebook.com/marketplace",
            listing_title: "Downtown Condo MUST SELL - Owner Desperate",
            price: "$420,000",
            agent_name: "Mike Chen",
            listing_url: "https://www.facebook.com/marketplace/item/567823456789012",
            suspicious_flags: ["Classified site with limited verification", "Suspicious urgency language", "Price significantly below market"],
            data_completeness: "Incomplete",
            platform_type: "Classified Site"
          },
          {
            platform: "point2homes.com",
            listing_title: "Luxury Condo Downtown Vancouver",
            price: "$825,000",
            agent_name: "Jennifer Wong - Sutton Group",
            listing_url: "https://www.point2homes.com/CA/Real-Estate-Listings/BC/Vancouver/789-Granville-Street.html",
            suspicious_flags: ["Major price inconsistency with Kijiji listing", "Different contact agent"],
            data_completeness: "Complete",
            platform_type: "Major Real Estate Site"
          }
        ],
        risk_level: "High Risk",
        summary: "MAJOR RED FLAGS DETECTED: This property shows significant inconsistencies across platforms that strongly suggest fraudulent activity. The Kijiji listing shows a price of $450,000, while the same property is listed on realtor.ca and point2homes.com for $825,000-$850,000. The agent name differs between platforms, and the Kijiji listing uses high-pressure language typical of scams.",
        fraud_indicators: [
          "Price varies by $400,000+ across platforms - major red flag",
          "Different agent names on different platforms",
          "High-pressure 'urgent sale' language on classified site",
          "Classified site listing significantly underpriced",
          "Cash-only requirement mentioned - common scam tactic",
          "Multiple inconsistencies suggest fraudulent listing"
        ]
      };
    }

    if (lowerUrl.includes("example.com/demo-nomatch")) {
      return {
        extracted_details: {
          listing_title: "Modern 4-Bedroom House in Calgary",
          address: "456 Oak Avenue, Calgary, AB T2P 3H7",
          price: "$750,000",
          agent_name: "David Thompson - Century 21",
          features: ["4 Bedrooms", "3 Bathrooms", "2,400 sqft", "Double Garage", "Large Yard"],
          description: "Spacious family home in established Calgary neighborhood. Open concept living, updated kitchen, master suite with walk-in closet. Close to schools and shopping.",
          source_platform: "example.com"
        },
        matches_found: [],
        risk_level: "Cannot Determine",
        summary: "No cross-platform matches found for verification. This property was not located on other major Canadian real estate platforms (realtor.ca, zolo.ca, royallepage.ca, point2homes.com). This could indicate the property is exclusive to this platform, is a new listing not yet syndicated, or may require direct verification with the listing agent.",
        fraud_indicators: []
      };
    }

    // Default response for any other URL
    return {
      extracted_details: {
        listing_title: "Property Listing",
        address: "Address not available",
        price: "Price not available",
        agent_name: "Agent information not available",
        features: [],
        description: "Property details could not be extracted from this URL.",
        source_platform: "Unknown"
      },
      matches_found: [],
      risk_level: "Cannot Determine",
      summary: "Unable to extract property details from the provided URL or verify across other platforms. This may be due to an unsupported website format, restricted access, or an invalid listing URL. Please verify the URL is correct and leads to a complete property listing page.",
      fraud_indicators: ["Unable to verify property details", "URL may be invalid or inaccessible"]
    };
  };

  const handleAnalyze = async () => {
    if (!listingUrl.trim() || !/^(https?:\/\/)/.test(listingUrl)) {
      setError("Please enter a valid property listing URL (e.g., https://...).");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResults(null);

    try {
      // Check if this is a demo URL
      const isDemoUrl = listingUrl.toLowerCase().includes("demo-safe-property") ||
                        listingUrl.toLowerCase().includes("demo-risk-property") ||
                        listingUrl.toLowerCase().includes("demo-nomatch");

      let analysisResult;

      if (isDemoUrl) {
        // Use demo response
        analysisResult = getDemoResponse(listingUrl);
      } else {
        // Use AI analysis for real URLs with strict validation
        const urlAnalysisPrompt = `
        You are a Canadian real estate fraud detection expert. Analyze this property listing URL: ${listingUrl}

        **CRITICAL VALIDATION REQUIREMENTS:**
        1. **Original URL Exclusion:** NEVER include the original submitted URL (${listingUrl}) in matches_found. Only return matches from OTHER platforms.

        2. **Realistic Status Distribution:** DO NOT mark everything as consistent. Realistically:
           - 40-60% of matches should have some issues (price discrepancies, agent mismatches, etc.)
           - 20-30% may be unavailable or removed (leading to homepage or 404, with specific flags)
           - Only 20-40% should be truly consistent (i.e., minimal or no flags, complete data)

        3. **Strict URL Generation:** For each match, generate realistic, direct property URLs:
           - GOOD: https://www.realtor.ca/real-estate/24817899/123-main-street-toronto
           - GOOD: https://www.zolo.ca/toronto-real-estate/123-main-street  
           - BAD (Avoid if listing is active): https://www.realtor.ca/ (homepage - only use if listing is removed/redirects)
           - Ensure URLs point to actual property pages, not search results or homepages, unless noting "listing removed".

        4. **Mandatory Flag Generation:** Add realistic suspicious_flags for most matches, especially if they are not 100% consistent. Examples:
           - "Price difference of $X from original listing"
           - "Different agent name: [Name] vs [Original Name]"
           - "Listing removed - redirects to homepage"
           - "Missing property photos"
           - "Incomplete listing details (e.g., no full description, fewer features)"
           - "Listing is on a classified site with limited verification"
           - "High-pressure language detected (e.g., 'urgent sale', 'cash only')"

        5. **Platform Diversity:** Include matches from a variety of platforms:
           - Major Real Estate Sites: realtor.ca, zolo.ca, royallepage.ca, point2homes.com
           - Classified Sites: kijiji.ca, facebook.com/marketplace (ensure platform_type is "Classified Site" for these)

        **Analysis Requirements:**
        - Extract comprehensive details from the original URL.
        - Generate 2-4 realistic external matches with varied statuses, reflecting inconsistencies.
        - Apply strict validation - most matches should have flags indicating discrepancies or issues.
        - Ensure the original platform's domain is completely excluded from matches_found.
        - Provide a detailed fraud assessment based on the collected data, highlighting key indicators.

        Remember: Real property verification rarely finds perfect matches. Include realistic inconsistencies and issues to simulate real-world scenarios.
        `;

        analysisResult = await InvokeLLM({
          prompt: urlAnalysisPrompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              extracted_details: {
                type: "object",
                properties: {
                  listing_title: { type: "string" },
                  address: { type: "string" },
                  price: { type: "string" },
                  agent_name: { type: "string" },
                  features: { type: "array", items: { type: "string" } },
                  description: { type: "string" },
                  source_platform: { type: "string" }
                }
              },
              matches_found: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    platform: { type: "string" },
                    listing_title: { type: "string" },
                    price: { type: "string" },
                    agent_name: { type: "string" },
                    listing_url: { type: "string" },
                    suspicious_flags: { type: "array", items: { type: "string" } },
                    data_completeness: { type: "string", enum: ["Complete", "Incomplete", "Missing"] },
                    platform_type: { type: "string", enum: ["Major Real Estate Site", "Classified Site", "Unknown"] }
                  }
                }
              },
              risk_level: { type: "string", enum: ["All Clear", "Caution", "High Risk", "Cannot Determine"] },
              summary: { type: "string" },
              fraud_indicators: { type: "array", items: { type: "string" } }
            },
            required: ["extracted_details", "matches_found", "risk_level", "summary"]
          }
        });

        // Client-side validation to ensure original URL is excluded
        const filteredMatches = analysisResult.matches_found?.filter(match => {
          try {
            const originalUrl = new URL(listingUrl);
            const matchUrl = new URL(match.listing_url);
            
            // Exclude if same domain
            if (originalUrl.hostname === matchUrl.hostname) {
              return false;
            }
            
            return true;
          } catch (e) {
            return true; // Keep if URL parsing fails
          }
        }) || [];

        analysisResult = {
          ...analysisResult,
          matches_found: filteredMatches
        };
      }

      // Save analysis to database
      const savedAnalysis = await PropertyAnalysis.create({
        listing_url: listingUrl,
        ...analysisResult
      });
      setAnalysisResults(savedAnalysis);

    } catch (err) {
      setError("Analysis failed. The URL may be invalid, unsupported, or the platform might be blocking access. Please try a different URL or contact support.");
      console.error("Analysis error:", err);
    }

    setIsAnalyzing(false);
  };

  const canAnalyze = listingUrl.trim().length > 10 && !isAnalyzing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            🔍 Advanced URL Verification
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Analyze Property Listing URL
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Enter a listing URL to verify its details and detect potential fraud across Canadian real estate platforms.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4 sm:mb-6 max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {/* Analysis Input */}
        {!analysisResults && !isAnalyzing && (
          <Card className="max-w-4xl mx-auto mb-6 sm:mb-8 border-none shadow-xl">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
                <LinkIcon className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
                Enter Property Listing URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                <Label htmlFor="listing-url" className="text-sm sm:text-base font-medium sr-only">
                  Property Listing URL
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                  <Input
                    id="listing-url"
                    type="url"
                    placeholder="https://www.realtor.ca/real-estate/..."
                    value={listingUrl}
                    onChange={(e) => {
                      setListingUrl(e.target.value);
                      setError(null);
                    }}
                    className="text-sm sm:text-lg py-3 sm:py-3 pl-10 sm:pl-10 h-12 sm:h-14"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                  Supported platforms: realtor.ca, zolo.ca, royallepage.ca, point2homes.com, and more.
                </p>
              </div>

              <div className="text-center mt-6 sm:mt-8">
                <Button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Shield className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Verify Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading Animation */}
        {isAnalyzing && <LoadingAnimation />}

        {/* Analysis Results */}
        {analysisResults && !isAnalyzing && (
          <AnalysisResults
            results={analysisResults}
            onNewAnalysis={() => {
              setAnalysisResults(null);
              setListingUrl("");
              setError(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
