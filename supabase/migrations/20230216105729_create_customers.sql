--- Email can never be null but the key can be, if the key is specified though it sticks
create table "public"."customers" (
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid not null,
    "key" text,
    "name" text,
    "email" text not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "custom_data" jsonb
);

-- alter table "public"."customers" enable row level security;

CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (id);
CREATE INDEX customers_project_id_idx ON public.customers USING btree (project_id);
CREATE UNIQUE INDEX customers_key_project_id_idx ON public.customers(project_id, key) WHERE key IS NOT NULL;
CREATE UNIQUE INDEX customers_email_project_id_idx ON public.customers(project_id, email);

CREATE INDEX customers_key ON public.customers(key) WHERE key IS NOT NULL;
CREATE INDEX customers_email ON public.customers(email);

-- Add foreign key constraint to the projects table
alter table "public"."customers" add constraint "customers_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id);

alter table "public"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";
