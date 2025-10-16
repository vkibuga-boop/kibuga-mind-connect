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

  const handleBooking = async () => {
    if (!selectedEvent || !name || !email || !phoneNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    setBookingLoading(true);

    const { error } = await supabase.from("bush_buddies_bookings").insert({
      event_id: selectedEvent.id,
      total_price_kes: selectedEvent.price_kes,
      total_price_usd: selectedEvent.price_usd,
      phone_number: phoneNumber,
    });

    if (error) {
      setBookingLoading(false);
      toast.error("Failed to create booking. Please try again.");
      console.error("Booking error:", error);
      return;
    }

    // Send confirmation email
    try {
      await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          name,
          email,
          phone_number: phoneNumber,
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
      console.error("Email notification failed:", emailError);
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
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BUSH BUDDIES Adventures</h1>
          <p className="text-lg text-muted-foreground">
            Join us for therapeutic outdoor adventures that combine nature, wellness, and community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="shadow-medium hover:shadow-strong transition-all">
              {event.poster_url && (
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={event.poster_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>
                      {event.start_time} - {event.end_time}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>
                      {event.current_participants}/{event.max_participants} participants
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-primary">KES {event.price_kes}</p>
                    <p className="text-sm text-muted-foreground">USD {event.price_usd}</p>
                  </div>
                  <Dialog open={selectedEvent?.id === event.id} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedEvent(event)}
                        disabled={event.current_participants >= event.max_participants}
                      >
                        {event.current_participants >= event.max_participants ? "Full" : "Book Now"}
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
