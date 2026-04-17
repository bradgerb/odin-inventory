CREATE TABLE IF NOT EXISTS prices (
    price_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    price DECIMAL(10,2)
);
CREATE TABLE IF NOT EXISTS devs (
    dev_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dev_name VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS genres (
    genre_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS games (
    game_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50),
    stock INT,
    price_id INT,
    FOREIGN KEY (price_id) REFERENCES prices(price_id)
);
CREATE TABLE IF NOT EXISTS game_devs (
    game_id INT,
    dev_id INT,
    PRIMARY KEY (game_id, dev_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (dev_id) REFERENCES devs(dev_id)
);
CREATE TABLE IF NOT EXISTS game_genres (
    game_id INT,
    genre_id INT,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);
INSERT INTO prices (price) VALUES
(0.00),
(59.99);
INSERT INTO devs (dev_name) VALUES
('FromSoftware'),
('Game Freak Inc.');
INSERT INTO genres (genre_name) VALUES
('RPG'),
('Strategy'),
('Action'),
('Adventure');
INSERT INTO games (title, stock, price_id) VALUES
('Elden Ring', 5, 2),
('Pokemon Champions', 2, 1),
('Pokemon Scarlet and Violet', 0, 2);
INSERT INTO game_devs (game_id, dev_id) VALUES
(1, 1),
(2, 2),
(3, 2);
INSERT INTO game_genres (game_id, genre_id) VALUES
(1, 1),
(1, 3),
(1, 4),
(2, 2),
(3, 1),
(3, 2),
(3, 4);
