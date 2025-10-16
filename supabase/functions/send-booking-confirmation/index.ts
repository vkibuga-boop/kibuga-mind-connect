import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "vkibuga@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  phone_number: string;
  booking_type: 'therapy' | 'bush_buddies';
  service_name?: string;
  session_format?: string;
  event_title?: string;
  event_date?: string;
  event_time?: string;
  event_location?: string;
  booking_date?: string;
  booking_time?: string;
  price_kes: number;
  price_usd: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();

    let emailSubject = "";
    let emailHtml = "";

    if (booking.booking_type === 'therapy') {
      emailSubject = `New Therapy Session Booking - ${booking.name}`;
      emailHtml = `
        <h2>New Therapy Session Booking</h2>
        <p><strong>Client Details:</strong></p>
        <ul>
          <li>Name: ${booking.name}</li>
          <li>Email: ${booking.email}</li>
          <li>Phone: ${booking.phone_number}</li>
        </ul>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li>Service: ${booking.service_name}</li>
          <li>Format: ${booking.session_format}</li>
          <li>Date: ${booking.booking_date}</li>
          <li>Time: ${booking.booking_time}</li>
          <li>Price: KES ${booking.price_kes} / USD ${booking.price_usd}</li>
        </ul>
      `;
    } else {
      emailSubject = `New Bush Buddies Event Booking - ${booking.name}`;
      emailHtml = `
        <h2>New Bush Buddies Event Booking</h2>
        <p><strong>Participant Details:</strong></p>
        <ul>
          <li>Name: ${booking.name}</li>
          <li>Email: ${booking.email}</li>
          <li>Phone: ${booking.phone_number}</li>
        </ul>
        <p><strong>Event Details:</strong></p>
        <ul>
          <li>Event: ${booking.event_title}</li>
          <li>Date: ${booking.event_date}</li>
          <li>Time: ${booking.event_time}</li>
          <li>Location: ${booking.event_location}</li>
          <li>Price: KES ${booking.price_kes} / USD ${booking.price_usd}</li>
        </ul>
      `;
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mental Health Services <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
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
