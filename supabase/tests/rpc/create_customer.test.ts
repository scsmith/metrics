import { createClient } from "@supabase/supabase-js";

// Create a Supabase client
const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const projectUuid = "9d1f7f2c-5b5c-49c8-926e-7f1ef61b9873";

// Test the create_or_update_customer function
describe("create_or_update_customer", () => {
  let customerId;

  beforeEach(async () => {
    // Clear the customers table before each test
    await supabase.from("customers").delete().eq("project_id", projectUuid);
    expect((
      await supabase.from("customers").select("*").eq("project_id", projectUuid)
    ).data).toHaveLength(0);
  });

  test("Insert a customer with no key, update with same email, and add a key", async () => {
    // Insert a customer with no key
    const { data: customer1, error } = await supabase.rpc("create_or_update_customer", {
      p_project_id: projectUuid,
      p_customer_key: null,
      p_customer_email: "example@example.com",
      p_customer_name: "Name",
      p_custom_data: { custom_field: "custom_value" },
    });
    expect(error).toBeNull();
    customerId = customer1;
    expect(customerId).toHaveLength(36);

    // Update the customer using the same email
    const { data: customer2, error: error2 } = await supabase.rpc("create_or_update_customer", {
      p_project_id: projectUuid,
      p_customer_key: null,
      p_customer_email: "example@example.com",
      p_customer_name: "Update 2",
      p_custom_data: { new_custom_field: "new_custom_value" },
    });
    expect(error2).toBeNull();
    expect(customer2).toHaveLength(36);
    expect(customer2).toBe(customerId);

    // Add a key to the customer
    const { data: customer3, error: error3 } = await supabase.rpc("create_or_update_customer", {
      p_project_id: projectUuid,
      p_customer_key: "test_key",
      p_customer_email: "example@example.com",
      p_customer_name: "Update 3",
      p_custom_data: { new_custom_field: "new_custom_value_3" },
    });
    expect(error3).toBeNull();
    expect(customer3).toHaveLength(36);
    expect(customer3).toBe(customerId);

    // Change the email
    const { data: customer4, error: error4 } = await supabase.rpc("create_or_update_customer", {
      p_project_id: projectUuid,
      p_customer_key: "test_key",
      p_customer_email: "changed@example.com",
      p_customer_name: "Update 3",
      p_custom_data: { new_custom_field: "new_custom_value_3" },
    });
    expect(error4).toBeNull();
    expect(customer4).toHaveLength(36);
    expect(customer4).toBe(customerId);

    // Verify that the customer data is correct
    const { data: customers, error: error5 } = await supabase.from("customers").select("*").eq("id", customerId);
    expect(error5).toBeNull();
    expect(customers).toHaveLength(1);
    const customer = customers[0];
    expect(customer.key).toBe("test_key");
    expect(customer.name).toBe("Update 3");
    expect(customer.email).toBe("changed@example.com");
    expect(customer.custom_data).toStrictEqual({ new_custom_field: "new_custom_value_3" });
  });

  test("Insert a customer then insert another with the same email but uppercase", async () => {
    // Insert a customer with no key
    const { data: customer1, error } = await supabase.rpc("create_or_update_customer", {
      p_project_id: projectUuid,
      p_customer_key: null,
      p_customer_email: "example@example.com",
      p_customer_name: null,
      p_custom_data: null,
    });
    expect(error).toBeNull();
    customerId = customer1;
    expect(customerId).toHaveLength(36);

    // Now insert another customer with the same email but uppercase
    const { data: customer2, error: error2 } = await supabase.rpc("create_or_update_customer", {
      p_project_id: projectUuid,
      p_customer_key: null,
      p_customer_email: "example@example.com".toUpperCase(),
      p_customer_name: null,
      p_custom_data: null,
    });
    expect(error2).toBeNull();
    expect(customer2).toHaveLength(36);
    expect(customer2).toBe(customerId);
  });
});
