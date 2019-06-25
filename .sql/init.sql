--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: noise; Type: SCHEMA; Schema: -; Owner: todoapp
--

CREATE SCHEMA noise;


ALTER SCHEMA noise OWNER TO todoapp;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: sessions; Type: TABLE; Schema: noise; Owner: todoapp
--

CREATE TABLE noise.sessions (
    "idUser" integer NOT NULL,
    token character varying
);


ALTER TABLE noise.sessions OWNER TO todoapp;

--
-- Name: sessions_idUser_seq; Type: SEQUENCE; Schema: noise; Owner: todoapp
--

CREATE SEQUENCE noise."sessions_idUser_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE noise."sessions_idUser_seq" OWNER TO todoapp;

--
-- Name: sessions_idUser_seq; Type: SEQUENCE OWNED BY; Schema: noise; Owner: todoapp
--

ALTER SEQUENCE noise."sessions_idUser_seq" OWNED BY noise.sessions."idUser";


--
-- Name: users; Type: TABLE; Schema: noise; Owner: todoapp
--

CREATE TABLE noise.users (
    "idUser" integer NOT NULL,
    email character varying(512) NOT NULL,
    password character varying(512) NOT NULL
);


ALTER TABLE noise.users OWNER TO todoapp;

--
-- Name: users_idUser_seq; Type: SEQUENCE; Schema: noise; Owner: todoapp
--

CREATE SEQUENCE noise."users_idUser_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE noise."users_idUser_seq" OWNER TO todoapp;

--
-- Name: users_idUser_seq; Type: SEQUENCE OWNED BY; Schema: noise; Owner: todoapp
--

ALTER SEQUENCE noise."users_idUser_seq" OWNED BY noise.users."idUser";


--
-- Name: sessions idUser; Type: DEFAULT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.sessions ALTER COLUMN "idUser" SET DEFAULT nextval('noise."sessions_idUser_seq"'::regclass);


--
-- Name: users idUser; Type: DEFAULT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.users ALTER COLUMN "idUser" SET DEFAULT nextval('noise."users_idUser_seq"'::regclass);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("idUser");


--
-- Name: sessions sessions_idUser_fkey; Type: FK CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.sessions
    ADD CONSTRAINT "sessions_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES noise.users("idUser");


--
-- PostgreSQL database dump complete
--

