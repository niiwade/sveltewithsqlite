import Database from "better-sqlite3";
import { DB_PATH } from "$env/static/private"; //import env path
import type { Track } from "./types";

const db = new Database(DB_PATH,{verbose: console.log})


export function getInitialTracks(limit=50): Track[]{
    const sql = `
    select t.TrackId as trackId
	, t.Name as name
	, a.AlbumId as albumId
    , a.Title as title
    , at.ArtistId as artistId
    , at.Name as artistName
    , g.Name as genre
    
	from tracks t
	join albums a
     	on t.TrackId = a.AlbumId
    join artists at
    	on a.ArtistId = at.ArtistId
    join genres g
    	on t.GenreId = g.GenreId
    limit $limit
    `;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({limit});
    return rows as Track[];
}

