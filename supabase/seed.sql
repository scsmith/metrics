CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create customers
INSERT INTO "public"."customers" ("id", "key", "name", "email", "custom_data")
VALUES
    ('c5a9361a-506c-483c-a08b-38f8b573cd9a', 'customer0', 'Steve Smith', 'steve@cloudmailin.com', '{"plan": "pro", "recurring_revenue": 99.99}'),
    ('c5a9361a-506c-483c-a08b-38f8b573cd9b', 'customer1', 'Alice', 'alice@example.com', '{"plan": "pro", "recurring_revenue": 99.99}'),
    ('5c5d5e13-3278-44f1-a693-89db7a0356f2', 'customer2', NULL, 'bob@example.com', '{"plan": "basic", "recurring_revenue": 49.99}'),
    (gen_random_uuid(), 'customer3', 'Charlie', 'charlie@example.com', '{"plan": "enterprise", "recurring_revenue": 199.99}'),
    (gen_random_uuid(), 'customer4', 'David', 'david@example.com', '{"plan": "basic", "recurring_revenue": 49.99}'),
    (gen_random_uuid(), 'customer5', 'Eve', 'eve@example.com', '{"plan": "pro", "recurring_revenue": 99.99}');

-- Create events
INSERT INTO "public"."events" ("id", "icon", "customer_id", "key", "description", "custom_data")
VALUES
    ('1c963b23-15d8-4f2d-9d6f-2a4621bb60b3', '🎉', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'received_revenue', 'Received payment', '{"revenue": 100.0}'),
    ('4e4af4e4-8b85-4b9c-a9cb-23f8c8c2d2a1', '🔄', '5c5d5e13-3278-44f1-a693-89db7a0356f2', 'plan_change', 'Changed subscription plan', '{"old_plan": "basic", "new_plan": "pro"}'),
    ('3ed3e2ff-47c6-4363-8e38-8ecb39e9b9a7', '📫', NULL, 'address_created', 'Created new address', '{"address": "https://example.com/address1"}'),
    ('2e6f218c-8d99-4c56-9622-5a5cbf8b2425', '📫', NULL, 'address_created', 'Created new address', '{"address": "https://example.com/address2"}'),
    ('7bb9a9f3-16e3-46c1-95e3-cab14002d83a', '📫', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'address_updated', 'Updated address', '{"old_address": "https://example.com/address1", "new_address": "https://example.com/address3"}'),
    ('89334e98-2640-424a-8d12-6f2c1e4dc918', '🚀', NULL, 'domain_added', 'Added new domain', '{"domain": "example.com"}'),
    (gen_random_uuid(), '🔄', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'plan_change', 'Changed subscription plan', '{"old_plan": "pro", "new_plan": "basic"}'),
    (gen_random_uuid(), '🎉', '5c5d5e13-3278-44f1-a693-89db7a0356f2', 'received_revenue', 'Received payment', '{"revenue": 50.0}'),
    (gen_random_uuid(), '🚀', NULL, 'domain_added', 'Added new domain', '{"domain": "example.org"}'),
    (gen_random_uuid(), '🔄', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'plan_change', 'Changed subscription plan', '{"old_plan": "basic", "new_plan": "enterprise"}'),
    (gen_random_uuid(), '🔄', '5c5d5e13-3278-44f1-a693-89db7a0356f2', 'plan_change', 'Changed subscription plan', '{"old_plan": "pro", "new_plan": "enterprise"}');
