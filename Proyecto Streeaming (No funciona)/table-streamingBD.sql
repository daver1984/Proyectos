CREATE DATABASE streaming_app;
USE streaming_app;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'standard') DEFAULT 'standard'
);

CREATE TABLE Content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('movie', 'series') NOT NULL,
    url VARCHAR(255) NOT NULL
);

-- Insertar usuarios de prueba
INSERT INTO Users (username, password, role) VALUES 
('admin', 'hashed_password_admin', 'admin'),
('user1', 'hashed_password_user1', 'standard'),
('user2', 'hashed_password_user2', 'standard');

-- Insertar contenido de prueba
INSERT INTO Content (title, description, type, url) VALUES 
('Inception', 'A mind-bending thriller by Christopher Nolan.', 'movie', 'http://example.com/inception'),
('The Matrix', 'A sci-fi classic that challenges reality.', 'movie', 'http://example.com/the-matrix'),
('Stranger Things', 'A series about the supernatural happenings in Hawkins.', 'series', 'http://example.com/stranger-things');
