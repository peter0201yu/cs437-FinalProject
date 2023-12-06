--  SELECT * FROM songs
--         JOIN artists ON songs.artist_id = artists.artist_id
--         JOIN genres ON songs.genre_id = genres.genre_id;
--         -- genres.genre_id = '9' AND 
        -- settings.setting_id = '1';

-- setting page (checked)
-- genre + pop (ongoing)
-- 

-- UPDATE songs
-- SET popularity = artists.popularity
-- FROM artists
-- WHERE songs.artist_id = artists.artist_id
-- AND songs.popularity IS NULL;

SELECT * FROM songs WHERE popularity < 99 AND popularity >= 70;

-- Hits (70-99)
-- Mainstream (60-70)
-- Hidden Gem (40-60)