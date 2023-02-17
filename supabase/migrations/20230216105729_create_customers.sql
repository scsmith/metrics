create table "public"."customers" (
    "id" uuid not null default uuid_generate_v4(),
    "key" text not null,
    "name" text,
    "email" text,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "custom_data" jsonb
);


-- alter table "public"."customers" enable row level security;

CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (id);
CREATE UNIQUE INDEX customers_key ON public.customers(key);

alter table "public"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";
