import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "portfolio@resend.dev";
const TO_EMAIL = Deno.env.get("TO_EMAIL") ?? "vantakulokesh908@gmail.com";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured. The site owner needs to set the RESEND_API_KEY secret." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json() as Partial<ContactPayload>;

    // Server-side validation (never trust client input alone)
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || name.length > 200) {
      return new Response(JSON.stringify({ error: "A valid name is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: "A valid email address is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!subject || subject.length > 300) {
      return new Response(JSON.stringify({ error: "A subject is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!message || message.length < 10 || message.length > 5000) {
      return new Response(JSON.stringify({ error: "Message must be 10–5000 characters." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailHtml = `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #4f46e5; margin-bottom: 24px;">New Portfolio Contact Message</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: 600; color: #334155; width: 100px;">Name:</td><td style="padding: 8px 0; color: #475569;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #334155;">Email:</td><td style="padding: 8px 0; color: #475569;">${email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #334155;">Phone:</td><td style="padding: 8px 0; color: #475569;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #334155;">Subject:</td><td style="padding: 8px 0; color: #475569;">${subject}</td></tr>
        </table>
        <h3 style="color: #334155; margin-top: 24px; margin-bottom: 8px;">Message</h3>
        <div style="background: #f8fafc; border-radius: 12px; padding: 16px; color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">Sent from your portfolio website contact form.</p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: email,
        subject: `Portfolio Contact: ${subject}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("Resend API error:", resendResponse.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to send email. Please try again later." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
