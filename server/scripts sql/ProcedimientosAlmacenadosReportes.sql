--PROCEDIMIENTOS ALMACENADOS

-- Total de ventas por semana dado un rango de fechas a ser ingresado por el usuario

CREATE OR REPLACE FUNCTION totalSalesByWeek(dateStart Timestamp,dateEnd Timestamp)
    RETURNS TABLE(
					weekstart DATE,
                    weekend DATE,
					weektotal NUMERIC,
					weektotaltracks BIGINT)
AS $$
	
	DECLARE

	BEGIN

		IF(dateStart>dateEnd) THEN
			RAISE EXCEPTION 'Las fechas enviadas no son válidas.'
			USING HINT = 'La fecha start debe ser menos a la fecha end.';
		END IF;
		RETURN QUERY
		select d.first_day_of_week as weekStart,d.last_day_of_week as weekEnd,sum(total) as weektotal,count(il.trackid) as weektotaltracks
		from invoice i 
		inner join invoiceline il on il.invoiceid = i.invoiceid
		inner join dates d on d.date_actual=DATE(i.invoicedate)
		where i.invoicedate between dateStart and dateEnd
		group by d.first_day_of_week,d.last_day_of_week
		order by sum(total) DESC;
	END
$$ LANGUAGE plpgsql;

select * from artistSalesBetweenTwoDates(1,'2020-05-18','2020-05-20')

-- Los N artistas con las mayores ventas para un rango de fechas a ser ingresado por el
--usuario. La cantidad de artistas N a mostrar también debe ser ingresada por el usuario

CREATE OR REPLACE FUNCTION artistSalesBetweenTwoDates(limitArtist INT ,dateStart Timestamp,dateEnd Timestamp)
    RETURNS TABLE(
					artistid INTEGER,
                    artistname VARCHAR,
					trackcount BIGINT)
AS $$
	
	DECLARE

	BEGIN
		IF(limitArtist<0) THEN
			RAISE EXCEPTION 'El limite no puede ser negativo %.', limitArtist 
			USING HINT = 'Revisar el limite enviado.';
		END IF;
		IF(dateStart>dateEnd) THEN
			RAISE EXCEPTION 'Las fechas enviadas no son válidas.'
			USING HINT = 'La fecha start debe ser menos a la fecha end.';
		END IF;
		RETURN QUERY
		select ar.artistid,ar.name as artistname, count(il.trackid) as trackcount
		from invoice i
		inner join invoiceline il on i.invoiceid = il.invoiceid
		inner join track t on t.trackid=il.trackid
		inner join album a on a.albumid = t.albumid
		inner join artist ar on ar.artistid = a.artistid
		where i.invoicedate between dateStart and  dateEnd
		group by ar.artistid
		order by count(il.trackid) DESC
		limit limitArtist;
	END
$$ LANGUAGE plpgsql;

select * from totalSalesByWeek('2020-05-18','2020-05-20')


--Total de ventas por género para un rango de fechas a ser ingresado por el usuario
CREATE OR REPLACE FUNCTION genreSalesBetweenTwoDates(dateStart Timestamp,dateEnd Timestamp)
    RETURNS TABLE(
					genreid INTEGER,
                    genrename VARCHAR,
					trackcount BIGINT)
AS $$
	
	DECLARE

	BEGIN

		IF(dateStart>dateEnd) THEN
			RAISE EXCEPTION 'Las fechas enviadas no son válidas.'
			USING HINT = 'La fecha start debe ser menos a la fecha end.';
		END IF;
		RETURN QUERY
		(select g.genreid,g.name as genrename,count(il.trackid) as trackcount
		from invoice i
		inner join invoiceline il on il.invoiceid=i.invoiceid
		inner join track t on il.trackid= t.trackid
		inner join genre g on t.genreid =g.genreid
		where i.invoicedate between dateStart and  dateEnd
		group by g.genreid)
		union
		(select g.genreid, g.name as genrename, 0 as trackcount
		from genre g
		where g.genreid not in
		(select g.genreid
		from invoice i
		inner join invoiceline il on il.invoiceid=i.invoiceid
		inner join track t on il.trackid= t.trackid
		inner join genre g on t.genreid =g.genreid
		where i.invoicedate between dateStart and  dateEnd
		group by g.genreid))
		order by trackcount DESC;
	END
$$ LANGUAGE plpgsql;

select * from genreSalesBetweenTwoDates('2020-05-19','2020-05-19')


-- Las N canciones con más reproducciones para un artista a ser ingresado por el usuario
CREATE OR REPLACE FUNCTION artistTopTracksPlayback(limitTracks INT,artistidsearch INT)
    RETURNS TABLE(
					trackid INTEGER,
					artistname VARCHAR,
                    trackname VARCHAR,
					trackcount BIGINT)
AS $$
	
	DECLARE

	BEGIN
		IF(limitTracks<0) THEN
			RAISE EXCEPTION 'El limite no puede ser negativo %.', limitTracks 
			USING HINT = 'Revisar el limite enviado.';
		END IF;

		RETURN QUERY
		select t.trackid,ar.name as artistname,t.name as trackname, count(pb.trackid) as trackcount
		from playback pb
		inner join track t on t.trackid = pb.trackid
		inner join album a on a.albumid = t.albumid
		inner join artist ar on a.artistid =ar.artistid
		where ar.artistid=artistidsearch
		group by t.trackid,ar.name
		limit limitTracks;
	END
$$ LANGUAGE plpgsql;
		
select * from artistTopTracksPlayback(10,1)






