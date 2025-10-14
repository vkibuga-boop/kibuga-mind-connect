import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Clock, Shield } from "lucide-react";

const BookingSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary">Easy Booking</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">
              Book Your Session in
              <span className="block text-transparent bg-clip-text bg-gradient-hero">3 Simple Steps</span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Getting professional support has never been easier. Choose your preferred format, 
              select a convenient time, and start your wellness journey.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Choose Your Format</h4>
                  <p className="text-sm text-muted-foreground">Select between in-person sessions or secure video conferencing</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Pick Your Time</h4>
                  <p className="text-sm text-muted-foreground">Browse available slots and choose what works best for you</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Confirm & Start</h4>
                  <p className="text-sm text-muted-foreground">Receive confirmation and access your virtual session link</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-strong border-2 border-primary/20 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Book Your Session</CardTitle>
              <CardDescription className="text-base">Choose your preferred session type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <button className="p-6 rounded-xl border-2 border-border hover:border-primary bg-background hover:bg-accent/5 transition-all duration-300 text-left group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Virtual Session</h4>
                      <p className="text-sm text-muted-foreground mb-2">Secure video conferencing from anywhere</p>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Clock className="w-4 h-4" />
                        <span>60 minutes</span>
                      </div>
                    </div>
                  </div>
                </button>

                <button className="p-6 rounded-xl border-2 border-border hover:border-primary bg-background hover:bg-accent/5 transition-all duration-300 text-left group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">In-Person Session</h4>
                      <p className="text-sm text-muted-foreground mb-2">Face-to-face therapy at our office</p>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Clock className="w-4 h-4" />
                        <span>60 minutes</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="pt-4 space-y-3">
                <Button variant="hero" size="lg" className="w-full" onClick={() => window.location.href = "/therapy-booking"}>
                  View Available Times
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>100% Confidential & Secure</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
