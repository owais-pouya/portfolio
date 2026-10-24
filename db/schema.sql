CREATE TABLE IF NOT EXISTS tasks (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(120) NOT NULL,
  priority   VARCHAR(4)   NOT NULL DEFAULT 'low' CHECK (priority IN ('low','high')),
  created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(200)  NOT NULL,
  message    VARCHAR(2000) NOT NULL,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS messages_email_created ON messages (email, created_at);
