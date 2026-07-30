-- Public client intake form for Zack's Way Media (no auth required).
create table if not exists project_inquiries (
  id              serial primary key,
  full_name       text not null,
  email           text not null,
  phone           text,
  company         text,
  instagram       text,
  other_socials   text,
  website         text,
  project_type    text not null,
  budget_range    text,
  timeline        text,
  location        text,
  preferred_contact text,
  goals           text not null,
  referral        text,
  created_at      timestamptz not null default now()
);

create index if not exists project_inquiries_created_at_idx
  on project_inquiries (created_at desc);
