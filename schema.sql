CREATE DATABASE seinfeld_db;
USE seinfeld_db;

CREATE TABLE actors
(
id int auto_increment,
name varchar(30) NOT NULL,
coolness_points int,
attitudes int,
primary key (id)
);
DROP TABLE actors;

INSERT INTO actors
VALUES (1,'Morgan Freeman', 50, 96),
(2,'Leonardo DiCaprio', 75, 94),
(3,'Scarlett Johansson', 72, 94),
(4,'Jennifer Lawrence',98, 91);

SELECT * from actors;
