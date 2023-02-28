create table "public"."projects" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "key" text not null,
    "created_by" uuid references auth.users not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);
