import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-center text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                At Kibuga Mwaniki Consultancy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, including therapy sessions, psychometric assessments, and corporate consultancy.
              </p>
              <p>
                By using our services, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our services.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p className="font-semibold">Personal Information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, phone number, and date of birth</li>
                <li>Payment information (M-Pesa numbers, transaction IDs)</li>
                <li>Session notes and therapeutic records</li>
                <li>Psychometric assessment responses and results</li>
                <li>Communication history with our practice</li>
              </ul>
              <p className="font-semibold mt-4">Automatically Collected Information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information, IP address, and browser type</li>
                <li>Usage data and website analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>3. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide mental health services and therapy sessions</li>
                <li>To conduct and deliver psychometric assessment results</li>
                <li>To process payments and maintain billing records</li>
                <li>To communicate appointment reminders and service updates</li>
                <li>To improve our services and develop new offerings</li>
                <li>To comply with legal and regulatory requirements</li>
                <li>To protect against fraud and unauthorized access</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>4. Confidentiality and Therapeutic Privilege</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                As a mental health service provider, we maintain strict confidentiality in accordance with professional ethical standards and applicable laws. Information shared during therapy sessions is protected by therapeutic privilege.
              </p>
              <p className="font-semibold">Exceptions to Confidentiality:</p>
              <p>We may disclose information without your consent only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>When there is a serious threat of harm to yourself or others</li>
                <li>In cases of suspected child, elder, or dependent adult abuse</li>
                <li>When required by court order or legal proceedings</li>
                <li>For insurance billing purposes (with your consent)</li>
                <li>To consult with other healthcare professionals for treatment purposes (with your consent)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>5. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encrypted data transmission and storage</li>
                <li>Secure access controls and authentication</li>
                <li>Regular security audits and updates</li>
                <li>Staff training on privacy and confidentiality</li>
                <li>Secure disposal of records when no longer needed</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>6. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy and to comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Therapeutic records: Retained for 7 years after the last session (as per Kenyan law)</li>
                <li>Assessment results: Retained for 5 years</li>
                <li>Payment records: Retained for 7 years for tax and audit purposes</li>
                <li>Marketing data: Retained until you opt out or request deletion</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>7. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information and request copies of your records</li>
                <li>Request corrections to inaccurate or incomplete information</li>
                <li>Request deletion of your information (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for data processing (where applicable)</li>
                <li>Lodge a complaint with the Data Protection Commissioner of Kenya</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>8. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                We may use third-party service providers to facilitate our services, including payment processors, email services, and analytics tools. These providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your information.
              </p>
              <p>
                We do not sell, trade, or rent your personal information to third parties for marketing purposes.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Our services are not directed to individuals under 18 years of age. When providing services to minors, we obtain appropriate consent from parents or legal guardians and maintain confidentiality in accordance with professional standards and applicable laws regarding minors' rights to privacy.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>10. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>11. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Kibuga Mwaniki Consultancy</strong></p>
                <p>Email: vkibuga@gmail.com</p>
                <p>Phone: +254 123 456 789</p>
                <p>Location: Nairobi, Kenya</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;