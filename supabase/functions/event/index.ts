// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

serve(async (req: Request) => {
  const { key, icon, description, custom_data, customer_key }: {
    customer_key: string,
    key: string,
    icon: string,
    description: string,
    custom_data: object;
  } = await req.json();

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  let { data, error } = await supabaseAdmin
    .rpc('create_event', {
      p_project_id: '15c4d7b9-562c-47ec-a047-6af64c7b0a6c',
      p_customer_key: customer_key,
      p_custom_data: custom_data,
      p_description: description,
      p_icon: icon,
      p_key: key,
    });

  if (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ error: error }),
      { headers: { "Content-Type": "application/json" }, status: 422 },
    );
  }
  else console.log(data);

  return new Response(
    JSON.stringify({ id: data }),
    { headers: { "Content-Type": "application/json" } },
  );
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"customer_key":"abc123","key":"event_key","icon":"event_icon","description":"event_description","custom_data":{"key1":"value1","key2":"value2"}}'
