import { SupabaseClient } from "@supabase/supabase-js";
import { isEmail } from "https://deno.land/x/validate_patoui@v0.4.1/mod.ts";

export const customerHandler = async (req: Request, id: string | undefined, supabaseAdmin: SupabaseClient) => {
  const { customer_key, customer_name, customer_email, custom_data }: {
    customer_key?: string,
    customer_name?: string,
    customer_email: string,
    custom_data: object;
  } = await req.json();

  // Check that either customer_key or customer_email is present
  if (!customer_email || !isEmail(customer_email)) {
    return new Response(
      JSON.stringify({ error: 'Email must be valid' }),
      { headers: { "Content-Type": "application/json" }, status: 422 }
    );
  }

  // Call the upsert_customer function using the Supabase client
  let { data, error } = await supabaseAdmin
    .rpc('create_or_update_customer', {
      p_project_id: '15c4d7b9-562c-47ec-a047-6af64c7b0a6c',
      p_customer_key: customer_key,
      p_customer_name: customer_name,
      p_customer_email: customer_email,
      p_custom_data: custom_data,
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
    { headers: { "Content-Type": "application/json" }, status: 201 },
  );
};
