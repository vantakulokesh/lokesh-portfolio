/*
# Create profile_data table for editable portfolio profile

1. New Tables
- `profile_data`
  - `id` (int, primary key, default 1) — single-row table for the portfolio owner's profile
  - `name` (text, not null) — full name
  - `role` (text, not null) — professional title
  - `tagline` (text, not null) — short bio / hero subtitle
  - `intro` (text, not null) — longer hero paragraph
  - `about` (text, not null) — about me description
  - `location` (text, not null) — city/country
  - `email` (text, not null) — contact email
  - `phone` (text, not null) — phone number
  - `github` (text, not null) — GitHub URL
  - `linkedin` (text, not null) — LinkedIn URL
  - `resume` (text, not null) — resume file path or URL
  - `photo_url` (text) — profile photo URL (nullable, falls back to /profile.jpg)
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `profile_data`.
- This is a single-tenant portfolio with no sign-in screen, so anon + authenticated
  can read and write. The data is intentionally public/shared.
*/

CREATE TABLE IF NOT EXISTS profile_data (
  id int PRIMARY KEY DEFAULT 1,
  name text NOT NULL,
  role text NOT NULL,
  tagline text NOT NULL,
  intro text NOT NULL,
  about text NOT NULL,
  location text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  github text NOT NULL,
  linkedin text NOT NULL,
  resume text NOT NULL,
  photo_url text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profile_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_profile" ON profile_data;
CREATE POLICY "anon_select_profile" ON profile_data FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_profile" ON profile_data;
CREATE POLICY "anon_insert_profile" ON profile_data FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_profile" ON profile_data;
CREATE POLICY "anon_update_profile" ON profile_data FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_profile" ON profile_data;
CREATE POLICY "anon_delete_profile" ON profile_data FOR DELETE
  TO anon, authenticated USING (true);

-- Seed the row with current defaults so it always exists
INSERT INTO profile_data (id, name, role, tagline, intro, about, location, email, phone, github, linkedin, resume, photo_url)
VALUES (
  1,
  'Vantaku Lokesh',
  'Frontend Developer & UI/UX Designer',
  'Designing clean interfaces and building user-friendly web experiences.',
  'B.Tech Computer Science graduate passionate about crafting clean, user-friendly digital experiences. I bridge the gap between design and development — turning ideas into responsive, accessible web applications.',
  'I am a B.Tech Computer Science Engineering graduate from Vignan''s Institute of Information Technology, Visakhapatnam. I enjoy creating clean, user-friendly digital experiences that blend thoughtful design with solid engineering. My focus is frontend development and UI/UX design — building interfaces that are not only functional but also a pleasure to use.',
  'Visakhapatnam, India',
  'vantakulokesh908@email.com',
  '+91 8074630326',
  'https://github.com/lokesh-vantaku',
  'https://linkedin.com/in/lokesh-vantaku',
  '/resume.pdf',
  NULL
)
ON CONFLICT (id) DO NOTHING;