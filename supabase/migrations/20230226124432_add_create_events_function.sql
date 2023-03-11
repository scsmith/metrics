CREATE OR REPLACE FUNCTION create_event(
  p_project_id uuid,
  p_customer_key text,
  p_icon text,
  p_key text,
  p_description text,
  p_custom_data jsonb
) RETURNS uuid AS
$$
DECLARE
  v_customer_id uuid;
  v_event_id uuid;
BEGIN
  -- Check that p_project_id is not null
  IF p_project_id IS NULL THEN
    RAISE EXCEPTION 'p_project_id cannot be null';
  END IF;

  -- Check that p_key is not null
  IF p_key IS NULL THEN
    RAISE EXCEPTION 'p_key cannot be null';
  END IF;

  -- Get the customer ID for the given key
  SELECT id INTO v_customer_id FROM customers WHERE key = p_customer_key;

  -- Create the new event with the given parameters
  INSERT INTO events(project_id, customer_id, icon, key, description, custom_data)
  VALUES (p_project_id, v_customer_id, p_icon, p_key, p_description, p_custom_data)
  RETURNING id INTO v_event_id;

  -- Return the ID of the newly created event
  RETURN v_event_id;
END;
$$
LANGUAGE plpgsql;
