import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">KM</span>
              </div>
              <div>
                <h3 className="font-bold">Kibuga Mwaniki</h3>
                <p className="text-xs text-muted-foreground">Consultancy</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional mental health support and corporate wellness solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Individual Therapy</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Corporate Consultancy</a></li>
              <li><a href="#assessments" className="hover:text-primary transition-colors">Psychometric Tests</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Video Sessions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@kibugamwaniki.com" className="hover:text-primary transition-colors">
                  info@kibugamwaniki.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+254123456789" className="hover:text-primary transition-colors">
                  +254 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
            
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kibuga Mwaniki Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
