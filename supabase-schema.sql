-- Referencia para verificar la estructura. No ejecutes a ciegas si ya tienes datos/políticas.
create extension if not exists pgcrypto;
create table if not exists public.news(id uuid primary key default gen_random_uuid(),title text not null,slug text not null unique,category text not null default 'Regionales',excerpt text not null default '',body text not null default '',cover_url text not null,gallery_urls jsonb not null default '[]'::jsonb,published boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
alter table public.news enable row level security;
-- Revisa las políticas existentes antes de crear nuevas. No dupliques políticas.

-- Migración segura para admitir enlaces de video en noticias existentes
alter table public.news add column if not exists video_url text;


-- Programación semanal editable desde el panel administrativo
create table if not exists public.program_schedule (
 id uuid primary key default gen_random_uuid(),
 day text not null check (day in ('LUN','MAR','MIE','JUE','VIE','SAB','DOM')),
 program_name text not null,
 logo_url text,
 start_time time not null,
 end_time time not null,
 description text not null default '',
 sort_order integer not null default 0,
 active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.program_schedule enable row level security;
-- Política pública de lectura solo para programas activos.
do $$ begin
 if not exists (select 1 from pg_policies where schemaname='public' and tablename='program_schedule' and policyname='Public can read active programs') then
  create policy "Public can read active programs" on public.program_schedule for select to anon, authenticated using (active = true);
 end if;
 if not exists (select 1 from pg_policies where schemaname='public' and tablename='program_schedule' and policyname='Admins can manage programs') then
  create policy "Admins can manage programs" on public.program_schedule for all to authenticated using (true) with check (true);
 end if;
end $$;
notify pgrst, 'reload schema';
