
import React, { useState } from "react";
import { ContactMessage } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function JoinWaitlistForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await ContactMessage.create({
        ...formData,
        subject: "Waitlist Inquiry",
        message_type: "feedback"
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Waitlist submission error:", error);
    }
    setIsSubmitting(false);
  };

  const isFormValid = formData.name && formData.email;

  return (
    <div className="p-4 sm:p-8 md:p-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join Our Waitlist</h2>
          <p className="text-sm sm:text-base text-gray-600">Be the first to know about new features and exclusive opportunities.</p>
        </div>

        {submitStatus === "success" && (
          <Alert className="mb-4 sm:mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-sm sm:text-base">
              Thank you! You've been added to our waitlist. We'll be in touch soon.
            </AlertDescription>
          </Alert>
        )}
        {submitStatus === "error" && (
          <Alert variant="destructive" className="mb-4 sm:mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm sm:text-base">
              Submission failed. Please try again or contact support.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Name"
              className="h-10 sm:h-12 bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500 text-sm sm:text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email"
              className="h-10 sm:h-12 bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500 text-sm sm:text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Short message (Optional)"
              className="min-h-20 sm:min-h-24 bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full h-10 sm:h-12 text-base sm:text-lg font-semibold bg-slate-800 hover:bg-slate-700 text-white"
          >
            {isSubmitting ? <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" /> : "Join Waitlist"}
          </Button>
        </form>
      </div>
    </div>
  );
}
