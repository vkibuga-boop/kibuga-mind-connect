import { Button } from "@/components/ui/button";
import { Calendar, Video } from "lucide-react";
import heroImage from "@/assets/mental-health-hero.png";
import therapistImage from "@/assets/therapist-professional.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center pt-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.88)), url(${heroImage})`
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent">
              <span className="text-sm font-medium text-accent-foreground">Professional Mental Health Support</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Journey to
              <span className="block text-transparent bg-clip-text bg-gradient-hero">Wellness Begins Here</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Expert therapy services, corporate wellness consultancy, and comprehensive psychometric assessments 
              to support your mental health journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" onClick={() => window.location.href = "/therapy-booking"}>
                <Calendar className="w-5 h-5" />
                Book Therapy Session
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = "/bush-buddies"}>
                <Video className="w-5 h-5" />
                BUSH BUDDIES Adventures
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Clients Helped</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-secondary">4+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-accent">100%</p>
                <p className="text-sm text-muted-foreground">Confidential</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float hidden md:block">
            <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
            <img 
              src={therapistImage} 
              alt="Kibuga Mwaniki - Professional Therapist" 
              className="relative rounded-3xl shadow-strong w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
