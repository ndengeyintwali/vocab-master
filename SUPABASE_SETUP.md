# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Name: VocabMaster
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Wait for project to be created

## 2. Get API Keys

1. In your Supabase project dashboard, go to Settings > API
2. Copy the following:
   - Project URL
   - anon/public key

## 3. Create Database Table

1. Go to SQL Editor in Supabase dashboard
2. Run this SQL:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  is_guest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON users FOR SELECT
  USING (auth.jwt() ->> 'email' = 'admin@vocabmaster.com');

CREATE POLICY "Users can insert their own data"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## 5. Create Admin Account

1. Go to Authentication > Users in Supabase dashboard
2. Click "Add User"
3. Email: `admin@vocabmaster.com`
4. Password: (choose a secure password)
5. Click "Create User"

**Important:** Save the admin password securely!

## 6. Deploy to Vercel

1. Add environment variables in Vercel:
   - Go to your project settings
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`
2. Redeploy

## Admin Access

- Email: `admin@vocabmaster.com`
- Password: (the one you set in step 5)
- After login, you'll automatically be redirected to the admin dashboard
- All user registrations will be visible in the admin panel

## Features

✅ User authentication with email/password
✅ Guest access
✅ Admin dashboard with user management
✅ Automatic admin detection
✅ Real-time user data
✅ Better error handling than Firebase
