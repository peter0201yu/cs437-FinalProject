--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: moodtogenres; Type: TABLE; Schema: public; Owner: peteryu
--

CREATE TABLE public.moodtogenres (
    mood_id integer NOT NULL,
    genre_id integer NOT NULL
);


ALTER TABLE public.moodtogenres OWNER TO peteryu;

--
-- Data for Name: moodtogenres; Type: TABLE DATA; Schema: public; Owner: peteryu
--

INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (0, 0);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (0, 12);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (0, 19);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (0, 25);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (1, 5);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (1, 8);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (1, 9);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (1, 16);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (1, 17);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (1, 20);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (1, 21);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (0, 15);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 2);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 3);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 6);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 7);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 10);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 11);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 12);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 14);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 18);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 19);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 22);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (2, 23);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (0, 24);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 6);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 11);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 13);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 16);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 17);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 18);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 19);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (3, 24);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 1);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 3);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 4);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 5);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 10);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 13);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 14);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 16);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 18);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 20);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 21);
INSERT INTO public.moodtogenres (mood_id, genre_id) VALUES (4, 23);


--
-- Name: moodtogenres moodtogenres_pkey; Type: CONSTRAINT; Schema: public; Owner: peteryu
--

ALTER TABLE ONLY public.moodtogenres
    ADD CONSTRAINT moodtogenres_pkey PRIMARY KEY (mood_id, genre_id);


--
-- Name: moodtogenres moodtogenres_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: peteryu
--

ALTER TABLE ONLY public.moodtogenres
    ADD CONSTRAINT moodtogenres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(genre_id);


--
-- Name: moodtogenres moodtogenres_mood_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: peteryu
--

ALTER TABLE ONLY public.moodtogenres
    ADD CONSTRAINT moodtogenres_mood_id_fkey FOREIGN KEY (mood_id) REFERENCES public.moods(mood_id);


--
-- PostgreSQL database dump complete
--

