import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRound, Building2, ClipboardList, ArrowRight } from "lucide-react";
import individualTherapyImage from "@/assets/individual-therapy.jpg";
import corporateImage from "@/assets/corporate-services.jpg";
import assessmentsImage from "@/assets/assessments.jpg";

const services = [
  {
    icon: UserRound,
    title: "Individual Therapy",
    description: "One-on-one professional counseling sessions tailored to your unique needs, available both in-person and via secure video conferencing.",
    image: individualTherapyImage,
    features: ["Anxiety & Depression", "Stress Management", "Relationship Issues", "Personal Growth"],
  },
  {
    icon: Building2,
    title: "Corporate Consultancy",
    description: "Comprehensive workplace wellness programs and mental health support services for organizations committed to employee wellbeing.",
    image: corporateImage,
    features: ["Employee Wellness Programs", "Stress Management Workshops", "Team Building", "Crisis Intervention"],
  },
  {
    icon: ClipboardList,
    title: "Psychometric Assessments",
    description: "Professional psychological testing and evaluation tools for disorders, personality types, and temperament analysis.",
    image: assessmentsImage,
    features: ["Personality Assessment", "Disorder Screening", "Temperament Analysis", "Career Guidance"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Mental Health Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            Professional support designed to meet your unique mental health and wellness needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-strong transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-card overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-medium">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="ghost" className="w-full group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
