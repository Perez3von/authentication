DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles;


CREATE TABLE roles(

id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
title TEXT NOT NULL UNIQUE

);


CREATE TABLE users (

    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    hash_password TEXT NOT NULL
   -- role_id BIGINT NOT NULL,
    --FOREIGN KEY (role_id) REFERENCES roles(id)
);



--INSERT INTO roles (title) VALUES ('USER'), ('ADMIN');


