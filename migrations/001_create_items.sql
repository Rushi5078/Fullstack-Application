-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);
