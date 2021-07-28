-- Highlight all of the lines below CREATE TABLES and execute the query.


--------------------- CREATE TABLES ------------------

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "admin" boolean DEFAULT false
);

CREATE TABLE "expansion" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR UNIQUE NOT NULL
);