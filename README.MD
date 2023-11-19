# Tubify App

Music recommendation based on genre, mood, and setting, combining data from Spotify and Youtube Music.

## Database

### Setup
Locally, I have a psql db named `Tubify`. To save the db to a file, 
```
pg_dump -d Tubify -F p -f Tubify_basic.dump
```
To restore it,
```
pg_restore -d Tubify -C Tubify_basic.dump
```

### Schemas
`Tubify_basic.dump` contains the following tables:
```
                         Table "public.songs"
   Column   |          Type          | Collation | Nullable | Default
------------+------------------------+-----------+----------+---------
 track_id   | character varying(128) |           | not null |
 track_name | character varying(256) |           |          |
 artist_id  | character varying(128) |           |          |
 genre_id   | integer                |           |          |
 popularity | integer                |           |          |
 url        | character varying(128) |           |          |
 setting_id | integer                |           |          |
Indexes:
    "songs_pkey" PRIMARY KEY, btree (track_id)

                        Table "public.artists"
   Column    |          Type          | Collation | Nullable | Default
-------------+------------------------+-----------+----------+---------
 artist_id   | character varying(32)  |           | not null |
 artist_name | character varying(256) |           |          |
 genre_id    | integer                |           |          |
 popularity  | integer                |           |          |
Indexes:
    "artists_pkey" PRIMARY KEY, btree (artist_id)

                        Table "public.genres"
   Column   |         Type          | Collation | Nullable | Default
------------+-----------------------+-----------+----------+---------
 genre_id   | integer               |           | not null |
 genre_name | character varying(32) |           |          |
Indexes:
    "genres_pkey" PRIMARY KEY, btree (genre_id)

                        Table "public.moods"
  Column   |         Type          | Collation | Nullable | Default
-----------+-----------------------+-----------+----------+---------
 mood_id   | integer               |           | not null |
 mood_name | character varying(32) |           |          |
Indexes:
    "moods_pkey" PRIMARY KEY, btree (mood_id)

                        Table "public.settings"
    Column    |         Type          | Collation | Nullable | Default
--------------+-----------------------+-----------+----------+---------
 setting_id   | integer               |           | not null |
 setting_name | character varying(32) |           |          |
Indexes:
    "settings_pkey" PRIMARY KEY, btree (setting_id)
```

**Notes:**

1. The `songs` table contains tracks from both Spotify and YouTube Music. The ids are the `id`s of those songs on their source platforms. `popularity` is a metric provided by Spotify (ranges from 1 to 100), so tracks from YouTube Music have Null values. In this case, we can use the artist's popularity (shown in the `artist` table). 

2. To put in some user remixes of different settings, I picked 6 top artists and 4 common settings:
```
settings = ["party bathroom", "raining outside", "empty arena", "lofi"]
popular_artists = ["Taylor Swift", "Harry Styles", "Blackpink", "Childish Gambino", "Ariana Grande", "Rihanna"]
``` 
For each `(artist, setting)` pair, I stored the top 3 search results from YouTube. So, in total, 6 * 4 * 3 = 72 tracks from YouTube. These tracks have the attribute `setting_id`, while the Spotify tracks have Null values. These remixes also have the `artist_id` of the original artist's `artist_id` on Spotify.

3. Currently, I haven't linked mood with the other tables. Maybe we can figure out how to build the `moodToGenre` table.

### Example query:
```
SELECT * FROM songs 
NATURAL JOIN genres 
JOIN artists ON songs.artist_id=artists.artist_id 
NATURAL JOIN settings 
WHERE genre_name = 'pop' AND setting_name = 'empty arena' 
ORDER BY artists.popularity DESC;
```
