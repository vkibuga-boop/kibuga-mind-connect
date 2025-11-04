import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "vkibuga@gmail.com";
const ADMIN_WHATSAPP = "254771700115"; // WhatsApp number in international format

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AssessmentNotificationRequest {
  assessment_name: string;
  email: string;
  mobile_number: string;
  result_fee_kes: number;
  result_fee_usd: number;
  access_token: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const notification: AssessmentNotificationRequest = await req.json();
    console.log("Processing assessment notification:", notification);

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, will only generate WhatsApp URL");
    }

    const emailSubject = `New Assessment Payment Claimed - ${notification.assessment_name}`;
    const emailHtml = `
      <h2>New Assessment Result Payment</h2>
      <p><strong>User Details:</strong></p>
      <ul>
        <li>Email: ${notification.email}</li>
        <li>Mobile: ${notification.mobile_number}</li>
      </ul>
      <p><strong>Assessment Details:</strong></p>
      <ul>
        <li>Assessment: ${notification.assessment_name}</li>
        <li>Fee: KES ${notification.result_fee_kes} / USD $${notification.result_fee_usd}</li>
        <li>Access Token: ${notification.access_token}</li>
      </ul>
      <p><strong>Payment Instructions:</strong></p>
      <p>User has been instructed to pay via M-Pesa Paybill 542542, Account: 00305615756150</p>
      <p>Once payment is verified, send the assessment results to: ${notification.email}</p>
    `;

    // Prepare WhatsApp message
    const whatsappMessage = `🔔 *New Assessment Payment*\n\n` +
      `📋 *Assessment:* ${notification.assessment_name}\n` +
      `💰 *Fee:* KES ${notification.result_fee_kes} / USD $${notification.result_fee_usd}\n\n` +
      `👤 *User Details:*\n` +
      `📧 Email: ${notification.email}\n` +
      `📱 Mobile: ${notification.mobile_number}\n` +
      `🔑 Token: ${notification.access_token}\n\n` +
      `💵 *Payment:* M-Pesa Paybill 542542, Acc: 00305615756150\n\n` +
      `⚡ *Action Required:* Verify payment and send results to user email`;

    // Create WhatsApp link (admin can click this to send/view message)
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;
    console.log("WhatsApp notification URL generated:", whatsappUrl);

    let emailSent = false;

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Assessment Notifications <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Email sent successfully:", data);
        emailSent = true;
      } else {
        const error = await res.text();
        console.error("Resend API error:", error);
      }
    } else {
      console.log("RESEND_API_KEY not configured, skipping email");
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailSent,
      whatsappUrl 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-assessment-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
