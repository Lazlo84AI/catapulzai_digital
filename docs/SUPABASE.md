# SUPABASE — CatapulZ Digital Ecosystem

---

## Configuration

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**Client singleton** → `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

## Tables

### `leads` — Capture email homepage
```sql
CREATE TABLE leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  first_name  text,
  last_name   text,
  source      text DEFAULT 'homepage',
  tags        text[],
  status      text DEFAULT 'new',
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);
```

**RLS Policies :**
```sql
-- Insert public (formulaire homepage)
CREATE POLICY "Anyone can insert a lead"
ON leads FOR INSERT TO anon
WITH CHECK (true);

-- Select réservé aux admins
CREATE POLICY "Only authenticated can read leads"
ON leads FOR SELECT TO authenticated
USING (true);
```

---

## Tables à venir

| Table | Usage | Phase |
|-------|-------|-------|
| `email_campaigns` | Campagnes emailing | 2 |
| `email_sends` | Tracking envois | 2 |
| `contacts` | CRM contacts enrichis | 3 |
| `linkedin_profiles` | Enrichissement LinkedIn | 3 |
| `gmaps_leads` | Leads Google Maps | 3 |
| `ventures` | Landing pages ventures | 2 |

---

## Migrations

Nommage : `supabase/migrations/YYYYMMDD_description.sql`
