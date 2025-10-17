import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is the first therapy session free?",
    answer: "Yes! We offer a complimentary first session to help you get comfortable with our services and determine if we're the right fit for your needs. This introductory session allows you to meet your therapist, discuss your concerns, and understand our approach without any financial commitment."
  },
  {
    question: "What types of therapy do you offer?",
    answer: "We offer individual therapy, couples counseling, family therapy, and corporate consultancy services. Our approach is integrative, combining evidence-based practices like Cognitive Behavioral Therapy (CBT), mindfulness techniques, and person-centered therapy tailored to your unique needs."
  },
  {
    question: "How long is each therapy session?",
    answer: "Standard therapy sessions are 60 minutes long. For certain assessments or specialized services, extended sessions may be available. We believe this duration provides adequate time for meaningful therapeutic work while maintaining focus and engagement."
  },
  {
    question: "Are psychometric assessments included in therapy sessions?",
    answer: "Psychometric assessments are separate from therapy sessions and are charged independently. These standardized tests help us better understand your mental health needs and provide targeted support. Results are professionally interpreted and shared with you along with personalized recommendations."
  },
  {
    question: "Do you offer online therapy sessions?",
    answer: "Yes, we offer both in-person and online therapy sessions via secure video conferencing. Online sessions provide the same quality of care and are ideal for those with busy schedules, mobility challenges, or who prefer the comfort of their own space."
  },
  {
    question: "How do I prepare for my first session?",
    answer: "Come as you are! There's no special preparation needed. You may want to think about what you'd like to discuss, any concerns you have, and your goals for therapy. Bring an open mind and be ready to take the first step towards positive change."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely. Client confidentiality is a cornerstone of our practice. All information shared during sessions is kept strictly confidential, except in cases where there's a risk of harm to yourself or others, or as required by law. We maintain secure records and comply with all data protection regulations."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 24 hours' notice for cancellations or rescheduling. Cancellations made with less than 24 hours' notice may be subject to a fee. We understand that emergencies happen, and we'll work with you on a case-by-case basis."
  },
  {
    question: "Do you work with corporate clients?",
    answer: "Yes! We provide comprehensive corporate wellness programs, including employee assistance programs (EAP), workplace stress management workshops, team building sessions, and mental health awareness training. Contact us to discuss customized solutions for your organization."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa payments, bank transfers, and cash payments. Payment is typically due at the time of service. For psychometric assessments, payment is required after completion to receive your results. We provide clear payment instructions for all services."
  },
  {
    question: "How many therapy sessions will I need?",
    answer: "The number of sessions varies greatly depending on individual needs, goals, and the nature of concerns being addressed. Some clients benefit from short-term focused therapy (6-12 sessions), while others prefer longer-term support. We'll regularly review your progress and adjust the treatment plan together."
  },
  {
    question: "Are your services covered by insurance?",
    answer: "We currently work with several insurance providers. Please contact us with your insurance details, and we'll verify coverage for you. Many clients also choose to pay out-of-pocket for greater privacy and flexibility in treatment."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our therapy services, assessments, and booking process.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Card key={index} className="shadow-medium overflow-hidden">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  onClick={() => toggleFAQ(index)}
                  className="w-full justify-between p-6 h-auto text-left font-semibold hover:bg-accent/50"
                >
                  <span className="text-base pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                  )}
                </Button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-hero text-primary-foreground shadow-strong">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="mb-6">
                We're here to help! Reach out to us and we'll get back to you as soon as possible.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.location.href = "/#contact"}
              >
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;