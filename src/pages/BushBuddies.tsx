import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const BushBuddies = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleBooking = async (eventId: string, priceKes: number, priceUsd: number) => {
    if (!user) {
      toast.error("Please sign in to book an event");
      navigate("/auth");
      return;
    }

    const { error } = await supabase.from("bush_buddies_bookings").insert({
      user_id: user.id,
      event_id: eventId,
      total_price_kes: priceKes,
      total_price_usd: priceUsd,
    });

    if (error) {
      toast.error("Failed to create booking. Please try again.");
      console.error("Booking error:", error);
      return;
    }

    toast.success("Event booked successfully! You'll receive payment instructions via email.");
    fetchEvents();
  };

  if (loading || authLoading) {
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
                  <Button
                    onClick={() => handleBooking(event.id, event.price_kes, event.price_usd)}
                    disabled={event.current_participants >= event.max_participants}
                  >
                    {event.current_participants >= event.max_participants ? "Full" : "Book Now"}
                  </Button>
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
