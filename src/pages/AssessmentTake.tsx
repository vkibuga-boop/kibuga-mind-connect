import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Loader2, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { z } from "zod";

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple" | "scale";
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
}

interface Assessment {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: Question[];
  result_fee_kes: number;
  result_fee_usd: number;
}

const AssessmentTake = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [claimingPayment, setClaimingPayment] = useState(false);

  // Validation schemas
  const paymentClaimSchema = z.object({
    email: z.string().email("Invalid email address").max(255, "Email too long"),
    mobile_number: z.string()
      .regex(/^\+254\d{9}$/, "Mobile number must be in format +254XXXXXXXXX")
      .or(z.string().regex(/^07\d{8}$/, "Mobile number must be in format 07XXXXXXXX")),
  });

  useEffect(() => {
    fetchAssessment();
  }, [id]);

  const fetchAssessment = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("psychometric_assessments")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      toast.error("Failed to load assessment");
      navigate("/assessments");
      return;
    }

    const assessmentData = {
      ...data,
      questions: data.questions as unknown as Question[]
    } as Assessment;

    setAssessment(assessmentData);
    setLoading(false);
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleChoice = (questionId: string, option: string, checked: boolean) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      if (checked) {
        return { ...prev, [questionId]: [...current, option] };
      } else {
        return { ...prev, [questionId]: current.filter((item: string) => item !== option) };
      }
    });
  };

  const validateAnswers = () => {
    if (!assessment) return false;
    
    for (const question of assessment.questions) {
      const answer = answers[question.id];
      
      // For multiple choice, check if array has items
      if (Array.isArray(answer)) {
        if (answer.length === 0) return false;
      } 
      // For scale and single choice, check if value exists (including 0)
      else if (answer === "" || answer === null || answer === undefined) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .rpc("submit_assessment_result", {
          p_assessment_id: id,
          p_answers: answers,
        });

      if (error) throw error;

      if (data && data.length > 0 && data[0].access_token) {
        setAccessToken(data[0].access_token);
      }

      setSubmitted(true);
      toast.success("Assessment submitted successfully!");
    } catch (error) {
      console.error("Assessment submission error:", error);
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaimPayment = async () => {
    // Validate inputs
    try {
      // Normalize mobile number format
      let normalizedMobile = mobileNumber.trim();
      if (normalizedMobile.startsWith("07")) {
        normalizedMobile = "+254" + normalizedMobile.substring(1);
      }

      const validatedData = paymentClaimSchema.parse({
        email: email.trim(),
        mobile_number: normalizedMobile,
      });

      if (!accessToken) {
        toast.error("Invalid submission. Please try taking the assessment again.");
        return;
      }

      setClaimingPayment(true);

      const { data, error } = await supabase
        .from("user_assessment_results")
        .update({
          email: validatedData.email,
          mobile_number: validatedData.mobile_number,
          payment_claimed_at: new Date().toISOString(),
        })
        .eq("access_token", accessToken)
        .is("payment_claimed_at", null)
        .select()
        .single();

      if (error) {
        console.error("Payment claim error:", error);
        throw error;
      }

      // Send notification email to admin
      try {
        await supabase.functions.invoke("send-assessment-notification", {
          body: {
            assessment_name: assessment?.name,
            email: validatedData.email,
            mobile_number: validatedData.mobile_number,
            result_fee_kes: assessment?.result_fee_kes,
            result_fee_usd: assessment?.result_fee_usd,
            access_token: accessToken,
          },
        });
      } catch (emailError) {
        console.log("Email notification failed, but payment claim succeeded:", emailError);
      }

      toast.success(
        "Payment details saved! Please send payment to M-Pesa Paybill 542542, Account: 00305615756150. We'll verify and send your results via email within 24 hours."
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        toast.error(firstError.message);
      } else {
        toast.error("Failed to save payment details. Please try again.");
      }
    } finally {
      setClaimingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!assessment) {
    return null;
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-24 max-w-3xl">
          <Card className="shadow-strong">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <CardTitle className="text-2xl">Assessment Completed</CardTitle>
              </div>
              <CardDescription>
                Thank you for completing the {assessment.name}. To receive your results, please complete the payment process below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Instructions</AlertTitle>
                <AlertDescription className="space-y-2 mt-2">
                  <p className="font-semibold">M-Pesa Paybill: 542542</p>
                  <p className="font-semibold">Account Number: 00305615756150</p>
                  <p className="mt-2">Amount: KES {assessment.result_fee_kes} (USD ${assessment.result_fee_usd})</p>
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number (for payment verification) *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+254712345678 or 0712345678"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={13}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: +254XXXXXXXXX or 07XXXXXXXX
                  </p>
                </div>

                <Button 
                  onClick={handleClaimPayment} 
                  disabled={claimingPayment || !email || !mobileNumber}
                  className="w-full"
                >
                  {claimingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "I Have Paid - Send My Results"
                  )}
                </Button>
              </div>

              <Alert variant="default" className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  Once you submit your payment information, our team will verify it and send your detailed results to your email within 24 hours.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/assessments")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Assessments
        </Button>

        <Card className="shadow-strong mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">{assessment.name}</CardTitle>
            <CardDescription className="text-base">{assessment.description}</CardDescription>
          </CardHeader>
        </Card>

        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-900 font-semibold">Important Disclaimer</AlertTitle>
          <AlertDescription className="text-amber-900 mt-2">
            <p className="mb-2">
              This assessment is a screening tool designed to help identify potential symptoms or concerns. 
              It is <strong>not a diagnostic instrument</strong> and should not be used as a substitute for 
              professional medical or psychological evaluation.
            </p>
            <p className="mb-2">
              Results from this assessment should be interpreted in consultation with a qualified healthcare 
              provider, psychologist, or psychiatrist who can conduct a comprehensive evaluation.
            </p>
            <p>
              If you are experiencing severe symptoms or a mental health crisis, please seek immediate 
              professional help or contact emergency services.
            </p>
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {assessment.questions.map((question, index) => (
            <Card key={question.id} className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Question {index + 1} of {assessment.questions.length}
                </CardTitle>
                <CardDescription className="text-base mt-2">{question.text}</CardDescription>
              </CardHeader>
              <CardContent>
                {question.type === "single" && question.options && (
                  <RadioGroup
                    key={`radio-group-${question.id}`}
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    {question.options.map((option, optIndex) => {
                      const uniqueId = `q-${question.id}-opt-${optIndex}-${option.replace(/\s+/g, '-')}`;
                      return (
                        <div key={uniqueId} className="flex items-center space-x-2 py-2">
                          <RadioGroupItem 
                            value={option} 
                            id={uniqueId}
                          />
                          <Label 
                            htmlFor={uniqueId}
                            className="font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                )}

                {question.type === "multiple" && question.options && (
                  <div className="space-y-3">
                    {question.options.map((option, optIdx) => {
                      const multiId = `multi-${question.id}-${optIdx}-${option.replace(/\s+/g, '-')}`;
                      return (
                        <div key={multiId} className="flex items-center space-x-2">
                          <Checkbox
                            id={multiId}
                            checked={(answers[question.id] || []).includes(option)}
                            onCheckedChange={(checked) => 
                              handleMultipleChoice(question.id, option, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={multiId}
                            className="font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.type === "scale" && (
                  <RadioGroup
                    key={`radio-scale-${question.id}`}
                    value={answers[question.id]?.toString() || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                  >
                    <div className="flex justify-between items-center">
                      {Array.from(
                        { length: (question.scaleMax || 10) - (question.scaleMin || 0) + 1 },
                        (_, i) => (question.scaleMin || 0) + i
                      ).map((value) => {
                        const uniqueScaleId = `scale-${question.id}-val-${value}`;
                        return (
                          <div key={uniqueScaleId} className="flex flex-col items-center">
                            <RadioGroupItem 
                              value={value.toString()}
                              id={uniqueScaleId}
                            />
                            <Label 
                              htmlFor={uniqueScaleId}
                              className="mt-1 cursor-pointer"
                            >
                              {value}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>Not at all</span>
                      <span>Extremely</span>
                    </div>
                  </RadioGroup>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 shadow-strong">
          <CardContent className="pt-6">
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="w-full"
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Complete Assessment"
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-3">
              By submitting, you acknowledge that you have read and understood the disclaimer above.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AssessmentTake;
