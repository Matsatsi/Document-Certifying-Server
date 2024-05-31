--Create postgres certify_doc_db database and connect to it, check if it exists first
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT
      1
    FROM
      pg_database
    WHERE
      datname = 'certify_doc_db') THEN
  CREATE DATABASE certify_doc_db;
END IF;
END
$$;

------------------------------ CREATE TABLES --------------------------
--DROP TABLE IF EXISTS Roles CASCADE;
--DROP TABLE IF EXISTS statuses CASCADE;
--DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS Clients CASCADE;

CREATE TABLE Clients(
  user_id serial PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  phone DECIMAL(13) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  username varchar(10) CHECK (LENGTH(username) >= 5 AND LENGTH(username) <= 10) UNIQUE NOT NULL,
  password varchar(16) NOT NULL,
  registration_date timestamp DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Admins CASCADE;

CREATE TABLE Admins(
  user_id serial PRIMARY KEY,
  user_type varchar(5) NULL DEFAULT 'admin',
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  phone DECIMAL(13) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  username varchar(10) CHECK (LENGTH(username) >= 5 AND LENGTH(username) <= 10) UNIQUE NOT NULL,
  password varchar(16) NOT NULL,
  registration_date timestamp DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Certifiers CASCADE;

CREATE TABLE Certifiers(
  user_id serial PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  phone DECIMAL(13) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  username varchar(10) CHECK (LENGTH(username) >= 5 AND LENGTH(username) <= 10) UNIQUE NOT NULL,
  password varchar(16) NOT NULL,
  registration_date timestamp DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Documents CASCADE;

CREATE TABLE Documents(
  document_id serial PRIMARY KEY,
  client_id int NOT NULL,
  status varchar(30) DEFAULT 'pending',
  copy_file_name varchar(255) NOT NULL,
  original_file_name varchar(255) NOT NULL,
  document_type varchar(255) NOT NULL,
  upload_date timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  end_date timestamp NULL,
  certifier_id int NULL,
  FOREIGN KEY (certifier_id) REFERENCES Certifiers(user_id),
  FOREIGN KEY (client_id) REFERENCES Clients(user_id)
);

DROP TABLE IF EXISTS AdminStats CASCADE;

CREATE TABLE Stats(
  stats_id serial PRIMARY KEY,
  total_users int NOT NULL,
  total_certifiers int NOT NULL,
  total_documents int NOT NULL,
  pending_documents int NOT NULL,
  approved_documents int NOT NULL,
  rejected_documents int NOT NULL
);

DROP TABLE IF EXISTS CertifierStats CASCADE;

CREATE TABLE CertifierStats(
  certifier_stats_id serial PRIMARY KEY,
  certifier_id int NOT NULL,
  total_jobs int NOT NULL,
  average_time int NOT NULL,
  FOREIGN KEY (certifier_id) REFERENCES Clients(user_id)
);

------------------------------ END OF CREATE TABLES ------------------------------
------------------------------ INSERT INTO TABLES ------------------------------
-- Insert into Admins Table
INSERT INTO Admins(user_type, first_name, last_name, phone, email, username, PASSWORD)
  VALUES ('sudo', 'Super', 'Admin', 27795350596, 'sudo@mail.com', 'SuperAdmin', 'sudo123!');

INSERT INTO Admins(first_name, last_name, phone, email, username, PASSWORD)
  VALUES ('Just', 'Admin', 27692248991, 'admin@mail.com', 'JustAdmin', 'admin123!');

-- Insert into Certifiers Table
INSERT INTO Certifiers(first_name, last_name, phone, email, username, PASSWORD)
  VALUES ('John', 'Wick', 27147258369, 'johnw@mail.com', 'JohnWick', 'john123');

INSERT INTO Certifiers(first_name, last_name, phone, email, username, PASSWORD)
  VALUES ('Jane', 'Doe', 27123987456, 'janed@mail.com', 'JaneDoe', 'jane123');

INSERT INTO Certifiers(first_name, last_name, phone, email, username, PASSWORD)
  VALUES ('Jack', 'Sparrow', 27123654789, 'jacks@mail.com', 'JSparrow', 'jack123');

