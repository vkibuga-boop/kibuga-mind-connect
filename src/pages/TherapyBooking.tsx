import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TherapyBooking = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [sessionFormat, setSessionFormat] = useState<"online" | "physical" | "">("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate, sessionFormat]);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("therapy_services")
      .select("*")
      .eq("is_active", true);

    if (error) {
      toast.error("Failed to load services");
      return;
    }
    setServices(data || []);
  };

  const fetchAvailableSlots = async () => {
    if (!selectedDate || !sessionFormat) return;

    const { data, error } = await supabase
      .from("available_time_slots")
      .select("*")
      .eq("date", selectedDate.toISOString().split("T")[0])
      .eq("session_format", sessionFormat)
      .eq("is_available", true);

    if (error) {
      toast.error("Failed to load available slots");
      return;
    }
    setAvailableSlots(data || []);
  };

  const handleBooking = async () => {
    if (!selectedService || !sessionFormat || !selectedDate || !selectedSlot) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const service = services.find((s) => s.id === selectedService);
    const priceKey = sessionFormat === "online" ? "online_price_kes" : "physical_price_kes";
    const priceUsdKey = sessionFormat === "online" ? "online_price_usd" : "physical_price_usd";

    const { error } = await supabase.from("therapy_bookings").insert([{
      user_id: user!.id,
      service_id: selectedService,
      session_format: sessionFormat as "online" | "physical",
      booking_date: selectedDate.toISOString().split("T")[0],
      booking_time: selectedSlot,
      total_price_kes: service[priceKey],
      total_price_usd: service[priceUsdKey],
    }]);

    setLoading(false);

    if (error) {
      toast.error("Failed to create booking");
      return;
    }

    toast.success("Booking created successfully!");
    navigate("/");
  };

  if (authLoading) {
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

        <Card className="max-w-3xl mx-auto shadow-strong">
          <CardHeader>
            <CardTitle className="text-3xl">Book Therapy Session</CardTitle>
            <CardDescription>Select your service, format, date and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - KES {service.online_price_kes}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Session Format</Label>
              <Select value={sessionFormat} onValueChange={(value) => setSessionFormat(value as "online" | "physical" | "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Virtual/Online</SelectItem>
                  <SelectItem value="physical">In-Person</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {availableSlots.length > 0 && (
              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.start_time}>
                        {slot.start_time} - {slot.end_time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              onClick={handleBooking}
              disabled={loading || !selectedService || !sessionFormat || !selectedDate || !selectedSlot}
              className="w-full"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TherapyBooking;
