--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-07-02 20:25:24

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

DROP DATABASE "activitiesDB";
--
-- TOC entry 3466 (class 1262 OID 24583)
-- Name: activitiesDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "activitiesDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE "activitiesDB" OWNER TO postgres;

\connect "activitiesDB"

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 24693)
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    name character varying NOT NULL,
    category_id integer NOT NULL,
    age_category_id integer NOT NULL,
    facility_id integer NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    approved boolean DEFAULT false NOT NULL,
    periodic boolean
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24692)
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activities_id_seq OWNER TO postgres;

--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 222
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- TOC entry 227 (class 1259 OID 24765)
-- Name: activity_at_day; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_at_day (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    day date NOT NULL,
    "time" character varying NOT NULL,
    capacity integer NOT NULL
);


ALTER TABLE public.activity_at_day OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 24764)
-- Name: activity_at_day_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_at_day_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_at_day_id_seq OWNER TO postgres;

--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 226
-- Name: activity_at_day_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_at_day_id_seq OWNED BY public.activity_at_day.id;


--
-- TOC entry 232 (class 1259 OID 24901)
-- Name: activity_has_photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_has_photo (
    id integer NOT NULL,
    url text NOT NULL,
    activity_id integer NOT NULL
);


ALTER TABLE public.activity_has_photo OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24904)
-- Name: activity_has_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_has_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_has_photo_id_seq OWNER TO postgres;

--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 233
-- Name: activity_has_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_has_photo_id_seq OWNED BY public.activity_has_photo.id;


--
-- TOC entry 231 (class 1259 OID 24820)
-- Name: age_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.age_categories (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.age_categories OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24819)
-- Name: age_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.age_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.age_categories_id_seq OWNER TO postgres;

--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 230
-- Name: age_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.age_categories_id_seq OWNED BY public.age_categories.id;


--
-- TOC entry 235 (class 1259 OID 24920)
-- Name: authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authority (
    id bigint NOT NULL,
    authority character varying(255)
);


ALTER TABLE public.authority OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 24919)
-- Name: authority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.authority ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.authority_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 24651)
-- Name: bank_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_accounts (
    id integer NOT NULL,
    seller_id integer NOT NULL,
    iban text NOT NULL,
    account_number text NOT NULL,
    owner_name character varying
);


ALTER TABLE public.bank_accounts OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24650)
-- Name: bank_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bank_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bank_accounts_id_seq OWNER TO postgres;

--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 216
-- Name: bank_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bank_accounts_id_seq OWNED BY public.bank_accounts.id;


--
-- TOC entry 215 (class 1259 OID 24637)
-- Name: bank_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_cards (
    id integer NOT NULL,
    parent_id integer NOT NULL,
    card_number text NOT NULL,
    expiration_date character varying NOT NULL,
    cvv character varying NOT NULL,
    owner_name character varying
);


ALTER TABLE public.bank_cards OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24636)
-- Name: bank_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bank_cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bank_cards_id_seq OWNER TO postgres;

--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 214
-- Name: bank_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bank_cards_id_seq OWNED BY public.bank_cards.id;


--
-- TOC entry 219 (class 1259 OID 24665)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    parent_category_id integer,
    name character varying NOT NULL,
    image character varying
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24664)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 218
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 225 (class 1259 OID 24746)
-- Name: evaluations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluations (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    parent_id integer NOT NULL,
    rating integer NOT NULL,
    comment text
);


ALTER TABLE public.evaluations OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24745)
-- Name: evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.evaluations_id_seq OWNER TO postgres;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 224
-- Name: evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluations_id_seq OWNED BY public.evaluations.id;


--
-- TOC entry 221 (class 1259 OID 24679)
-- Name: facilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facilities (
    id integer NOT NULL,
    seller_id integer NOT NULL,
    name character varying NOT NULL,
    address character varying NOT NULL,
    district character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL,
    approved boolean DEFAULT false NOT NULL
);


ALTER TABLE public.facilities OWNER TO postgres;

--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 221
-- Name: COLUMN facilities.district; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.facilities.district IS 'η περιοχή';


--
-- TOC entry 220 (class 1259 OID 24678)
-- Name: facilities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facilities_id_seq OWNER TO postgres;

--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 220
-- Name: facilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facilities_id_seq OWNED BY public.facilities.id;


--
-- TOC entry 213 (class 1259 OID 24625)
-- Name: parents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parents (
    id integer NOT NULL,
    longitude double precision,
    latitude double precision,
    address character varying,
    user_username character varying NOT NULL
);


ALTER TABLE public.parents OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 24624)
-- Name: parents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parents_id_seq OWNER TO postgres;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 212
-- Name: parents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parents_id_seq OWNED BY public.parents.id;


--
-- TOC entry 229 (class 1259 OID 24803)
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    parent_id integer NOT NULL,
    date date NOT NULL,
    activity_at_day_id integer,
    number integer
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 24802)
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_id_seq OWNER TO postgres;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 228
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- TOC entry 211 (class 1259 OID 24611)
-- Name: sellers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sellers (
    id integer NOT NULL,
    watermark character varying,
    user_username character varying NOT NULL
);


ALTER TABLE public.sellers OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24610)
-- Name: sellers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sellers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sellers_id_seq OWNER TO postgres;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 210
-- Name: sellers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sellers_id_seq OWNED BY public.sellers.id;


--
-- TOC entry 209 (class 1259 OID 24584)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying NOT NULL,
    password text NOT NULL,
    email character varying NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    is_active boolean NOT NULL,
    image character varying,
    balance integer NOT NULL,
    name character varying,
    surname character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 209
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.users IS 'Table for common info about user, regardless of their role';


--
-- TOC entry 236 (class 1259 OID 24925)
-- Name: users_authorities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_authorities (
    user_username character varying(255) NOT NULL,
    authorities_id bigint NOT NULL
);


ALTER TABLE public.users_authorities OWNER TO postgres;

--
-- TOC entry 3240 (class 2604 OID 24696)
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 24768)
-- Name: activity_at_day id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_at_day ALTER COLUMN id SET DEFAULT nextval('public.activity_at_day_id_seq'::regclass);


--
-- TOC entry 3246 (class 2604 OID 24905)
-- Name: activity_has_photo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_has_photo ALTER COLUMN id SET DEFAULT nextval('public.activity_has_photo_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 24823)
-- Name: age_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.age_categories ALTER COLUMN id SET DEFAULT nextval('public.age_categories_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 24654)
-- Name: bank_accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_accounts ALTER COLUMN id SET DEFAULT nextval('public.bank_accounts_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 24640)
-- Name: bank_cards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_cards ALTER COLUMN id SET DEFAULT nextval('public.bank_cards_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 24668)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 24749)
-- Name: evaluations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluations ALTER COLUMN id SET DEFAULT nextval('public.evaluations_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 24682)
-- Name: facilities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities ALTER COLUMN id SET DEFAULT nextval('public.facilities_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 24628)
-- Name: parents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parents ALTER COLUMN id SET DEFAULT nextval('public.parents_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 24806)
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 24614)
-- Name: sellers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers ALTER COLUMN id SET DEFAULT nextval('public.sellers_id_seq'::regclass);


--
-- TOC entry 3447 (class 0 OID 24693)
-- Dependencies: 223
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.activities VALUES (1, 'activity1', 1, 1, 1, 'This is the 1st activity', 10, true, false);
INSERT INTO public.activities VALUES (3, 'activity3', 3, 3, 3, 'This is the 3rd activity', 10, true, false);
INSERT INTO public.activities VALUES (2, 'activity2', 2, 2, 2, 'This is the 2nd activity', 50, true, false);
INSERT INTO public.activities VALUES (4, 'activity4', 4, 1, 4, 'This is the 4th activity', 200, true, false);
INSERT INTO public.activities VALUES (6, 'activity6', 6, 3, 2, 'This is the 6th activity', 500, true, false);
INSERT INTO public.activities VALUES (5, 'activity5', 5, 2, 1, 'This is the 5th activity', 5, true, false);


--
-- TOC entry 3451 (class 0 OID 24765)
-- Dependencies: 227
-- Data for Name: activity_at_day; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.activity_at_day VALUES (1, 1, '2022-07-01', '10:00', 93);
INSERT INTO public.activity_at_day VALUES (4, 1, '2022-07-04', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (27, 5, '2022-07-08', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (14, 3, '2022-07-04', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (15, 3, '2022-07-05', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (16, 3, '2022-07-06', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (17, 4, '2022-07-10', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (18, 4, '2022-07-10', '11:00', 100);
INSERT INTO public.activity_at_day VALUES (19, 4, '2022-07-10', '12:00', 100);
INSERT INTO public.activity_at_day VALUES (20, 4, '2022-07-10', '13:00', 100);
INSERT INTO public.activity_at_day VALUES (21, 4, '2022-07-10', '14:00', 100);
INSERT INTO public.activity_at_day VALUES (22, 4, '2022-07-11', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (23, 4, '2022-07-11', '11:00', 100);
INSERT INTO public.activity_at_day VALUES (24, 4, '2022-07-11', '12:00', 100);
INSERT INTO public.activity_at_day VALUES (25, 4, '2022-07-11', '13:00', 100);
INSERT INTO public.activity_at_day VALUES (26, 4, '2022-07-11', '14:00', 100);
INSERT INTO public.activity_at_day VALUES (28, 6, '2022-07-05', '10:00', 100);
INSERT INTO public.activity_at_day VALUES (29, 6, '2022-07-05', '11:00', 100);
INSERT INTO public.activity_at_day VALUES (5, 1, '2022-07-05', '10:00', 98);
INSERT INTO public.activity_at_day VALUES (6, 2, '2022-07-01', '10:00', 98);
INSERT INTO public.activity_at_day VALUES (7, 2, '2022-07-03', '10:00', 98);
INSERT INTO public.activity_at_day VALUES (8, 2, '2022-07-05', '10:00', 99);
INSERT INTO public.activity_at_day VALUES (9, 2, '2022-07-07', '10:00', 99);
INSERT INTO public.activity_at_day VALUES (10, 2, '2022-07-09', '10:00', 98);
INSERT INTO public.activity_at_day VALUES (11, 3, '2022-07-01', '10:00', 99);
INSERT INTO public.activity_at_day VALUES (12, 3, '2022-07-02', '10:00', 99);
INSERT INTO public.activity_at_day VALUES (13, 3, '2022-07-03', '10:00', 90);
INSERT INTO public.activity_at_day VALUES (3, 1, '2022-07-03', '10:00', 94);
INSERT INTO public.activity_at_day VALUES (2, 1, '2022-07-02', '10:00', 75);
INSERT INTO public.activity_at_day VALUES (30, 6, '2022-07-05', '12:00', 99);


--
-- TOC entry 3456 (class 0 OID 24901)
-- Dependencies: 232
-- Data for Name: activity_has_photo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.activity_has_photo VALUES (1, 'test.com', 1);
INSERT INTO public.activity_has_photo VALUES (2, 'test2.com', 1);


--
-- TOC entry 3455 (class 0 OID 24820)
-- Dependencies: 231
-- Data for Name: age_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.age_categories VALUES (1, 'Προσχολική');
INSERT INTO public.age_categories VALUES (2, 'Δημοτικού');
INSERT INTO public.age_categories VALUES (3, 'Γυμνασίου');


--
-- TOC entry 3459 (class 0 OID 24920)
-- Dependencies: 235
-- Data for Name: authority; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authority VALUES (1, 'ROLE_PARENT');
INSERT INTO public.authority VALUES (2, 'ROLE_SELLER');
INSERT INTO public.authority VALUES (3, 'ROLE_ADMIN');


--
-- TOC entry 3441 (class 0 OID 24651)
-- Dependencies: 217
-- Data for Name: bank_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_accounts VALUES (1, 1, 'GR1122223333444455556666771', '1111222222331EUR', 'sellerName1');
INSERT INTO public.bank_accounts VALUES (2, 2, 'GR1122223333444455556666772', '1111222222332EUR', 'sellerName2');
INSERT INTO public.bank_accounts VALUES (3, 3, 'GR1122223333444455556666773', '1111222222333EUR', 'sellerName3');
INSERT INTO public.bank_accounts VALUES (4, 4, 'GR1122223333444455556666774', '1111222222334EUR', 'sellerName4');


--
-- TOC entry 3439 (class 0 OID 24637)
-- Dependencies: 215
-- Data for Name: bank_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_cards VALUES (1, 1, '1111222233334441', '01/23', '111', 'parentName1');
INSERT INTO public.bank_cards VALUES (3, 3, '1111222233334443', '03/23', '333', 'parentName3');
INSERT INTO public.bank_cards VALUES (4, 4, '1111222233334444', '04/23', '444', 'parentName4');
INSERT INTO public.bank_cards VALUES (5, 5, '1111222233334445', '05/23', '555', 'parentName5');
INSERT INTO public.bank_cards VALUES (2, 1, '1111222233334442', '02/23', '222', 'parentName1');
INSERT INTO public.bank_cards VALUES (8, 2, '0000111122223333', '01/25', '100', 'parentName2');


--
-- TOC entry 3443 (class 0 OID 24665)
-- Dependencies: 219
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (3, 1, 'category1_level2', 'image3');
INSERT INTO public.categories VALUES (4, 2, 'category2_level2', 'image4');
INSERT INTO public.categories VALUES (1, NULL, 'category1_level1', 'image1');
INSERT INTO public.categories VALUES (2, NULL, 'category2_level1', 'image2');
INSERT INTO public.categories VALUES (5, 3, 'category1_level3', 'image5');
INSERT INTO public.categories VALUES (6, 4, 'category2_level3', 'image6');


--
-- TOC entry 3449 (class 0 OID 24746)
-- Dependencies: 225
-- Data for Name: evaluations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.evaluations VALUES (1, 1, 1, 1, 'Very Bad');
INSERT INTO public.evaluations VALUES (2, 2, 1, 5, 'Perfect');
INSERT INTO public.evaluations VALUES (3, 3, 1, 5, NULL);
INSERT INTO public.evaluations VALUES (4, 4, 4, 1, 'It was raining that day :(');
INSERT INTO public.evaluations VALUES (5, 2, 2, 2, NULL);


--
-- TOC entry 3445 (class 0 OID 24679)
-- Dependencies: 221
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.facilities VALUES (3, 3, 'facility3', 'address3', 'district3', 10.3, 10.3, false);
INSERT INTO public.facilities VALUES (4, 4, 'facility4', 'address4', 'district4', 10.4, 10.4, false);
INSERT INTO public.facilities VALUES (2, 1, 'facility2', 'address2', 'district2', 10.2, 10.2, false);
INSERT INTO public.facilities VALUES (1, 1, 'facility1', 'address1', 'district1', 10.1, 10.1, false);


--
-- TOC entry 3437 (class 0 OID 24625)
-- Dependencies: 213
-- Data for Name: parents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.parents VALUES (1, 10.1, 10.1, 'address1', 'parent1');
INSERT INTO public.parents VALUES (2, 10.1, 10.1, 'address2', 'parent2');
INSERT INTO public.parents VALUES (4, 10.1, 10.1, 'address4', 'parent4');
INSERT INTO public.parents VALUES (5, 10.1, 10.1, 'address5', 'parent5');
INSERT INTO public.parents VALUES (3, 10.2, 10.1, 'address3', 'parent3');
INSERT INTO public.parents VALUES (15, 10.2, 10.1, 'address3', 'loukas');


--
-- TOC entry 3453 (class 0 OID 24803)
-- Dependencies: 229
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reservations VALUES (2, 1, '2022-06-01', 1, 2);
INSERT INTO public.reservations VALUES (3, 1, '2022-06-01', 1, 1);
INSERT INTO public.reservations VALUES (4, 1, '2022-06-01', 2, 1);
INSERT INTO public.reservations VALUES (5, 1, '2022-06-01', 3, 1);
INSERT INTO public.reservations VALUES (6, 1, '2022-06-01', 5, 1);
INSERT INTO public.reservations VALUES (9, 2, '2022-06-01', 6, 1);
INSERT INTO public.reservations VALUES (10, 3, '2022-06-01', 7, 1);
INSERT INTO public.reservations VALUES (11, 3, '2022-06-01', 7, 1);
INSERT INTO public.reservations VALUES (12, 3, '2022-06-01', 8, 1);
INSERT INTO public.reservations VALUES (13, 3, '2022-06-01', 9, 1);
INSERT INTO public.reservations VALUES (14, 4, '2022-06-01', 10, 1);
INSERT INTO public.reservations VALUES (15, 4, '2022-06-01', 10, 1);
INSERT INTO public.reservations VALUES (16, 4, '2022-06-01', 11, 1);
INSERT INTO public.reservations VALUES (17, 4, '2022-06-01', 11, 1);
INSERT INTO public.reservations VALUES (18, 4, '2022-06-01', 12, 1);
INSERT INTO public.reservations VALUES (19, 4, '2022-06-01', 13, 1);
INSERT INTO public.reservations VALUES (20, 4, '2022-06-01', 13, 1);
INSERT INTO public.reservations VALUES (21, 4, '2022-06-01', 13, 1);
INSERT INTO public.reservations VALUES (22, 4, '2022-06-01', 13, 1);
INSERT INTO public.reservations VALUES (23, 4, '2022-06-01', 13, 1);
INSERT INTO public.reservations VALUES (24, 4, '2022-06-01', 13, 1);
INSERT INTO public.reservations VALUES (25, 1, '2022-06-08', 1, 1);
INSERT INTO public.reservations VALUES (26, 1, '2022-06-08', 2, 4);
INSERT INTO public.reservations VALUES (27, 1, '2022-06-08', 3, 5);
INSERT INTO public.reservations VALUES (8, 2, '2022-06-04', 6, 1);
INSERT INTO public.reservations VALUES (7, 2, '2022-06-10', 5, 1);
INSERT INTO public.reservations VALUES (29, 1, '2022-07-02', 1, 2);
INSERT INTO public.reservations VALUES (30, 1, '2022-07-02', 1, 2);


--
-- TOC entry 3435 (class 0 OID 24611)
-- Dependencies: 211
-- Data for Name: sellers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sellers VALUES (1, 'watermark1', 'seller1');
INSERT INTO public.sellers VALUES (2, 'watermark2', 'seller2');
INSERT INTO public.sellers VALUES (3, 'watermark3', 'seller3');
INSERT INTO public.sellers VALUES (4, 'watermark4', 'seller4');


--
-- TOC entry 3433 (class 0 OID 24584)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('parent1', '$2a$10$MQdY27tT1QS8qAI5JSiySucGQJHdfjX5KbND0QuEglNXDtAX0D/tS', 'parent1@mail.com', false, true, 'www.google.com', 60, 'parentName1', 'parentSurname1');
INSERT INTO public.users VALUES ('admin', '$2a$10$6dzVR3NN9HPqAInbw8XGauHeKrfWP17N/H7X2Mv6YvdzRYUiQkvIa', 'admin@mail.com', true, true, 'www.updatedImage.com', 10, 'adminName', 'adminSurname');
INSERT INTO public.users VALUES ('parent2', '$2a$10$MLK/oyLWkWy.EhzBHUk0kumWxuCgHKEBrwAKOfvBOXFle9YfR1ubS', 'parent2@mail.com', false, false, 'www.google.com', 10, 'parentName2', 'parentSurname2');
INSERT INTO public.users VALUES ('parent3', '$2a$10$BZfZU3xsMchmFTcesigQzea5g8HHwyC3AkS4esNIsAjg6uNpsQE3a', 'parent3@mail.com', false, true, 'www.google.com', 10, 'parentName3', 'parentSurname3');
INSERT INTO public.users VALUES ('parent4', '$2a$10$dh8lnYCodq9bOtiC6DHnW.9oBB3RyQ92bmuuKycf3FBOWtIPhy1t2', 'parent4@mail.com', false, true, 'www.google.com', 10, 'parentName4', 'parentSurname4');
INSERT INTO public.users VALUES ('parent5', '$2a$10$DAfb27fB6e3LfSXfHe9eTuht1JNX47Knflr0A1RXTijg8q2wqv/L.', 'parent5@mail.com', false, true, 'www.google.com', 10, 'parentName5', 'parentSurname5');
INSERT INTO public.users VALUES ('seller1', '$2a$10$TZYRgM001/dEo.Zxkml2Ru5cMiGCQ1EBBKKwjVqu0wDYvsptIPAzq', 'seller1@mail.com', false, true, 'www.google.com', 10, 'sellerName1', 'sellerSurname1');
INSERT INTO public.users VALUES ('seller2', '$2a$10$iR5hYTp.thdomZ0p6VRJzubohDeerAnfMLhJejBZCGJ9GH5rr2g9a', 'seller2@mail.com', false, true, 'www.google.com', 10, 'sellerName2', 'sellerSurname2');
INSERT INTO public.users VALUES ('seller3', '$2a$10$MUPI0C0FMEcHGhB74DAD3OM3pOBmxK0e6rpj3GyziCsWXOm5Kxose', 'seller3@mail.com', false, true, 'www.google.com', 10, 'sellerName3', 'sellerSurname3');
INSERT INTO public.users VALUES ('seller4', '$2a$10$5oez4k6fqQzjTeCwj2/xH.3w0SRkic6qp2U47bYkcHOlvItl5BY4m', 'seller4@mail.com', false, true, 'www.google.com', 10, 'sellerName4', 'sellerSurname4');
INSERT INTO public.users VALUES ('loukas', '$2a$10$1ABRzwZ7XCxOykhuJ8Uoh.TYGUSu1C3V1efpzys3zeE8e5eP5CVdO', 'hi@mail.com', false, true, NULL, 0, 'loukas', 'Mastoropoulos');


--
-- TOC entry 3460 (class 0 OID 24925)
-- Dependencies: 236
-- Data for Name: users_authorities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_authorities VALUES ('parent1', 1);
INSERT INTO public.users_authorities VALUES ('parent2', 1);
INSERT INTO public.users_authorities VALUES ('parent3', 1);
INSERT INTO public.users_authorities VALUES ('parent4', 1);
INSERT INTO public.users_authorities VALUES ('parent5', 1);
INSERT INTO public.users_authorities VALUES ('seller1', 2);
INSERT INTO public.users_authorities VALUES ('seller2', 2);
INSERT INTO public.users_authorities VALUES ('seller3', 2);
INSERT INTO public.users_authorities VALUES ('seller4', 2);
INSERT INTO public.users_authorities VALUES ('admin', 3);
INSERT INTO public.users_authorities VALUES ('loukas', 1);


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 222
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 6, true);


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 226
-- Name: activity_at_day_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_at_day_id_seq', 30, true);


--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 233
-- Name: activity_has_photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_has_photo_id_seq', 2, true);


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 230
-- Name: age_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.age_categories_id_seq', 3, true);


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 234
-- Name: authority_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authority_id_seq', 3, true);


--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 216
-- Name: bank_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_accounts_id_seq', 4, true);


--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 214
-- Name: bank_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_cards_id_seq', 8, true);


--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 218
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 224
-- Name: evaluations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluations_id_seq', 10, true);


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 220
-- Name: facilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facilities_id_seq', 4, true);


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 212
-- Name: parents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parents_id_seq', 16, true);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 228
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 30, true);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 210
-- Name: sellers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sellers_id_seq', 6, true);


--
-- TOC entry 3262 (class 2606 OID 24700)
-- Name: activities activities_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pk PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 24770)
-- Name: activity_at_day activity_at_day_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_at_day
    ADD CONSTRAINT activity_at_day_pk PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 24912)
-- Name: activity_has_photo activity_has_photo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_has_photo
    ADD CONSTRAINT activity_has_photo_pk PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 24827)
-- Name: age_categories age_categories_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.age_categories
    ADD CONSTRAINT age_categories_pk PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 24924)
-- Name: authority authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authority
    ADD CONSTRAINT authority_pkey PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 24658)
-- Name: bank_accounts bank_accounts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_accounts
    ADD CONSTRAINT bank_accounts_pk PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 24644)
-- Name: bank_cards bank_cards_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_cards
    ADD CONSTRAINT bank_cards_pk PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 24672)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- TOC entry 3264 (class 2606 OID 24753)
-- Name: evaluations evaluations_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_pk PRIMARY KEY (id);


--
-- TOC entry 3260 (class 2606 OID 24686)
-- Name: facilities facilities_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pk PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 24630)
-- Name: parents parents_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_pk PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 24808)
-- Name: reservations reservations_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pk PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 24618)
-- Name: sellers sellers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_pk PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 24946)
-- Name: users_authorities users_authorities_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_authorities
    ADD CONSTRAINT users_authorities_pk PRIMARY KEY (user_username, authorities_id);


--
-- TOC entry 3248 (class 2606 OID 24888)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (username);


--
-- TOC entry 3283 (class 2606 OID 24706)
-- Name: activities activities_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_fk_1 FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3284 (class 2606 OID 24711)
-- Name: activities activities_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_fk_2 FOREIGN KEY (facility_id) REFERENCES public.facilities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3285 (class 2606 OID 24828)
-- Name: activities activities_fk_4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_fk_4 FOREIGN KEY (age_category_id) REFERENCES public.age_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3288 (class 2606 OID 24771)
-- Name: activity_at_day activity_at_day_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_at_day
    ADD CONSTRAINT activity_at_day_fk FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3291 (class 2606 OID 24913)
-- Name: activity_has_photo activity_has_photo_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_has_photo
    ADD CONSTRAINT activity_has_photo_fk FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3280 (class 2606 OID 24659)
-- Name: bank_accounts bank_accounts_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_accounts
    ADD CONSTRAINT bank_accounts_fk FOREIGN KEY (seller_id) REFERENCES public.sellers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3279 (class 2606 OID 24645)
-- Name: bank_cards bank_cards_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_cards
    ADD CONSTRAINT bank_cards_fk FOREIGN KEY (parent_id) REFERENCES public.parents(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3281 (class 2606 OID 24673)
-- Name: categories categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_fk FOREIGN KEY (parent_category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3286 (class 2606 OID 24754)
-- Name: evaluations evaluations_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_fk FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3287 (class 2606 OID 24759)
-- Name: evaluations evaluations_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_fk_1 FOREIGN KEY (parent_id) REFERENCES public.parents(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3282 (class 2606 OID 24687)
-- Name: facilities facilities_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_fk FOREIGN KEY (seller_id) REFERENCES public.sellers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3293 (class 2606 OID 24933)
-- Name: users_authorities fkirolm9syye5giedkp35a0g70p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_authorities
    ADD CONSTRAINT fkirolm9syye5giedkp35a0g70p FOREIGN KEY (user_username) REFERENCES public.users(username);


--
-- TOC entry 3292 (class 2606 OID 24928)
-- Name: users_authorities fkt25vmk46t0o0x01yo0wyx7wmf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_authorities
    ADD CONSTRAINT fkt25vmk46t0o0x01yo0wyx7wmf FOREIGN KEY (authorities_id) REFERENCES public.authority(id);


--
-- TOC entry 3278 (class 2606 OID 24894)
-- Name: parents parents_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_fk FOREIGN KEY (user_username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3290 (class 2606 OID 24940)
-- Name: reservations reservations_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_fk FOREIGN KEY (activity_at_day_id) REFERENCES public.activity_at_day(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3289 (class 2606 OID 24814)
-- Name: reservations reservations_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_fk_1 FOREIGN KEY (parent_id) REFERENCES public.parents(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3277 (class 2606 OID 24889)
-- Name: sellers sellers_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_fk FOREIGN KEY (user_username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-07-02 20:25:25

--
-- PostgreSQL database dump complete
--

