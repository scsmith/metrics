// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.10";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { eventHandler } from "./eventHandler.ts";
import { customerHandler } from "./customerHandler.ts";


const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

serve(async (req: Request) => {
  console.log(req.url);
  const pattern = new URLPattern({ pathname: "/apiv1/:resource{/:id}?{/}?" });
  const match = pattern.exec(req.url);
  const resource = match?.pathname.groups.resource;
  const id = match?.pathname.groups.id;
  console.log(resource);
  console.log(id);

  switch (resource) {
    case "events":
      return await eventHandler(req, id, supabaseAdmin);
    case "customers":
      return await customerHandler(req, id, supabaseAdmin);
    default:
      return new Response(
        JSON.stringify({ error: "Unknown Route", resource, id }),
        { headers: { "Content-Type": "application/json" }, status: 404 },
      );
  }
});

const CustomerHandler = async (req: Request, id: string, supabaseAdmin: SupabaseClient) => {
  return new Response(
    JSON.stringify({ error: "Event", id }),
    { headers: { "Content-Type": "application/json" }, status: 201 },
  );
};

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"customer_key":"abc123","key":"event_key","icon":"event_icon","description":"event_description","custom_data":{"key1":"value1","key2":"value2"}}'
