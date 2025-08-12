// Mock base44 client to prevent redirects
// In production, replace with actual API calls
export const base44 = {
  analyze: async (url) => {
    // Mock analysis response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url,
          status: 'success',
          analysis: {
            isFraudulent: false,
            riskScore: Math.random() * 100,
            inconsistencies: [],
            recommendations: [
              'Verify property details with official sources',
              'Check agent credentials',
              'Compare with other listings'
            ]
          }
        });
      }, 1000);
    });
  },
  
  search: async (query) => {
    // Mock search response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Sample Property 1', price: 450000, location: 'Toronto' },
          { id: 2, title: 'Sample Property 2', price: 320000, location: 'Vancouver' }
        ]);
      }, 500);
    });
  }
};
