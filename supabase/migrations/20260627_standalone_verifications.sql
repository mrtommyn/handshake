-- Make a verification able to stand on its own (no deal, no account needed for the subject).
-- Adds: who requested it, who it's about (free-text contact), and a secure invite token.

alter table public.verifications
  add column if not exists requester_id uuid references public.profiles(id) on delete cascade,
  add column if not exists subject_name text,
  add column if not exists subject_phone text,
  add column if not exists subject_email text,
  add column if not exists invite_token text unique,
  add column if not exists invited_at timestamptz;

create index if not exists idx_verifications_requester on public.verifications(requester_id);
create index if not exists idx_verifications_token on public.verifications(invite_token);

-- Requester can manage their own standalone verifications.
create policy "verifications_select_requester" on public.verifications for select
  using (requester_id = auth.uid());
create policy "verifications_insert_requester" on public.verifications for insert
  with check (requester_id = auth.uid());
create policy "verifications_update_requester" on public.verifications for update
  using (requester_id = auth.uid());
