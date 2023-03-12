CREATE EXTENSION IF NOT EXISTS pgcrypto;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user)
    -- VALUES ('00000000-0000-0000-0000-000000000000', '20052091-1840-4099-aefd-fbfed2fc9d14', 'authenticated', 'authenticated', 'user@example.com', '', NULL, '2023-02-19 15:08:24.955077+00', '04c9b60c27da4d7eb8a02455529fa862aab5f77d45befc90ffcf9d2b', '2023-02-19 15:08:24.955077+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-19 15:08:24.948257+00', '2023-02-19 15:08:24.960456+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);
    VALUES ('00000000-0000-0000-0000-000000000000', '20052091-1840-4099-aefd-fbfed2fc9d14', 'authenticated', 'authenticated', 'user@example.com', '', '2023-02-19 15:10:01.880275+00', '2023-02-19 15:08:24.955077+00', '04c9b60c27da4d7eb8a02455529fa862aab5f77d45befc90ffcf9d2b', '2023-02-19 15:08:24.955077+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-19 15:08:24.948257+00', '2023-02-19 15:08:24.960456+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);
    -- VALUES ('00000000-0000-0000-0000-000000000000', '20052091-1840-4099-aefd-fbfed2fc9d14', 'authenticated', 'authenticated', 'user@example.com', '$2a$10$yHqWM6f1wf98cqQAbm6LiO.h9jEANim5q2YOOWL6TU96cUsMx.fxi', '2023-02-19 15:10:01.880275+00', '2023-02-19 15:08:24.955077+00', '', '2023-02-19 15:08:24.955077+00', '', NULL, '', '', NULL, '2023-02-19 15:10:01.883302+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-19 15:08:24.948257+00', '2023-02-19 15:10:01.892028+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);

--- Create projects
INSERT INTO projects (id, name, key, created_by)
VALUES
  ('a28d53b7-46a8-496a-9d44-1f4632f0b8c1'::uuid, 'CloudMailin', 'e17d5a5e5f5a4c75b01f8ddafc9d9e9a', '20052091-1840-4099-aefd-fbfed2fc9d14'::uuid),
  ('c2f2a77d-4de4-4b3f-bd91-7986c08e6a07'::uuid, 'AttachmentScanner', '648cd858a568484b8768da28ceaa076d', '20052091-1840-4099-aefd-fbfed2fc9d14'::uuid),
  ('15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid, 'Evented', 'a50e37b34a254a93954f23853d3f30f1', '20052091-1840-4099-aefd-fbfed2fc9d14'::uuid),
  ('9d1f7f2c-5b5c-49c8-926e-7f1ef61b9873'::uuid, 'test', '123e4567-e89b-12d3-a456-426655440000', '20052091-1840-4099-aefd-fbfed2fc9d14'::uuid);


-- Create customers
INSERT INTO "public"."customers" ("id", "key", "name", "email", "custom_data", "project_id")
VALUES
    ('c5a9361a-506c-483c-a08b-38f8b573cd9a', 'customer0', 'Steve Smith', 'steve@cloudmailin.com', '{"plan": "pro", "recurring_revenue": 99.99}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    ('c5a9361a-506c-483c-a08b-38f8b573cd9b', 'customer1', 'Alice', 'alice@example.com', '{"plan": "pro", "recurring_revenue": 99.99}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    ('5c5d5e13-3278-44f1-a693-89db7a0356f2', 'customer2', NULL, 'bob@example.com', '{"plan": "basic", "recurring_revenue": 49.99}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), 'customer3', 'Charlie', 'charlie@example.com', '{"plan": "enterprise", "recurring_revenue": 199.99}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), 'customer4', 'David', 'david@example.com', '{"plan": "basic", "recurring_revenue": 49.99}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), 'customer5', 'Eve', 'eve@example.com', '{"plan": "pro", "recurring_revenue": 99.99}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid);

-- Create events
INSERT INTO "public"."events" ("id", "icon", "customer_id", "key", "description", "custom_data", "project_id")
VALUES
    ('1c963b23-15d8-4f2d-9d6f-2a4621bb60b3', '🎉', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'received_revenue', 'Received payment', '{"revenue": 100.0}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    ('4e4af4e4-8b85-4b9c-a9cb-23f8c8c2d2a1', '🔄', '5c5d5e13-3278-44f1-a693-89db7a0356f2', 'plan_change', 'Changed subscription plan', '{"old_plan": "basic", "new_plan": "pro"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    ('3ed3e2ff-47c6-4363-8e38-8ecb39e9b9a7', '📫', NULL, 'address_created', 'Created new address', '{"address": "https://example.com/address1"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    ('2e6f218c-8d99-4c56-9622-5a5cbf8b2425', '📫', NULL, 'address_created', 'Created new address', '{"address": "https://example.com/address2"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    ('7bb9a9f3-16e3-46c1-95e3-cab14002d83a', '📫', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'address_updated', 'Updated address', '{"old_address": "https://example.com/address1", "new_address": "https://example.com/address3"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    ('89334e98-2640-424a-8d12-6f2c1e4dc918', '🚀', NULL, 'domain_added', 'Added new domain', '{"domain": "example.com"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), '🔄', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'plan_change', 'Changed subscription plan', '{"old_plan": "pro", "new_plan": "basic"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), '🎉', '5c5d5e13-3278-44f1-a693-89db7a0356f2', 'received_revenue', 'Received payment', '{"revenue": 50.0}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), '🚀', NULL, 'domain_added', 'Added new domain', '{"domain": "example.org"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), '🔄', 'c5a9361a-506c-483c-a08b-38f8b573cd9a', 'plan_change', 'Changed subscription plan', '{"old_plan": "basic", "new_plan": "enterprise"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid),
    (gen_random_uuid(), '🔄', '5c5d5e13-3278-44f1-a693-89db7a0356f2', 'plan_change', 'Changed subscription plan', '{"old_plan": "pro", "new_plan": "enterprise"}', '15c4d7b9-562c-47ec-a047-6af64c7b0a6c'::uuid);
