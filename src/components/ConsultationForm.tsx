import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Mail, Phone, Home, Palette, Clock, IndianRupee, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ConsultationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    propertySize: "",
    rooms: [] as string[],
    projectType: "",
    budget: "",
    timeline: "",
    stylePreference: "",
    referralSource: "",
    address: "",
    message: "",
    preferredContactTime: "",
  });

  const roomOptions = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Dining Room",
    "Home Office",
    "Kids Room",
    "Pooja Room",
    "Balcony",
    "Entire Home",
  ];

  const handleRoomToggle = (room: string) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.includes(room)
        ? prev.rooms.filter((r) => r !== room)
        : [...prev.rooms, room],
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.fullName.trim() || formData.fullName.length > 100) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (max 100 characters).",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || formData.email.length > 255) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.propertyType) {
      toast({
        title: "Property Type Required",
        description: "Please select your property type.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.propertySize) {
      toast({
        title: "Property Size Required",
        description: "Please select your property size.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.rooms.length === 0) {
      toast({
        title: "Rooms Required",
        description: "Please select at least one room to design.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.projectType) {
      toast({
        title: "Project Type Required",
        description: "Please select your project type.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.budget) {
      toast({
        title: "Budget Required",
        description: "Please select your budget range.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.timeline) {
      toast({
        title: "Timeline Required",
        description: "Please select your expected timeline.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("consultations").insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        preferred_contact_time: formData.preferredContactTime || null,
        property_type: formData.propertyType,
        property_size: formData.propertySize,
        property_address: formData.address.trim() || null,
        rooms_to_design: formData.rooms.join(", "),
        project_type: formData.projectType,
        style_preference: formData.stylePreference || null,
        budget_range: formData.budget,
        timeline: formData.timeline,
        referral_source: formData.referralSource || null,
        message: formData.message.trim() || null,
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your consultation request has been submitted.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyType: "",
      propertySize: "",
      rooms: [],
      projectType: "",
      budget: "",
      timeline: "",
      stylePreference: "",
      referralSource: "",
      address: "",
      message: "",
      preferredContactTime: "",
    });
  };

  if (isSubmitted) {
    return (
      <section id="consultation" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Thank You!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your consultation request has been received. Our design team will
              contact you within 24-48 hours to schedule your personalized
              consultation.
            </p>
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Book Another Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Book Your Consultation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards your dream space. Fill out the form
            below and our design experts will get in touch to understand your
            vision.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-background rounded-2xl shadow-xl p-6 md:p-10 border border-border"
        >
          {/* Personal Information */}
          <div className="mb-10">
            <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                    maxLength={100}
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    maxLength={255}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    maxLength={20}
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredContactTime">
                  Preferred Contact Time
                </Label>
                <Select
                  value={formData.preferredContactTime}
                  onValueChange={(value) =>
                    setFormData({ ...formData, preferredContactTime: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">
                      Morning (9 AM - 12 PM)
                    </SelectItem>
                    <SelectItem value="afternoon">
                      Afternoon (12 PM - 4 PM)
                    </SelectItem>
                    <SelectItem value="evening">
                      Evening (4 PM - 7 PM)
                    </SelectItem>
                    <SelectItem value="anytime">Any Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-10">
            <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, propertyType: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa / Independent House</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="farmhouse">Farmhouse</SelectItem>
                    <SelectItem value="office">Office Space</SelectItem>
                    <SelectItem value="retail">Retail / Commercial</SelectItem>
                    <SelectItem value="restaurant">Restaurant / Cafe</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertySize">Property Size (sq. ft.) *</Label>
                <Select
                  value={formData.propertySize}
                  onValueChange={(value) =>
                    setFormData({ ...formData, propertySize: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-500">Below 500 sq. ft.</SelectItem>
                    <SelectItem value="500-1000">500 - 1,000 sq. ft.</SelectItem>
                    <SelectItem value="1000-2000">1,000 - 2,000 sq. ft.</SelectItem>
                    <SelectItem value="2000-3000">2,000 - 3,000 sq. ft.</SelectItem>
                    <SelectItem value="3000-5000">3,000 - 5,000 sq. ft.</SelectItem>
                    <SelectItem value="above-5000">Above 5,000 sq. ft.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  placeholder="Enter property address (City, Area)"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  maxLength={500}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Label>Rooms to Design *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {roomOptions.map((room) => (
                  <div
                    key={room}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={room}
                      checked={formData.rooms.includes(room)}
                      onCheckedChange={() => handleRoomToggle(room)}
                      className="h-5 w-5"
                    />
                    <Label
                      htmlFor={room}
                      className="text-sm font-normal cursor-pointer leading-tight"
                    >
                      {room}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Requirements */}
          <div className="mb-10">
            <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Project Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, projectType: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-construction">
                      New Construction
                    </SelectItem>
                    <SelectItem value="renovation">
                      Renovation / Remodeling
                    </SelectItem>
                    <SelectItem value="refresh">
                      Quick Refresh / Styling
                    </SelectItem>
                    <SelectItem value="consultation-only">
                      Design Consultation Only
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stylePreference">Style Preference</Label>
                <Select
                  value={formData.stylePreference}
                  onValueChange={(value) =>
                    setFormData({ ...formData, stylePreference: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern / Contemporary</SelectItem>
                    <SelectItem value="traditional">Traditional / Classic</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="luxury">Luxury / Royal</SelectItem>
                    <SelectItem value="bohemian">Bohemian / Eclectic</SelectItem>
                    <SelectItem value="scandinavian">Scandinavian</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="not-sure">Not Sure - Need Guidance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range (₹) *</Label>
                <div className="relative">
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      setFormData({ ...formData, budget: value })
                    }
                    required
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-5l">Below ₹5 Lakhs</SelectItem>
                      <SelectItem value="5l-10l">₹5 - 10 Lakhs</SelectItem>
                      <SelectItem value="10l-20l">₹10 - 20 Lakhs</SelectItem>
                      <SelectItem value="20l-50l">₹20 - 50 Lakhs</SelectItem>
                      <SelectItem value="50l-1cr">₹50 Lakhs - 1 Crore</SelectItem>
                      <SelectItem value="above-1cr">Above ₹1 Crore</SelectItem>
                      <SelectItem value="flexible">Flexible / Discuss</SelectItem>
                    </SelectContent>
                  </Select>
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline *</Label>
                <div className="relative">
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) =>
                      setFormData({ ...formData, timeline: value })
                    }
                    required
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="When do you want to start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">
                        Immediately / ASAP
                      </SelectItem>
                      <SelectItem value="1-month">Within 1 Month</SelectItem>
                      <SelectItem value="1-3-months">1 - 3 Months</SelectItem>
                      <SelectItem value="3-6-months">3 - 6 Months</SelectItem>
                      <SelectItem value="6-12-months">6 - 12 Months</SelectItem>
                      <SelectItem value="planning">
                        Just Planning / Exploring
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-10">
            <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="referralSource">How did you hear about us?</Label>
                <Select
                  value={formData.referralSource}
                  onValueChange={(value) =>
                    setFormData({ ...formData, referralSource: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="referral">Friend / Family Referral</SelectItem>
                    <SelectItem value="previous-client">Previous Client</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Tell us more about your vision (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Describe your dream space, specific requirements, inspirations, or any questions you have..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="min-h-[120px]"
                  maxLength={2000}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-6 text-lg font-serif bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-5 w-5" />
                  Book My Consultation
                </>
              )}
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              We respect your privacy. Your information will never be shared.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ConsultationForm;
