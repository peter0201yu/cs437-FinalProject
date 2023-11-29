from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()
# PostgreSQL Database credentials loaded from the .env file
DATABASE = os.getenv('DATABASE')
DATABASE_USERNAME = os.getenv('DATABASE_USERNAME')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

app = Flask(__name__)

# CORS implemented so that we don't get errors when trying to access the server from a different server location
CORS(app)

try:
    con = psycopg2.connect(
        database=DATABASE,
        user=DATABASE_USERNAME,
        password=DATABASE_PASSWORD)
    cur = con.cursor()

    # GET: Fetch all artists from DB
    @app.route('/artist_names')
    def fetch_all_artist_names():
        cur.execute('SELECT artist_id, artist_name FROM artists')
        data = cur.fetchall()
        artist_list = [{'id': artist_id, 'name': artist_name} for artist_id, artist_name in data]
        return jsonify(artist_list)

    # GET: Fetch all genres from DB
    @app.route('/genres')
    def fetch_all_genres():
        cur.execute('SELECT genre_id, genre_name FROM genres')
        data = cur.fetchall()
        genre_list = [{'id': genre_id, 'name': genre_name} for genre_id, genre_name in data]
        return jsonify(genre_list)

    # GET: Fetch all moods from DB
    @app.route('/moods')
    def fetch_all_moods():
        cur.execute('SELECT mood_id, mood_name FROM moods')
        data = cur.fetchall()
        mood_list = [{'id': mood_id, 'name': mood_name} for mood_id, mood_name in data]
        return jsonify(mood_list)

    # GET: Fetch all settings from DB
    @app.route('/settings')
    def fetch_all_settings():
        cur.execute('SELECT setting_id, setting_name FROM settings')
        data = cur.fetchall()
        setting_list = [{'id': setting_id, 'name': setting_name} for setting_id, setting_name in data]
        return jsonify(setting_list)

    # GET: Fetch all valid artists from DB
    @app.route('/main_artists')
    def fetch_main_artists():
        cur.execute('''SELECT DISTINCT a.artist_id, a.artist_name
            FROM songs s
            JOIN artists a ON s.artist_id = a.artist_id
            JOIN genres g ON s.genre_id = g.genre_id
            JOIN settings t ON s.setting_id = t.setting_id''')
        data = cur.fetchall()
        artist_list = [{'id': artist_id, 'name': artist_name} for artist_id, artist_name in data]
        return jsonify(artist_list)

    # GET: Fetch all valid artists from DB
    @app.route('/main_genres')
    def fetch_main_genres():
        cur.execute('''SELECT DISTINCT g.genre_id, g.genre_name
                FROM songs s
                JOIN artists a ON s.artist_id = a.artist_id
                JOIN genres g ON s.genre_id = g.genre_id
                JOIN settings t ON s.setting_id = t.setting_id''')
        data = cur.fetchall()
        genre_list = [{'id': genre_id, 'name': genre_name} for genre_id, genre_name in data]
        return jsonify(genre_list)

    # GET: Fetch search songs from MAIN
    @app.route('/search')
    def search():
        artist = request.args.get('artist')
        setting = request.args.get('setting')

        base_query = """
        SELECT url FROM songs
        JOIN artists ON songs.artist_id = artists.artist_id
        JOIN genres ON songs.genre_id = genres.genre_id
        JOIN settings ON songs.setting_id = settings.setting_id
        """
        conditions = []
        params = []

        if artist:
            conditions.append("artists.artist_id = %s")
            params.append(artist)
        if setting:
            conditions.append("settings.setting_id = %s")
            params.append(setting)

        if conditions:
            base_query += " WHERE " + " AND ".join(conditions)
            
        cur.execute(base_query, params)
        # Fetch all the results
        results = cur.fetchall()
        results = [j for results in results for j in results]
        return results

except:
    print('Error')