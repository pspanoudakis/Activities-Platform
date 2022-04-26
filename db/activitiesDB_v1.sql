-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.activities
(
    id integer NOT NULL DEFAULT nextval('activities_id_seq'::regclass),
    seller_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    category_id integer NOT NULL,
    price double precision[] NOT NULL,
    age_category_id integer,
    capacity integer NOT NULL,
    facility_id integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    plan_id integer NOT NULL,
    CONSTRAINT activities_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.bank_accounts
(
    id integer NOT NULL DEFAULT nextval('bank_accounts_id_seq'::regclass),
    seller_id integer NOT NULL,
    iban text COLLATE pg_catalog."default" NOT NULL,
    account_number text COLLATE pg_catalog."default" NOT NULL,
    owner_name character varying COLLATE pg_catalog."default",
    CONSTRAINT bank_accounts_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.bank_cards
(
    id integer NOT NULL DEFAULT nextval('bank_cards_id_seq'::regclass),
    parent_id integer NOT NULL,
    card_number text COLLATE pg_catalog."default" NOT NULL,
    expiration_date date NOT NULL,
    ccv character varying COLLATE pg_catalog."default" NOT NULL,
    owner_name character varying COLLATE pg_catalog."default",
    CONSTRAINT bank_cards_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    parent_category_id integer,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.facilities
(
    id integer NOT NULL DEFAULT nextval('facilities_id_seq'::regclass),
    seller_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    district character varying COLLATE pg_catalog."default",
    CONSTRAINT facilities_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.parents
(
    id integer NOT NULL DEFAULT nextval('parents_id_seq'::regclass),
    user_id integer NOT NULL,
    CONSTRAINT parents_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.plan_at_day
(
    id integer NOT NULL DEFAULT nextval('plan_at_day_id_seq'::regclass),
    plan_id integer NOT NULL,
    day character varying COLLATE pg_catalog."default" NOT NULL,
    "time" time without time zone NOT NULL,
    CONSTRAINT plan_at_day_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.plans
(
    id integer NOT NULL DEFAULT nextval('plans_id_seq'::regclass),
    period daterange NOT NULL,
    CONSTRAINT plans_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.roles
(
    id integer NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT roles_pk PRIMARY KEY (id)
);

COMMENT ON TABLE public.roles
    IS 'the roles available';

CREATE TABLE IF NOT EXISTS public.sellers
(
    id integer NOT NULL DEFAULT nextval('sellers_id_seq'::regclass),
    user_id integer NOT NULL,
    watermark character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sellers_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    user_name character varying COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default",
    role_id integer NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

COMMENT ON TABLE public.users
    IS 'Table for common info about user, regardless of their role';

ALTER TABLE IF EXISTS public.activities
    ADD CONSTRAINT activities_fk FOREIGN KEY (seller_id)
    REFERENCES public.sellers (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.activities
    ADD CONSTRAINT activities_fk_1 FOREIGN KEY (category_id)
    REFERENCES public.categories (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.activities
    ADD CONSTRAINT activities_fk_2 FOREIGN KEY (facility_id)
    REFERENCES public.facilities (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.activities
    ADD CONSTRAINT activities_fk_3 FOREIGN KEY (plan_id)
    REFERENCES public.plans (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.bank_accounts
    ADD CONSTRAINT bank_accounts_fk FOREIGN KEY (seller_id)
    REFERENCES public.sellers (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.bank_cards
    ADD CONSTRAINT bank_cards_fk FOREIGN KEY (parent_id)
    REFERENCES public.parents (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.categories
    ADD CONSTRAINT categories_fk FOREIGN KEY (parent_category_id)
    REFERENCES public.categories (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.facilities
    ADD CONSTRAINT facilities_fk FOREIGN KEY (seller_id)
    REFERENCES public.sellers (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.parents
    ADD CONSTRAINT parents_fk FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.plan_at_day
    ADD CONSTRAINT plan_at_day_fk FOREIGN KEY (plan_id)
    REFERENCES public.plans (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.sellers
    ADD CONSTRAINT sellers_fk FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.users
    ADD CONSTRAINT users_fk FOREIGN KEY (role_id)
    REFERENCES public.roles (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;

END;