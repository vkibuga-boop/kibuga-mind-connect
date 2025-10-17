import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Terms of Service</h1>
        <p className="text-center text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>1. Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                By accessing or using the services provided by Kibuga Mwaniki Consultancy ("we," "us," or "our"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
              <p>
                These terms constitute a legal agreement between you (the "Client" or "User") and Kibuga Mwaniki Consultancy for the provision of mental health services, including but not limited to therapy sessions, psychometric assessments, and corporate consultancy.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>2. Services Provided</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>We offer the following professional services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Individual Therapy:</strong> One-on-one counseling sessions for mental health support and personal development</li>
                <li><strong>Couples and Family Therapy:</strong> Relationship counseling and family therapy sessions</li>
                <li><strong>Psychometric Assessments:</strong> Standardized psychological testing and evaluation</li>
                <li><strong>Corporate Consultancy:</strong> Workplace wellness programs, training, and organizational development</li>
                <li><strong>Online and In-Person Sessions:</strong> Flexible delivery methods to suit your needs</li>
              </ul>
              <p className="mt-4 font-semibold">
                First Session Free: We offer a complimentary introductory therapy session to help you determine if our services are right for you.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>3. Professional Relationship</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                The services provided constitute a professional therapeutic relationship. This relationship exists solely during scheduled sessions and related professional communications. Our therapists maintain professional boundaries in accordance with ethical guidelines.
              </p>
              <p className="font-semibold">Important Disclaimers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our services do not constitute medical treatment or diagnosis</li>
                <li>Psychometric assessments are screening tools, not diagnostic instruments</li>
                <li>We do not provide emergency or crisis intervention services</li>
                <li>We cannot guarantee specific outcomes or results from therapy</li>
                <li>Therapy requires active participation and commitment from clients</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>4. Booking and Appointments</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p><strong>Scheduling:</strong> Appointments can be booked through our website or by contacting us directly. You will receive confirmation via email or SMS.</p>
              <p><strong>Punctuality:</strong> Please arrive on time for your appointments. Late arrivals may result in shortened sessions, as we must respect the time of other clients.</p>
              <p><strong>Cancellation Policy:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>At least 24 hours' notice is required for cancellations or rescheduling</li>
                <li>Cancellations with less than 24 hours' notice may incur a cancellation fee equivalent to 50% of the session cost</li>
                <li>No-shows will be charged the full session fee</li>
                <li>Emergency situations will be considered on a case-by-case basis</li>
                <li>The first free session is subject to the same cancellation policy</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>5. Fees and Payment</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p><strong>Session Fees:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>First therapy session: Free</li>
                <li>Subsequent online sessions: KES 1,500 / USD $20</li>
                <li>In-person sessions: KES 2,000 / USD $30</li>
                <li>Psychometric assessments: KES 150 / USD $2 per assessment</li>
              </ul>
              <p className="mt-4"><strong>Payment Terms:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment is due at the time of service or as otherwise agreed</li>
                <li>We accept M-Pesa, bank transfers, and cash payments</li>
                <li>Assessment results are released upon receipt of payment</li>
                <li>Package deals and corporate rates are available upon request</li>
                <li>Prices are subject to change with 30 days' notice</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>6. Confidentiality</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                All information disclosed during therapy sessions is confidential and protected by professional ethical standards and applicable laws. We maintain strict confidentiality except in specific circumstances outlined in our Privacy Policy.
              </p>
              <p className="font-semibold">Limits to Confidentiality:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Risk of harm to self or others</li>
                <li>Suspected abuse of children, elderly, or dependent adults</li>
                <li>Court-ordered disclosure</li>
                <li>Insurance billing requirements (with your consent)</li>
                <li>Supervision and consultation with other professionals (anonymously when possible)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>7. Client Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">As a client, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Attend sessions as scheduled or provide adequate notice for cancellations</li>
                <li>Make payments promptly according to agreed terms</li>
                <li>Inform us of any changes in your mental health status or medications</li>
                <li>Participate actively and honestly in the therapeutic process</li>
                <li>Respect professional boundaries and the therapeutic relationship</li>
                <li>Not record sessions without prior written consent</li>
                <li>Seek emergency services if experiencing a mental health crisis</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>8. Online Sessions</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                For online therapy sessions, you are responsible for ensuring a private, quiet space with reliable internet connectivity. Technical issues may occasionally occur, and we will make reasonable efforts to resolve them or reschedule if necessary.
              </p>
              <p><strong>Online Session Requirements:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stable internet connection</li>
                <li>Private, confidential space</li>
                <li>Working camera and microphone</li>
                <li>Compatible device (computer, tablet, or smartphone)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>9. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                All materials provided during sessions, including handouts, worksheets, and assessment reports, remain the intellectual property of Kibuga Mwaniki Consultancy. These materials are for your personal use only and may not be reproduced, distributed, or shared without written permission.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>10. Liability and Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Our services are provided on an "as is" basis. While we strive to provide high-quality professional care, we make no warranties or guarantees regarding specific outcomes or results.
              </p>
              <p><strong>Limitations of Liability:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We are not liable for decisions you make based on therapy discussions</li>
                <li>We are not responsible for emergencies occurring outside of scheduled sessions</li>
                <li>Technical difficulties with online sessions do not constitute breach of service</li>
                <li>Our liability is limited to the fees paid for services rendered</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>11. Termination of Services</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Either party may terminate the therapeutic relationship at any time. We reserve the right to terminate services if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment obligations are not met</li>
                <li>You repeatedly miss or cancel appointments without notice</li>
                <li>Your needs exceed our scope of practice</li>
                <li>There is a conflict of interest or boundary violation</li>
                <li>The therapeutic relationship is no longer beneficial</li>
              </ul>
              <p className="mt-4">
                In case of termination, we will provide appropriate referrals to other qualified professionals when clinically indicated.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>12. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                In the event of any dispute arising from these terms or our services, both parties agree to first attempt resolution through good-faith negotiation. If negotiation fails, disputes will be resolved through mediation before pursuing legal action.
              </p>
              <p>
                These terms are governed by the laws of Kenya, and any legal proceedings shall be conducted in Nairobi, Kenya.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>13. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We reserve the right to modify these Terms of Service at any time. Significant changes will be communicated via email or posted on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>14. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Kibuga Mwaniki Consultancy</strong></p>
                <p>Email: vkibuga@gmail.com</p>
                <p>Phone: +254 123 456 789</p>
                <p>Location: Nairobi, Kenya</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8 p-6 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;