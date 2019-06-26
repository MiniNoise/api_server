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
-- Name: minitel; Type: TABLE; Schema: noise; Owner: todoapp
--

CREATE TABLE noise.minitel (
    "idMachine" integer NOT NULL,
    name character varying(256),
    uid character(256)
);


ALTER TABLE noise.minitel OWNER TO todoapp;

--
-- Name: minitel_idMachine_seq; Type: SEQUENCE; Schema: noise; Owner: todoapp
--

CREATE SEQUENCE noise."minitel_idMachine_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE noise."minitel_idMachine_seq" OWNER TO todoapp;

--
-- Name: minitel_idMachine_seq; Type: SEQUENCE OWNED BY; Schema: noise; Owner: todoapp
--

ALTER SEQUENCE noise."minitel_idMachine_seq" OWNED BY noise.minitel."idMachine";


--
-- Name: owners; Type: TABLE; Schema: noise; Owner: todoapp
--

CREATE TABLE noise.owners (
    idownership integer NOT NULL,
    "idUser" integer,
    "idMachine" integer
);


ALTER TABLE noise.owners OWNER TO todoapp;

--
-- Name: owners_idownership_seq; Type: SEQUENCE; Schema: noise; Owner: todoapp
--

CREATE SEQUENCE noise.owners_idownership_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE noise.owners_idownership_seq OWNER TO todoapp;

--
-- Name: owners_idownership_seq; Type: SEQUENCE OWNED BY; Schema: noise; Owner: todoapp
--

ALTER SEQUENCE noise.owners_idownership_seq OWNED BY noise.owners.idownership;


--
-- Name: sessions; Type: TABLE; Schema: noise; Owner: todoapp
--

CREATE TABLE noise.sessions (
    "idSession" integer NOT NULL,
    "idUser" integer,
    token character varying(256)
);


ALTER TABLE noise.sessions OWNER TO todoapp;

--
-- Name: sessions_idSession_seq; Type: SEQUENCE; Schema: noise; Owner: todoapp
--

CREATE SEQUENCE noise."sessions_idSession_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE noise."sessions_idSession_seq" OWNER TO todoapp;

--
-- Name: sessions_idSession_seq; Type: SEQUENCE OWNED BY; Schema: noise; Owner: todoapp
--

ALTER SEQUENCE noise."sessions_idSession_seq" OWNED BY noise.sessions."idSession";


--
-- Name: users; Type: TABLE; Schema: noise; Owner: todoapp
--

CREATE TABLE noise.users (
    "idUser" integer NOT NULL,
    email character varying(256),
    password character varying(64)
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
-- Name: minitel idMachine; Type: DEFAULT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.minitel ALTER COLUMN "idMachine" SET DEFAULT nextval('noise."minitel_idMachine_seq"'::regclass);


--
-- Name: owners idownership; Type: DEFAULT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.owners ALTER COLUMN idownership SET DEFAULT nextval('noise.owners_idownership_seq'::regclass);


--
-- Name: sessions idSession; Type: DEFAULT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.sessions ALTER COLUMN "idSession" SET DEFAULT nextval('noise."sessions_idSession_seq"'::regclass);


--
-- Name: users idUser; Type: DEFAULT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.users ALTER COLUMN "idUser" SET DEFAULT nextval('noise."users_idUser_seq"'::regclass);


--
-- Name: minitel minitel_pkey; Type: CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.minitel
    ADD CONSTRAINT minitel_pkey PRIMARY KEY ("idMachine");


--
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (idownership);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY ("idSession");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("idUser");


--
-- Name: owners owners_idMachine_fkey; Type: FK CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.owners
    ADD CONSTRAINT "owners_idMachine_fkey" FOREIGN KEY ("idMachine") REFERENCES noise.minitel("idMachine") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: owners owners_idUser_fkey; Type: FK CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.owners
    ADD CONSTRAINT "owners_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES noise.users("idUser") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_idUser_fkey; Type: FK CONSTRAINT; Schema: noise; Owner: todoapp
--

ALTER TABLE ONLY noise.sessions
    ADD CONSTRAINT "sessions_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES noise.users("idUser") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

