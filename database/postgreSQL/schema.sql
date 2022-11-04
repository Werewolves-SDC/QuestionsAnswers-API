-- DROP TABLE IF EXISTS questions CASCADE;
-- DROP TABLE IF EXISTS answers CASCADE;
-- DROP TABLE IF EXISTS answers_photos CASCADE;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body VARCHAR (1000) NOT NULL,
  date_written BIGINT,
  asker_name VARCHAR (60) NOT NULL,
  asker_email VARCHAR (60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  helpful INTEGER DEFAULT 0
);


CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  body VARCHAR (1000),
  date_written BIGINT,
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
-- Import CSV file into tables

\COPY questions FROM 'csv_files/questions.csv' DELIMITER ',' CSV HEADER;

\COPY answers FROM 'csv_files/answers.csv' DELIMITER ',' CSV HEADER;

\COPY answers_photos FROM 'csv_files/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- Alter date column types and reformat

ALTER TABLE questions ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

ALTER TABLE answers ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);
