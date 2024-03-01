
CREATE TABLE if not exists users (
  sub UUID PRIMARY KEY,
  txn VARCHAR(255),
  given_name VARCHAR(255),
  family_name VARCHAR(255),
  gender VARCHAR(255),
  birthdate VARCHAR(255),
  zoneinfo VARCHAR(255),
  locale VARCHAR(255),
  phone_number VARCHAR(255),
  updated_at BIGINT,
  name VARCHAR(255),
  email VARCHAR(255),
  scope VARCHAR(2048)
);

CREATE TABLE if not exists auth (
  sub UUID PRIMARY KEY,
  access_token VARCHAR(2048),
  token_type VARCHAR(255),
  expires_in INT,
  refresh_token VARCHAR(2048),
  created_at BIGINT
);
