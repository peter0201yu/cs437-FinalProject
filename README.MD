# Tubify App

Music recommendation based on artist, genre, mood, setting, and popularity, combining data from Spotify and Youtube Music.

## Database

### Data Sources
We downloaded data using Spotify API and YouTube API. The scripts to download these data is in `download_data.ipynb`.

### Data Cleaning and Entity Resolution
Spotify API and YouTube API give different data format. We loaded all data into panda dataframes for data cleaning. There are often duplicates of the same song from both Spotify and YouTube; we identify these duplicates by comparing song name and artist name, and keep the Spotify version of the original soundtrack along the YouTube versions of different settings. 

### Schemas and DB Management
The database contains the following tables:
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
Foreign-key constraints:
    "songs_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
    "songs_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
    "songs_setting_id_fkey" FOREIGN KEY (setting_id) REFERENCES settings(setting_id)

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

             Table "public.moodtogenres"
  Column  |  Type   | Collation | Nullable | Default
----------+---------+-----------+----------+---------
 mood_id  | integer |           | not null |
 genre_id | integer |           | not null |
Indexes:
    "moodtogenres_pkey" PRIMARY KEY, btree (mood_id, genre_id)
Foreign-key constraints:
    "moodtogenres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
    "moodtogenres_mood_id_fkey" FOREIGN KEY (mood_id) REFERENCES moods(mood_id)
```

The database is BCNF. 

### Saved database
The database is saved in the file `newTubify.dump` using the cmd `pg_dump -d Tubify -F p -f newTubify.dump`
