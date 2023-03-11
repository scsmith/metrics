create table "public"."events" (
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid not null,
    "customer_id" uuid,
    "icon" text,
    "key" text not null,
    "description" text,
    "custom_data" jsonb,
    "created_at" timestamp with time zone default now()
);


-- alter table "public"."events" enable row level security;

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."events" add constraint "events_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id);

alter table "public"."events" add constraint "events_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id);

alter table "public"."events" validate constraint "events_customer_id_fkey";
