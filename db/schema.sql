DROP DATABASE IF EXISTS marvel;
CREATE DATABASE marvel;

USE marvel;

CREATE TABLE team (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE hero (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
code_name VARCHAR (30) NOT NULL,
team_id INT UNSIGNED NOT NULL,
INDEX t_ind (team_id),
CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES team(id) ON DELETE CASCADE
);