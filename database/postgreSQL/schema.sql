-- DROP TABLE IF EXISTS questions CASCADE;
-- DROP TABLE IF EXISTS answers CASCADE;
-- DROP TABLE IF EXISTS answers_photos CASCADE;

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR (1000) NOT NULL,
  question_date BIGINT,
  asker_name VARCHAR (60) NOT NULL,
  asker_email VARCHAR (60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  question_helpfulness INTEGER DEFAULT 0
);


CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  body VARCHAR (1000),
  date BIGINT,
  answerer_name VARCHAR (60),
  answerer_email VARCHAR (60),
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  helpfulness INTEGER DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions (question_id)
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

ALTER TABLE questions ALTER COLUMN question_date TYPE TIMESTAMP USING to_timestamp(question_date/1000);

ALTER TABLE answers ALTER COLUMN date TYPE TIMESTAMP USING to_timestamp(date/1000);

-- Get last ID #
-- SELECT MAX(question_id) FROM questions
-- SELECT MAX(id) FROM answers
-- SELECT MAX(id) FROM answers_photos

-- Restart sequence #

-- ALTER SEQUENCE questions_question_id_seq RESTART WITH 3518964

-- ALTER SEQUENCE answers_id_seq RESTART WITH 6879307

-- ALTER SEQUENCE answers_photos_id_seq RESTART WITH 2063760

-- Index
-- CREATE INDEX product_id_index
-- ON questions(product_id);