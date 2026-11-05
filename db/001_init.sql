-- Hyloft Partnernetz – Grundschema

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text,
  name text not null default '',
  role text not null check (role in ('admin', 'partner')),
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists sessions (
  token_hash text primary key,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists sessions_user_idx on sessions(user_id);

-- Einmal-Links für Login per E-Mail und zum Passwort-Setzen
create table if not exists login_tokens (
  token_hash text primary key,
  user_id uuid not null references users(id) on delete cascade,
  purpose text not null check (purpose in ('login', 'setup')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

create table if not exists dateien (
  id uuid primary key default gen_random_uuid(),
  mime text not null,
  bytes bytea not null,
  groesse int not null,
  created_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  user_id uuid references users(id) on delete set null,
  status text not null default 'entwurf' check (status in ('entwurf', 'live', 'gesperrt')),
  firma text not null,
  gewerk text not null,
  ort text not null,
  plz text not null default '',
  lat double precision not null,
  lng double precision not null,
  radius_km int not null default 50,
  inhaber text not null default '',
  telefon text not null default '',
  email text not null default '',
  website text not null default '',
  claim text not null default '',
  beschreibung text not null default '',
  leistungen text[] not null default '{}',
  seit int,
  mitarbeiter text not null default '',
  logo_id uuid references dateien(id) on delete set null,
  bilder uuid[] not null default '{}',
  lofttuer_erfahrung boolean not null default false,
  verifiziert boolean not null default true,
  notiz_intern text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists partners_status_idx on partners(status);
create index if not exists partners_gewerk_idx on partners(gewerk);

create table if not exists registrierungen (
  id uuid primary key default gen_random_uuid(),
  firma text not null,
  gewerk text not null,
  ort text not null,
  radius_km int not null default 50,
  name text not null,
  email text not null,
  telefon text not null,
  website text not null default '',
  beschreibung text not null default '',
  leistungen text[] not null default '{}',
  lofttuer_bedarf text not null default '',
  rueckruf text not null default '',
  status text not null default 'offen' check (status in ('offen', 'angelegt', 'abgelehnt')),
  partner_id uuid references partners(id) on delete set null,
  einwilligung_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists anfragen (
  id uuid primary key default gen_random_uuid(),
  quelle text not null check (quelle in ('sammel', 'profil')),
  name text not null,
  email text not null,
  telefon text not null default '',
  ort text not null default '',
  gewerke text[] not null default '{}',
  art text not null default '',
  zeitraum text not null default '',
  beschreibung text not null,
  lofttuer text not null default '',
  lofttuer_kontakt boolean not null default false,
  partner_ids uuid[] not null default '{}',
  status text not null default 'neu' check (status in ('neu', 'bearbeitet')),
  einwilligung_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists anfragen_partner_idx on anfragen using gin(partner_ids);

-- Anfragen von Partnern an Hyloft (Projekt, Musterstück, Showroom)
create table if not exists partner_service (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  typ text not null check (typ in ('projekt', 'muster', 'showroom')),
  daten jsonb not null default '{}',
  status text not null default 'neu' check (status in ('neu', 'bearbeitet')),
  created_at timestamptz not null default now()
);

create table if not exists referenzen (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  ort text not null default '',
  jahr int,
  tuer text not null default '',
  bild_id uuid references dateien(id) on delete set null,
  partner_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

-- Profilaufrufe: nur Zähler pro Tag, kein Personenbezug
create table if not exists profil_aufrufe (
  partner_id uuid not null references partners(id) on delete cascade,
  tag date not null,
  anzahl int not null default 0,
  primary key (partner_id, tag)
);

create table if not exists email_log (
  id uuid primary key default gen_random_uuid(),
  an text not null,
  betreff text not null,
  text text not null,
  status text not null check (status in ('gesendet', 'nicht_konfiguriert', 'fehler')),
  fehler text not null default '',
  created_at timestamptz not null default now()
);

-- Missbrauchsschutz: gehashte IP + Aktion, wird nach 24 h gelöscht
create table if not exists rate_limits (
  schluessel text not null,
  created_at timestamptz not null default now()
);
create index if not exists rate_limits_idx on rate_limits(schluessel, created_at);
