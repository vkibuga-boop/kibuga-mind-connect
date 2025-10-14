import { Button } from "@/components/ui/button";
import { Calendar, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Kibuga Mwaniki Therapy" className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <h1 className="text-xl font-bold">Kibuga Mwaniki</h1>
              <p className="text-xs text-muted-foreground">Professional Therapy & Consultancy</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="/#assessments" className="text-foreground hover:text-primary transition-colors">Assessments</a>
            <a href="/bush-buddies" className="text-foreground hover:text-primary transition-colors">Bush Buddies</a>
            <a href="/#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="hero" size="default" className="hidden md:flex" onClick={() => navigate("/therapy-booking")}>
                  <Calendar className="w-4 h-4" />
                  Book Session
                </Button>
                <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button variant="hero" size="default" className="hidden md:flex" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            )}
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
