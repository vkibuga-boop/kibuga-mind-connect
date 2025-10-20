import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { z } from "zod";

const BushBuddies = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("bush_buddies_events")
      .select("*")
      .eq("is_active", true)
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true });

    if (error) {
      toast.error("Failed to load events");
      setLoading(false);
      return;
    }
    setEvents(data || []);
    setLoading(false);
  };

  const bookingSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
    email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
    phoneNumber: z.string().trim().regex(/^(\+254|0)[17]\d{8}$/, "Invalid phone number format"),
  });

  const handleBooking = async () => {
    if (!selectedEvent || !name || !email || !phoneNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate inputs
    try {
      bookingSchema.parse({ name, email, phoneNumber });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setBookingLoading(true);

    const { error } = await supabase.from("bush_buddies_bookings").insert({
      event_id: selectedEvent.id,
      total_price_kes: selectedEvent.price_kes,
      total_price_usd: selectedEvent.price_usd,
      phone_number: phoneNumber.trim(),
    });

    if (error) {
      setBookingLoading(false);
      toast.error("Failed to create booking. Please try again.");
      return;
    }

    // Send confirmation email
    try {
      await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          name: name.trim(),
          email: email.trim(),
          phone_number: phoneNumber.trim(),
          booking_type: 'bush_buddies',
          event_title: selectedEvent.title,
          event_date: new Date(selectedEvent.date).toLocaleDateString(),
          event_time: `${selectedEvent.start_time} - ${selectedEvent.end_time}`,
          event_location: selectedEvent.location,
          price_kes: selectedEvent.price_kes,
          price_usd: selectedEvent.price_usd,
        }
      });
    } catch (emailError) {
      // Email failure shouldn't block booking
    }

    setBookingLoading(false);
    toast.success("Event booked successfully! Check your email for confirmation.");
    setSelectedEvent(null);
    setName("");
    setEmail("");
    setPhoneNumber("");
    fetchEvents();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center max-w-3xl mx-auto mb-12 space-y-6">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full border border-primary/20">
            <span className="text-primary font-semibold text-sm tracking-wider">🌿 OUTDOOR WELLNESS ADVENTURES 🏔️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
            BUSH BUDDIES
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reconnect with nature, discover inner peace, and build meaningful connections through therapeutic outdoor experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden border-2 border-primary/20 shadow-medium hover:shadow-strong hover:border-primary/40 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-card to-green-50/30 dark:to-green-950/20">
              {event.poster_url && (
                <div className="h-56 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  <img
                    src={event.poster_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    🌲 Adventure
                  </div>
                </div>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-xl bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-full">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-500 p-2 rounded-full">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">
                      {event.start_time} - {event.end_time}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500 p-2 rounded-full">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-500 p-2 rounded-full">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">
                      {event.current_participants}/{event.max_participants} adventurers
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-green-200 dark:border-green-800">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">KES {event.price_kes}</p>
                    <p className="text-sm text-muted-foreground">USD ${event.price_usd}</p>
                  </div>
                  <Dialog open={selectedEvent?.id === event.id} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedEvent(event)}
                        disabled={event.current_participants >= event.max_participants}
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        size="lg"
                      >
                        {event.current_participants >= event.max_participants ? "🌟 Fully Booked" : "🚀 Join Adventure"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Your Booking</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="event-name">Full Name</Label>
                          <Input
                            id="event-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-email">Email Address</Label>
                          <Input
                            id="event-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-phone">Phone Number</Label>
                          <Input
                            id="event-phone"
                            type="tel"
                            placeholder="e.g., 0771700115"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <Button
                          onClick={handleBooking}
                          disabled={bookingLoading || !name || !email || !phoneNumber}
                          className="w-full"
                        >
                          {bookingLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                          Confirm Booking
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BushBuddies;
