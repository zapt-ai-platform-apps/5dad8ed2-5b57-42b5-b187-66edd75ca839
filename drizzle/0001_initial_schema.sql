CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  session_number INT NOT NULL CHECK (session_number BETWEEN 1 AND 6),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id, session_number)
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  session_number INT NOT NULL CHECK (session_number BETWEEN 1 AND 6),
  description TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE actions (
  id SERIAL PRIMARY KEY,
  goal_id INT REFERENCES goals(id),
  description TEXT NOT NULL,
  due_date DATE,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);