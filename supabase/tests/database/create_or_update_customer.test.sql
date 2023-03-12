-- Test the create_or_update_customer function
BEGIN;
select plan( 1 );

select function_returns( 'create_or_update_customer', 'uuid' );

SELECT create_or_update_customer('project_uuid', 'test_key', 'test_email', 'test_name', '{"custom_field": "custom_value"}') AS id INTO customer_id;
SELECT is_not_null(customer_id) AS 'Insert customer should succeed';

SELECT is('test_key'::text, (SELECT key FROM customers WHERE email = 'test_email'::text)) AS 'Customer key should match';
SELECT is('test_email'::text, (SELECT email FROM customers WHERE key = 'test_key'::text)) AS 'Customer email should match';
SELECT is('test_name'::text, (SELECT name FROM customers WHERE key = 'test_key'::text)) AS 'Customer name should match';
SELECT is('{"custom_field": "custom_value"}'::jsonb, (SELECT custom_data FROM customers WHERE key = 'test_key'::text)) AS 'Customer custom data should match';


select * from finish();
ROLLBACK;
