import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle, Eye, Search, HelpCircle, Shield, XCircle } from "lucide-react";

export default function MatchesTable({ matches }) {
  if (!matches || matches.length === 0) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
            Cross-Platform Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 sm:py-8">
            <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <Search className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No Cross-Platform Matches Found</h3>
            <p className="text-sm sm:text-base text-gray-600 px-4 mb-4">
              This property was not found on other major Canadian real estate platforms.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Enhanced validation logic with strict URL checking
  const validateListingStatus = (match) => {
    try {
      const url = new URL(match.listing_url);
      const hostname = url.hostname.toLowerCase();
      const pathname = url.pathname.toLowerCase();
      
      // Check for homepage patterns (strict validation)
      const isHomepage = 
        pathname === '/' || 
        pathname === '' || 
        pathname === '/index' ||
        pathname === '/home' ||
        pathname.match(/^\/?(en|fr)?\/?\s*$/);

      // Check for search or generic pages
      const isSearchPage = 
        pathname.includes('/search') ||
        pathname.includes('/find') ||
        pathname.includes('/browse') ||
        url.search.includes('search') ||
        url.search.includes('q=');

      // Check for listing removal indicators
      const hasRemovalFlags = match.suspicious_flags?.some(flag => {
        const lowerFlag = flag.toLowerCase();
        return lowerFlag.includes('removed') || 
               lowerFlag.includes('inactive') || 
               lowerFlag.includes('not found') ||
               lowerFlag.includes('expired') ||
               lowerFlag.includes('sold') ||
               lowerFlag.includes('unavailable');
      });

      // Check for major price discrepancies (fraud indicator)
      const hasPriceDiscrepancy = match.suspicious_flags?.some(flag => 
        flag.toLowerCase().includes('price') && 
        (flag.toLowerCase().includes('discrepancy') || 
         flag.toLowerCase().includes('different') ||
         flag.toLowerCase().includes('inconsistent'))
      );

      // Check for agent name mismatches
      const hasAgentMismatch = match.suspicious_flags?.some(flag => 
        flag.toLowerCase().includes('agent') && 
        flag.toLowerCase().includes('different')
      );

      // Check if it's a classified site with limited data
      const isClassifiedSite = match.platform_type === "Classified Site" ||
        hostname.includes('kijiji') ||
        hostname.includes('facebook') ||
        hostname.includes('craigslist');

      // Check data completeness
      const hasIncompleteData = match.data_completeness === "Incomplete" || 
        match.data_completeness === "Missing" ||
        match.suspicious_flags?.some(flag => 
          flag.toLowerCase().includes('incomplete') || 
          flag.toLowerCase().includes('missing')
        );

      // Determine status based on validation results
      if (isHomepage || isSearchPage) {
        return { 
          status: 'invalid', 
          isActive: false,
          reason: 'URL leads to homepage or search page'
        };
      }

      if (hasRemovalFlags) {
        return { 
          status: 'unavailable', 
          isActive: false,
          reason: 'Listing has been removed or is no longer active'
        };
      }

      if (hasPriceDiscrepancy || hasAgentMismatch) {
        return { 
          status: 'inconsistent', 
          isActive: true,
          reason: 'Property data shows major discrepancies'
        };
      }

      if (hasIncompleteData) {
        return { 
          status: 'incomplete', 
          isActive: true,
          reason: 'Missing critical property information'
        };
      }

      if (isClassifiedSite) {
        return { 
          status: 'caution', 
          isActive: true,
          reason: 'Classified site with limited verification'
        };
      }

      // Only mark as consistent if all checks pass AND it's a proper property URL
      const hasPropertyPath = 
        pathname.includes('property') ||
        pathname.includes('listing') ||
        pathname.includes('real-estate') ||
        pathname.includes('home') ||
        /\/\d+\//.test(pathname) || // Contains numeric ID
        pathname.split('/').length >= 3; // Has sufficient path depth

      if (hasPropertyPath && !match.suspicious_flags?.length) {
        return { 
          status: 'consistent', 
          isActive: true,
          reason: 'All property data matches and listing is active'
        };
      }

      // Default to caution for anything else
      return { 
        status: 'caution', 
        isActive: true,
        reason: 'Unable to fully verify listing details'
      };

    } catch (e) {
      return { 
        status: 'invalid', 
        isActive: false,
        reason: 'Invalid URL format'
      };
    }
  };

  const getStatusDisplay = (match) => {
    const { status, isActive, reason } = validateListingStatus(match);
    
    switch (status) {
      case 'unavailable':
        return {
          element: (
            <div className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 border border-gray-300 text-gray-600 text-xs rounded-sm flex items-start gap-1 sm:gap-2">
              <XCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">Removed</span>
            </div>
          ),
          tooltip: reason
        };
      
      case 'invalid':
        return {
          element: (
            <div className="px-2 sm:px-3 py-1 sm:py-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-1 sm:gap-2">
              <XCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">Invalid URL</span>
            </div>
          ),
          tooltip: reason
        };
      
      case 'incomplete':
        return {
          element: (
            <div className="px-2 sm:px-3 py-1 sm:py-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs rounded-sm flex items-start gap-1 sm:gap-2">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">Incomplete</span>
            </div>
          ),
          tooltip: reason
        };
      
      case 'inconsistent':
        return {
          element: (
            <div className="px-2 sm:px-3 py-1 sm:py-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-1 sm:gap-2">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">Data Mismatch</span>
            </div>
          ),
          tooltip: reason
        };
      
      case 'caution':
        return {
          element: (
            <div className="px-2 sm:px-3 py-1 sm:py-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-sm flex items-start gap-1 sm:gap-2">
              <Shield className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">Verify Required</span>
            </div>
          ),
          tooltip: reason
        };
      
      case 'consistent':
        return {
          element: (
            <div className="px-2 sm:px-3 py-1 sm:py-2 bg-green-50 border border-green-200 text-green-700 text-xs rounded-sm flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="leading-tight">Verified</span>
            </div>
          ),
          tooltip: reason
        };
      
      default:
        return {
          element: (
            <div className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 border border-gray-300 text-gray-600 text-xs rounded-sm flex items-center gap-1 sm:gap-2">
              <HelpCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">Unknown</span>
            </div>
          ),
          tooltip: "Unable to determine listing status"
        };
    }
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
          <Search className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
          External Platform Matches ({matches.length})
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Found on other real estate platforms (original source excluded)
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match, index) => {
            const { status, isActive } = validateListingStatus(match);
            const statusDisplay = getStatusDisplay(match);

            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex flex-col gap-3">
                  {/* Header with title and platform */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-base">
                        {match.listing_title || 'No Title Provided'}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-blue-700">{match.platform || 'Unknown Platform'}</span>
                        {match.platform_type === "Classified Site" && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Classified</span>
                        )}
                      </div>
                    </div>
                    <div title={statusDisplay.tooltip}>
                      {statusDisplay.element}
                    </div>
                  </div>

                  {/* URL Display */}
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-xs text-gray-500 mb-1">URL:</div>
                    <a 
                      href={isActive ? match.listing_url : undefined}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`text-sm font-mono break-all ${isActive ? 'text-blue-600 hover:text-blue-800 underline' : 'text-gray-400 cursor-not-allowed'}`}
                      onClick={(e) => !isActive && e.preventDefault()}
                    >
                      {match.listing_url}
                    </a>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Price</div>
                      <div className="font-semibold text-green-600">{match.price || "N/A"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Agent</div>
                      <div className="text-sm text-gray-700">{match.agent_name || "Not specified"}</div>
                    </div>
                  </div>

                  {/* Flags and Action */}
                  <div className="flex justify-between items-center">
                    <div>
                      {match.suspicious_flags?.length > 0 && (
                        <div className="text-xs text-red-600">
                          {match.suspicious_flags.length} flag{match.suspicious_flags.length > 1 ? 's' : ''}: {match.suspicious_flags[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      {isActive && status !== 'invalid' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <a 
                            href={match.listing_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Listing
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled className="opacity-60">
                          Unavailable
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Status Summary */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Status Guide:</strong> Only listings marked as "Verified" have been confirmed as active with matching data. 
            All other statuses indicate potential issues that require verification.
          </div>
        </div>
        
        {/* Additional warnings for classified sites */}
        {matches.some(m => m.platform_type === "Classified Site") && (
          <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <strong>Classified Site Warning:</strong> Some matches are from classified platforms which have limited verification and higher fraud risk.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}