import { Button } from "@/components/ui/button";
import { Calendar, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">KM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Kibuga Mwaniki</h1>
              <p className="text-xs text-muted-foreground">Professional Therapy & Consultancy</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#assessments" className="text-foreground hover:text-primary transition-colors">Assessments</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="hero" size="default" className="hidden md:flex">
              <Calendar className="w-4 h-4" />
              Book Session
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
