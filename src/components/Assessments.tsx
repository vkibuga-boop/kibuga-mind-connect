import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Target, Sparkles } from "lucide-react";

const assessmentTools = [
  {
    icon: Brain,
    title: "Personality Assessment",
    description: "Discover your unique personality traits with comprehensive Big Five and Myers-Briggs Type assessments.",
    color: "text-primary",
  },
  {
    icon: Heart,
    title: "Mental Health Screening",
    description: "Professional screening tools for anxiety, depression, PTSD, and other common mental health disorders.",
    color: "text-secondary",
  },
  {
    icon: Target,
    title: "Temperament Analysis",
    description: "Understand your natural behavioral tendencies and emotional patterns through validated temperament tests.",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "Wellness Profile",
    description: "Comprehensive evaluation of your overall psychological wellbeing and personal development areas.",
    color: "text-primary",
  },
];

const Assessments = () => {
  return (
    <section id="assessments" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
            <span className="text-sm font-medium text-accent-foreground">Psychometric Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Assessment Tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Evidence-based psychological assessments to understand yourself better
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {assessmentTools.map((tool, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-medium transition-all duration-300 border hover:border-primary/30 bg-gradient-card"
            >
              <CardHeader className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-subtle flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-7 h-7" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">{tool.title}</CardTitle>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full" onClick={() => window.location.href = "/assessments"}>
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center shadow-strong">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            All Assessments Include Professional Review
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Each assessment comes with a detailed interpretation session with a licensed professional to help you understand 
            your results and create an actionable wellness plan.
          </p>
          <Button variant="secondary" size="lg" className="shadow-medium" onClick={() => window.location.href = "/assessments"}>
            Browse All Assessments
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Assessments;
