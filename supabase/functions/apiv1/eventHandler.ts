import { SupabaseClient } from "@supabase/supabase-js";

export const eventHandler = async (req: Request, id: string | undefined, supabaseAdmin: SupabaseClient) => {
  const { key, icon, description, custom_data, customer_key }: {
    customer_key: string,
    key: string,
    icon: string,
    description: string,
    custom_data: object;
  } = await req.json();

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
    { headers: { "Content-Type": "application/json" }, status: 201 },
  );
};
