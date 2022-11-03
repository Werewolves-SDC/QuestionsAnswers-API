CREATE TABLE IF NOT EXISTS questions  (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body VARCHAR (1000) NOT NULL,
  date_written TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW (),
  asker_name VARCHAR (60) NOT NULL,
  asker_email VARCHAR (60) NOT NULL,
  helpful INTEGER DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  body VARCHAR (1000),
  date_written TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  answerer_name VARCHAR (60),
  answerer_email VARCHAR (60),
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE IF NOT EXISTS answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER,
  photo_url TEXT,
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);