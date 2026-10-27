-- Ejecuta en Supabase > SQL Editor
create extension if not exists pgcrypto;
create table if not exists public.news(id uuid primary key default gen_random_uuid(),title text not null,slug text not null unique,category text not null default 'Regionales',excerpt text not null default '',body text not null default '',cover_url text not null,gallery_urls jsonb not null default '[]'::jsonb,published boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
alter table public.news enable row level security;
create policy "Public reads published news" on public.news for select using (published=true);
create policy "Authenticated reads all news" on public.news for select to authenticated using (true);
create policy "Authenticated inserts news" on public.news for insert to authenticated with check (true);
create policy "Authenticated updates news" on public.news for update to authenticated using (true) with check (true);
create policy "Authenticated deletes news" on public.news for delete to authenticated using (true);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('noticias-fotos','noticias-fotos',true,12582912,array['image/jpeg','image/png','image/webp','image/gif']) on conflict(id) do update set public=true,file_size_limit=12582912;
create policy "Authenticated uploads news photos" on storage.objects for insert to authenticated with check(bucket_id='noticias-fotos');
create policy "Authenticated updates news photos" on storage.objects for update to authenticated using(bucket_id='noticias-fotos') with check(bucket_id='noticias-fotos');
create policy "Authenticated deletes news photos" on storage.objects for delete to authenticated using(bucket_id='noticias-fotos');
-- Crea el usuario administrador en Supabase > Authentication > Users.
-- Nunca coloques la clave service_role en archivos del navegador.
