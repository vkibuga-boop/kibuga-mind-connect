import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AssessmentsPage = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    const { data, error } = await supabase
      .from("psychometric_assessments")
      .select("*")
      .eq("is_active", true)
      .order("category", { ascending: true });

    if (error) {
      toast.error("Failed to load assessments");
      setLoading(false);
      return;
    }
    setAssessments(data || []);
    setLoading(false);
  };

  const handleStartAssessment = (assessmentId: string) => {
    navigate(`/assessment/${assessmentId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const groupedAssessments: Record<string, any[]> = assessments.reduce((acc, assessment) => {
    if (!acc[assessment.category]) {
      acc[assessment.category] = [];
    }
    acc[assessment.category].push(assessment);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Psychometric Assessments</h1>
          <p className="text-lg text-muted-foreground">
            Professional psychological testing and evaluation tools for self-discovery and growth
          </p>
        </div>

        {Object.entries(groupedAssessments).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 capitalize">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((assessment) => (
                <Card key={assessment.id} className="shadow-medium hover:shadow-strong transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{category}</Badge>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Result Fee</p>
                        <p className="font-bold text-primary">KES {assessment.result_fee_kes}</p>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{assessment.name}</CardTitle>
                    <CardDescription>{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleStartAssessment(assessment.id)}
                      className="w-full"
                    >
                      Take Assessment
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" />
                      Results require payment
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {assessments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No assessments available at the moment.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AssessmentsPage;
