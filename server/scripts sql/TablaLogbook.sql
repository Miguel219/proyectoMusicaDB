
/*******************************************************************************
  Ceate LogBook
********************************************************************************/
DROP TABLE IF EXISTS LogBook;
--LogType insert, update, delete
--ObjectType artist, album, playlist y track.
CREATE TABLE LogBook (
	LogId SERIAL,
	LogType VARCHAR(30),
	UserId VARCHAR(120) DEFAULT 'adminMusic@gmail.com',
	ObjectType VARCHAR(30),
	ObjectId INTEGER,
	DateModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PK_LogBook PRIMARY KEY (LogId),
	FOREIGN KEY (UserId) REFERENCES Users (UserId) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/*******************************************************************************
  Ceate trigger
********************************************************************************/
-- ARTIST TRIGGERS
CREATE OR REPLACE FUNCTION log_changing_artist()
  RETURNS trigger AS
$$
BEGIN
  INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
  VALUES ('update', OLD.userId, 'artist', OLD.ArtistId);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS changing_artist ON Artist;

CREATE TRIGGER changing_artist
  BEFORE UPDATE
  ON Artist
  FOR EACH ROW
  EXECUTE PROCEDURE log_changing_artist();

CREATE OR REPLACE FUNCTION log_adding_artist()
  RETURNS trigger AS
$$
BEGIN
  INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
  VALUES ('insert', NEW.UserId, 'artist',  NEW.ArtistId);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS adding_artist ON Artist;

CREATE TRIGGER adding_artist
  BEFORE INSERT
  ON Artist
  FOR EACH ROW
  EXECUTE PROCEDURE log_adding_artist();

CREATE OR REPLACE FUNCTION log_removing_artist()
  RETURNS trigger AS
$$
BEGIN
  INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
  VALUES ('delete', OLD.userId, 'artist', OLD.ArtistId);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS removing_artist ON Artist;

CREATE TRIGGER removing_artist
  BEFORE DELETE
  ON Artist
  FOR EACH ROW
  EXECUTE PROCEDURE log_removing_artist();


-- ALBUM TRIGGERS
CREATE OR REPLACE FUNCTION log_changing_album()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
		VALUES ('update', OLD.userId, 'album', OLD.AlbumId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS changing_album ON Album;

CREATE TRIGGER changing_album
	BEFORE UPDATE
	ON Album
	FOR EACH ROW
	EXECUTE PROCEDURE log_changing_album();

CREATE OR REPLACE FUNCTION log_adding_album()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
		VALUES ('insert', NEW.UserId, 'album', NEW.AlbumId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS adding_album ON Album;

CREATE TRIGGER adding_album
	AFTER INSERT
	ON Album
	FOR EACH ROW
	EXECUTE PROCEDURE log_adding_album();

CREATE OR REPLACE FUNCTION log_removing_album()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
		VALUES ('delete', OLD.userId, 'album', OLD.AlbumId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS removing_album ON Album;

CREATE TRIGGER removing_album
AFTER DELETE
ON Album
FOR EACH ROW
EXECUTE PROCEDURE log_removing_album();


-- GENRE TRIGGERS
CREATE OR REPLACE FUNCTION log_changing_genre()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
		VALUES ('update', 'genre', OLD.GenreId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS changing_genre ON Genre;

CREATE TRIGGER changing_genre
	BEFORE UPDATE
	ON Genre
	FOR EACH ROW
	EXECUTE PROCEDURE log_changing_genre();

CREATE OR REPLACE FUNCTION log_adding_genre()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
		VALUES ('insert', 'genre', NEW.GenreId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS adding_genre ON Genre;

CREATE TRIGGER adding_genre
	BEFORE INSERT
	ON Genre
	FOR EACH ROW
	EXECUTE PROCEDURE log_adding_genre();

CREATE OR REPLACE FUNCTION log_removing_genre()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
		VALUES ('delete', 'genre', OLD.GenreId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS removing_genre ON Genre;

CREATE TRIGGER removing_genre
	BEFORE DELETE
	ON Genre
	FOR EACH ROW
	EXECUTE PROCEDURE log_removing_genre();


-- MEDIATYPE TRIGGERS
CREATE OR REPLACE FUNCTION log_changing_mediatype()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
    VALUES ('update', 'mediatype', OLD.MediaTypeId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS changing_mediatype ON MediaType;

CREATE TRIGGER changing_mediatype
	BEFORE UPDATE
	ON MediaType
	FOR EACH ROW
	EXECUTE PROCEDURE log_changing_mediatype();

CREATE OR REPLACE FUNCTION log_adding_mediatype()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
    VALUES ('insert', 'mediatype', NEW.MediaTypeId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS adding_mediatype ON MediaType;

CREATE TRIGGER adding_mediatype
	BEFORE INSERT
	ON MediaType
	FOR EACH ROW
	EXECUTE PROCEDURE log_adding_mediatype();

CREATE OR REPLACE FUNCTION log_removing_mediatype()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
    VALUES ('delete', 'mediatype', OLD.MediaTypeId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS removing_mediatype ON MediaType;

CREATE TRIGGER removing_mediatype
	BEFORE DELETE
	ON MediaType
	FOR EACH ROW
  EXECUTE PROCEDURE log_removing_mediatype();


-- TRACK TRIGGERS
CREATE OR REPLACE FUNCTION log_changing_track()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
		VALUES ('update', OLD.userId, 'track', OLD.TrackId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS changing_track ON Track;

CREATE TRIGGER changing_track
	AFTER UPDATE
	ON Track
	FOR EACH ROW
	EXECUTE PROCEDURE log_changing_track();

CREATE OR REPLACE FUNCTION log_adding_track()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
		VALUES ('insert', NEW.UserId, 'track', NEW.TrackId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS adding_track ON Track;

CREATE TRIGGER adding_track
	BEFORE INSERT
	ON Track
	FOR EACH ROW
	EXECUTE PROCEDURE log_adding_track();

CREATE OR REPLACE FUNCTION log_removing_track()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, UserId, ObjectType, ObjectId)
		VALUES ('delete', OLD.userId, 'track', OLD.TrackId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS removing_track ON Track;

CREATE TRIGGER removing_track
	BEFORE DELETE
	ON Track
	FOR EACH ROW
	EXECUTE PROCEDURE log_removing_track();


-- PLAYLIST TRIGGERS
CREATE OR REPLACE FUNCTION log_changing_playlist()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
		VALUES ('update', 'playlist', OLD.PlaylistId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS changing_playlist ON Playlist;

CREATE TRIGGER changing_playlist
	BEFORE UPDATE
	ON Playlist
	FOR EACH ROW
	EXECUTE PROCEDURE log_changing_playlist();

CREATE OR REPLACE FUNCTION log_adding_playlist()
	RETURNS trigger AS
$$
BEGIN
		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
		VALUES ('insert', 'playlist', NEW.PlaylistId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS adding_playlist ON Playlist;

CREATE TRIGGER adding_playlist
	BEFORE INSERT
	ON Playlist
	FOR EACH ROW
	EXECUTE PROCEDURE log_adding_playlist();

  CREATE OR REPLACE FUNCTION log_removing_playlist()
  	RETURNS trigger AS
  $$
  BEGIN
  		INSERT INTO LogBook (LogType, ObjectType, ObjectId)
  		VALUES ('delete', 'playlist', OLD.PlaylistId);
      RETURN NEW;
  END;

  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS removing_playlist ON Playlist;

  CREATE TRIGGER removing_playlist
  	BEFORE DELETE
  	ON Playlist
  	FOR EACH ROW
  	EXECUTE PROCEDURE log_removing_playlist();
