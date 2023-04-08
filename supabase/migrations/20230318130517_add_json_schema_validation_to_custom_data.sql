CREATE EXTENSION IF NOT EXISTS "pg_jsonschema";

DO $$
DECLARE
  my_variable varchar;
BEGIN
  my_variable := '
    {
      "$schema": "https://json-schema.org/draft/2020-12/schema#",
      "type": "object",
      "additionalProperties": {
        "anyOf": [
          { "type": "string", "maxLength": 40 },
          { "type": "string", "format": "date-time" },
          { "type": "string", "format": "date" },
          { "type": "integer" },
          { "type": "number", "format": "float" },
          { "type": "boolean" }
        ],
        "not": { "type": "object" }
      }
    }
    ';

  EXECUTE format('ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_data_check" CHECK (jsonb_matches_schema(%L, custom_data))', my_variable);
  EXECUTE format('ALTER TABLE "public"."events" ADD CONSTRAINT "events_data_check" CHECK (jsonb_matches_schema(%L, custom_data))', my_variable);

END $$ LANGUAGE plpgsql;
