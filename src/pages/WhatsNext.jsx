import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Calendar } from "lucide-react";

import JoinWaitlistForm from "../components/whats-next/JoinWaitlistForm";
import BookingCalendar from "../components/whats-next/BookingCalendar";

export default function WhatsNextPage() {
  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            What's Next?
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore opportunities to collaborate, get early access to new features, or book a call to discuss your needs.
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl shadow-lg">
          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 h-auto rounded-t-xl">
              <TabsTrigger 
                value="waitlist" 
                className="py-2 sm:py-3 text-sm sm:text-base font-semibold flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 rounded-lg"
              >
                <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="hidden sm:inline">Join Waitlist</span>
                <span className="sm:hidden">Waitlist</span>
              </TabsTrigger>
              <TabsTrigger 
                value="booking" 
                className="py-2 sm:py-3 text-sm sm:text-base font-semibold flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 rounded-lg"
              >
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="hidden sm:inline">Book a Discovery Call</span>
                <span className="sm:hidden">Book Call</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="waitlist">
              <JoinWaitlistForm />
            </TabsContent>
            
            <TabsContent value="booking">
              <BookingCalendar />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}