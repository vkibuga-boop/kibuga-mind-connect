import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Assessments from "@/components/Assessments";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import FreeSessionBanner from "@/components/FreeSessionBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FreeSessionBanner />
      <Header />
      <Hero />
      <Services />
      <Assessments />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default Index;
