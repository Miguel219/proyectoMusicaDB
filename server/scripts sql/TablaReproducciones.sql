
/*******************************************************************************
  Create Playback
********************************************************************************/
DROP TABLE IF EXISTS Playback;

CREATE TABLE Playback (
	PlaybackId SERIAL,
	UserId VARCHAR(120),
	TrackId INTEGER,
	Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PK_Playback PRIMARY KEY (PlaybackId),
	FOREIGN KEY (UserId) REFERENCES Users (UserId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (TrackId) REFERENCES Track (TrackId) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from Playback
