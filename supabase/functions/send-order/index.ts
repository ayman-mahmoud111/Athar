import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_PHONE = "+201014007217";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const {
      customer_name,
      customer_phone,
      customer_email,
      customer_address,
      product_id,
      product_name,
      quantity,
      size,
      color,
      total_price,
      notes,
    } = body;

    // Validate required fields
    if (!customer_name || !customer_phone || !product_id || !product_name || !quantity || !total_price) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save order to database
    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert({
        customer_name,
        customer_phone,
        customer_email,
        customer_address,
        product_id,
        product_name,
        quantity,
        size,
        color,
        total_price,
        notes,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format order message for admin WhatsApp
    const orderMessage = `🛒 *NEW ORDER - ATHAR*
━━━━━━━━━━━━━━━━━━━━━
📦 Order ID: #${order.id.slice(0, 8).toUpperCase()}

👤 *Customer Info:*
   Name: ${customer_name}
   Phone: ${customer_phone}
   ${customer_email ? `Email: ${customer_email}` : ""}
   ${customer_address ? `Address: ${customer_address}` : ""}

👕 *Product:*
   ${product_name}
   Quantity: ${quantity}
   ${size ? `Size: ${size}` : ""}
   ${color ? `Color: ${color}` : ""}

💰 Total: ${total_price} EGP

📝 Notes: ${notes || "None"}
━━━━━━━━━━━━━━━━━━━━━
⏰ ${new Date().toLocaleString("en-EG", { timeZone: "Africa/Cairo" })}`;

    // Create WhatsApp URL for admin
    const adminWhatsAppUrl = `https://wa.me/${ADMIN_PHONE.replace(/\+/g, "")}?text=${encodeURIComponent(orderMessage)}`;

    // Create welcome message for customer
    const customerWhatsAppUrl = `https://wa.me/${customer_phone.replace(/\+/g, "")}?text=${encodeURIComponent(
      `Dear ${customer_name},

Thank you for your order from ATHAR!

Your order has been received successfully.
Order ID: #${order.id.slice(0, 8).toUpperCase()}

We will contact you shortly to confirm your order.

Best regards,
ATHAR Team`
    )}`;

    return new Response(
      JSON.stringify({
        success: true,
        order_id: order.id,
        admin_whatsapp_url: adminWhatsAppUrl,
        customer_whatsapp_url: customerWhatsAppUrl,
        message: "Order saved successfully",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
