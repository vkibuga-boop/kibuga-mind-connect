import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";

const FreeSessionBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary py-3 px-4 animate-gradient-x">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Gift className="w-5 h-5 text-white animate-bounce" />
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <div className="text-white">
              <p className="text-lg md:text-xl font-bold">
                🎉 First Session FREE for New Clients!
              </p>
              <p className="text-sm md:text-base text-white/90">
                Experience professional therapy at no cost - Limited time offer
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/therapy-booking")}
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-strong whitespace-nowrap"
          >
            Book Free Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeSessionBanner;
