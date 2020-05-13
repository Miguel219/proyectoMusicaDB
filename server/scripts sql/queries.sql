- REGISTRO DE ARTISTAS: -
SELECT COUNT(*)
FROM Artist;

- REGISTRO DE ÁLBUMES: - 
SELECT * 
FROM Album

- REGISTRO DE CANCIONES: - 
SELECT *
FROM Track

- INACTIVAR CANCIONES DE CATÁLOGO: -
SELECT *
FROM Track
WHERE Name <> 'Nombre de la canción'

- MODIFICAR DATOS DE CANCIÓN: -
UPDATE Track
SET \\Lo que se quiere actualizar
WHERE TrackId = \\id de la track

- MODIFICAR DATOS DE ÁLBUM: -
UPDATE Album
SET \\Lo que se quiere actualizar
WHERE AlbumId = \\id del album

- MODIFICAR DATOS DE ARTISTA: -
UPDATE Artist
SET \\Lo que se quiere actualizar
WHERE ArtistId = \\id del artista

- ELIMINAR UN CANCIÓN: -
DELETE FROM Track 
WHERE TrackId = \\id de la cancion

- ELIMINAR UN ÁLBUM: -
DELETE FROM Album 
WHERE AlbumId = \\id del álbum

- ELIMINAR UN ARTISTA: -
DELETE FROM Artist 
WHERE ArtistId = \\id del artista 





*** MÓDULO DE REPORTERÍA: ***





- ARTITAS POR GÉNERO: -
SELECT DISTINCT R.artistName, R.genreName
FROM (SELECT AR.Name as artistName, 
	  G.Name AS genreName 
	  FROM Track T
	  LEFT JOIN Album AL ON T.AlbumId = AL.AlbumId
	  LEFT JOIN Genre G ON T.GenreId = G.GenreId
	  LEFT JOIN Artist AR ON AL.ArtistId = AR.ArtistId) AS R
GROUP BY R.artistName, R.genreName
ORDER BY R.genreName ASC

- CANTIDAD DE ARTISTAS POR GÉNERO: -
SELECT DISTINCT COUNT(R.artistName), R.genreName
FROM (SELECT AR.Name as artistName, 
	  G.Name AS genreName 
	  FROM Track T
	  LEFT JOIN Album AL ON T.AlbumId = AL.AlbumId
	  LEFT JOIN Genre G ON T.GenreId = G.GenreId
	  LEFT JOIN Artist AR ON AL.ArtistId = AR.ArtistId) AS R
GROUP BY R.genreName
ORDER BY R.genreName ASC

- GENEROS CON MÁS CANCIONES: -
SELECT G.Name AS Género, 
        COUNT(T.TrackId) as CantidadCanciones
FROM Track T 
JOIN Genre G ON G.GenreId = T.GenreId
GROUP BY G.GenreId
ORDER BY COUNT(T.TrackId) DESC

- CANCIÓN CON MAYOR DURACIÓN CON INFO. DE ARTISTAS: -
SELECT DISTINCT R.trackName, R.Title, R.artistName, R.genreName, MAX(R.duration)
FROM (SELECT T.Name AS trackName, 
	  AR.Name as artistName, 
	  AL.Title, 
	  G.Name AS genreName, 
	  T.Milliseconds/60000 AS duration,
	  ROW_NUMBER() OVER(PARTITION BY AR.Name ORDER BY T.Milliseconds DESC)rn
	  FROM Track T
	  LEFT JOIN Album AL ON T.AlbumId = AL.AlbumId
	  LEFT JOIN Genre G ON T.GenreId = G.GenreId
	  LEFT JOIN Artist AR ON AL.ArtistId = AR.ArtistId) AS R
WHERE rn = 1
GROUP BY R.trackName, 
        R.Title, 
        R.artistName, 
        R.genreName
ORDER BY MAX(R.duration) DESC

- USUSARIOS QUE HAN REGISTRADO MÁS CANCIONES: -

- DURACIÓN PROMEDIO DE CANCIONES SEGÚN EL GÉNERO: -
SELECT G.Name AS Género, 
        (AVG(T.Milliseconds)/60000) as DuracionPromedio
FROM Track T 
JOIN Genre G ON G.GenreId = T.GenreId
GROUP BY G.GenreId
ORDER BY AVG(T.Milliseconds) DESC

- ARTISTAS CON MÁS ÁLBUMES: -
SELECT AR.Name, COUNT(AL.Title)
FROM Album AL 
JOIN Artist AR ON AL.ArtistId = AR.ArtistId
GROUP BY AR.Name
ORDER BY COUNT(AL.Title) DESC

- ÁLBUMES MÁS RECIENTES: -

- ARTISTAS MÁS COLABORATIVOS: -





*** QUERIES DE PERMISOS ***




- AGREGAR TRACK: -
INSER INTO Track VALUES (TrackId, Name, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitePrice)


- AGREGAR ALBUM: -
INSERT INTO Album VALUES (AlbumId, Title, ArtistId)

- AGREGAR ARTIST: -
INSERT INTO Artist VALUES (ArtistId, Name)

- AGREGAR EMPLOYEE: -
INSERT INTO Employee VALUES (EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, Address, City, State, Country, PostalCode, Phone, Fax, Email)

- AGREGAR GENRE: -
INSERT INTO Genre (GenreId, Name) VALUES ()

- MEDIA TYPE: -
INSERT INTO MediaType (MediaTypeId, Name) VALUES ()

- AGREGAR INVOICE: -
INSERT INTO Invoice (InvoiceId, CustomerId, InvoiceDate, BillingAddress, BillingCity, BillingState, BillingCountry, BillingPostalCode, Total) VALUES ()

- AGREGAR INVOICELINE: -
INSERT INTO InvoiceLine (InvoiceLineId, InvoiceId, TrackId, UnitPrice, Quantity) VALUES ()

- AGREGAR PLAYLIST TRACK: -
INSERT INTO PlaylistTrack (PlaylistId, TrackId) VALUES ()

