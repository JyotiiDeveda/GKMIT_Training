-- Joins : Inner, outer
-- 	- Syntax: select * from table1 join table2 on table1.id = table2.id where {condition}
-- 	- join is performed on the basis of foreign key


-- SubQueries - 
-- 	- Syntax: query1 in query2
-- 	- types
-- 	* Subquery in where: when a subquery return more than one value we use in
-- 	* subquery in from: subquery in from needs to be aliased
-- 	* subquery in select: should return one column
-- 		 A subquery in select is executed for every row of outer query.
-- 		 A subquery o/p is a table(after from), column(after select), condition(after where)

-- 	* A subquery output is treated as a virtual table.
-- 	* A join can be performed on the output of the sub query where this output is treated as a virtual table. 
--  	This table given a name by aliasing and the column names of this virtual table can be accessed using alias.

-- 	e.g
-- 	select * from PlaylistTrack as PT where TrackId in (select TRackId from "Track");


-- 1. Write a query to get playlist name and track name
	select 
		P."Name" as PlaylistName, 
		T."Name" as TrackName
	from
		"Playlist" as P join "PlaylistTrack" as PT
	on 	
		P."PlaylistId"= PT."PlaylistId"
	join 
		"Track" as T
	on 
		PT."TrackId"=T."TrackId"
	order by
		P."Name" desc;


-- 2. Get the number of tracks for playlist.
	select 
		P."Name" as PlaylistName, 
	  	count(PT."TrackId") as TrackCnt
	from
		"Playlist" as P 
	join "PlaylistTrack" as PT on 	
		P."PlaylistId"= PT."PlaylistId"
	group by
	 	P."Name"
	order by
		count(PT."TrackId") ;


-- 3. Number of tracks for each playlist having more than 100 tracks
	select 
		P."Name" as PlaylistName, 
	  	count(PT."TrackId") as "TrackCnt" -- column name within quotes ensures that a column name is created with exactly same name
	from
		"Playlist" as P 
	join "PlaylistTrack" as PT on 	
		P."PlaylistId"= PT."PlaylistId"
	group by
	 	P."Name"
	having 
		count(PT."TrackId") > 100
	order by
		count(PT."TrackId");

	--subquery
	select * from (
	select 
		P."Name" as PlaylistName, 
		count(PT."TrackId") as "TrackCnt"
	from
		"Playlist" as P 
	join "PlaylistTrack" as PT on 	
			P."PlaylistId"= PT."PlaylistId"
	group by
	 	P."Name"
	) 
	as VT
	where VT."TrackCnt" > 100;

