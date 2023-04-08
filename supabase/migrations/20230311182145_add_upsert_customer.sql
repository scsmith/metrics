CREATE OR REPLACE FUNCTION create_or_update_customer(
    p_project_id uuid,
    p_customer_key text,
    p_customer_email text,
    p_customer_name text,
    p_custom_data jsonb
) RETURNS uuid AS $$
DECLARE
    customer_id uuid;
BEGIN
    -- Remove leading and trailing whitespace from p_customer_key and p_customer_email, and treat any number of blank spaces as NULL
    p_customer_key := NULLIF(trim(LOWER(p_customer_key)), '');
    p_customer_email := NULLIF(trim(LOWER(p_customer_email)), '');
    p_customer_name := NULLIF(trim(p_customer_name), '');

    -- Check that either customer_key or customer_email is present and not empty
    IF p_customer_key IS NULL AND p_customer_email IS NULL THEN
        RAISE EXCEPTION 'Either p_customer_key or p_customer_email must be present and not empty';
    END IF;

    -- Check if the customer with the given key or email already exists
    SELECT id INTO customer_id FROM customers WHERE (key <> '' AND key = p_customer_key) OR email = p_customer_email LIMIT 1;

    IF customer_id IS NOT NULL THEN
        -- Update the existing customer with the given ID
        UPDATE customers SET
            key = p_customer_key,
            email = p_customer_email,
            name = p_customer_name,
            custom_data = p_custom_data
        WHERE id = customer_id;
    ELSE
        -- Insert a new customer
        INSERT INTO customers (project_id, key, email, name, custom_data)
        VALUES (p_project_id, p_customer_key, p_customer_email, p_customer_name, p_custom_data)
        RETURNING id INTO customer_id;
    END IF;

    RETURN customer_id;
END;
$$ LANGUAGE plpgsql;
