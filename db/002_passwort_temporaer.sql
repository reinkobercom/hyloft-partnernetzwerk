-- Startpasswörter, die Hyloft vergibt, sollen beim ersten Login geändert werden
alter table users add column if not exists passwort_temporaer boolean not null default false;
