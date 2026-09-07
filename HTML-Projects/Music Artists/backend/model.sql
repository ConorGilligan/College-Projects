PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;




CREATE TABLE artists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  genre TEXT NOT NULL,
  listeners INTEGER NOT NULL
);






CREATE TABLE albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  listens INTEGER NOT NULL,
  artist_id INTEGER NOT NULL,
  FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);







CREATE TABLE songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  album_id INTEGER NOT NULL,
  FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);







INSERT INTO artists (name, genre, listeners) VALUES
('Bruno Mars', 'Pop', 50000000),
('KSI', 'Rap', 600000);








INSERT INTO albums (name, year, listens, artist_id) VALUES
('24K Magic', 2016, 1500000, 1),
('Doo-Wops & holigans', 2010, 1200000, 1),
('Unorthodox Jukebox', 2012, 1100000, 1),
('Dissmulation', 2020, 800000, 2),
('All Over The place', 2021, 700000, 2);







INSERT INTO songs (name, year, album_id) VALUES
('24K Magic', 2016, 1),
('That''s What i Like', 2016, 1),
('Grenade', 2010, 2),
('Just The Way You Are', 2010, 2),
('Locked Out of Heaven', 2012, 3),
('When I Sse You smile', 2020, 4),
('Grenade 2', 2020, 4),
('Rain', 2021, 5),
('Not Over Yet', 2021, 5),
('Gang Gang Baby', 2021, 5);