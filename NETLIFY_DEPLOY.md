# Deploy to Netlify

## Quick Deploy

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your `vocab-master` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables:
   - Click "Show advanced"
   - Add `VITE_SUPABASE_URL` = `https://kyljonjayckxsnmttmpx.supabase.co`
   - Add `VITE_SUPABASE_ANON_KEY` = (your anon key)
7. Click "Deploy site"

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow instructions to configure DNS

## Continuous Deployment

✅ Netlify automatically deploys when you push to GitHub
✅ Every commit triggers a new build
✅ Preview deployments for pull requests

Your app will be live at: `https://your-site-name.netlify.app`
