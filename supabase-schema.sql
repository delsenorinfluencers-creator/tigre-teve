-- Referencia para verificar la estructura. No ejecutes a ciegas si ya tienes datos/políticas.
create extension if not exists pgcrypto;
create table if not exists public.news(id uuid primary key default gen_random_uuid(),title text not null,slug text not null unique,category text not null default 'Regionales',excerpt text not null default '',body text not null default '',cover_url text not null,gallery_urls jsonb not null default '[]'::jsonb,published boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
alter table public.news enable row level security;
-- Revisa las políticas existentes antes de crear nuevas. No dupliques políticas.
