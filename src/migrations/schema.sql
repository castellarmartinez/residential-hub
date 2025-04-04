CREATE TABLE
  IF NOT EXISTS associations (
    "id" UUID PRIMARY KEY,
    "names" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255)
  );

CREATE TABLE
  IF NOT EXISTS units (
    "id" UUID PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "associationId" UUID,
    FOREIGN KEY ("associationId") REFERENCES associations ("id") ON DELETE SET NULL
  );

CREATE TABLE
  IF NOT EXISTS users (
    "id" UUID PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "names" VARCHAR(255),
    "lastNames" VARCHAR(255)
  );

CREATE TABLE
  IF NOT EXISTS unit_users (
    "userId" UUID REFERENCES users ("id") ON DELETE CASCADE,
    "unitId" UUID REFERENCES units ("id") ON DELETE CASCADE,
    PRIMARY KEY ("userId", "unitId")
  );

CREATE TABLE
  IF NOT EXISTS association_users (
    "userId" UUID REFERENCES users ("id") ON DELETE CASCADE,
    "associationId" UUID REFERENCES associations ("id") ON DELETE CASCADE,
    PRIMARY KEY ("userId", "associationId")
  );