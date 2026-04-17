# 🔥 QUICK FIX - Login Not Redirecting

## The Problem
You can create an account, but login doesn't redirect to dashboard.

## Most Likely Cause
You're opening files directly (file:// protocol) instead of using a web server.

## ✅ THE FIX

### Step 1: Start a Local Server
Open terminal/command prompt in your project folder and run:

```bash
python -m http.server 8000
```

### Step 2: Open in Browser
Go to: `http://localhost:8000`

**NOT:** `file:///C:/backForge/Management-E-Commerce-Web-1/index.html`
**YES:** `http://localhost:8000/index.html`

### Step 3: Test Again
1. Go to `http://localhost:8000/pages/signup.html`
2. Create account
3. Go to `http://localhost:8000/index.html`
4. Login with your account
5. Should redirect to dashboard!

## Still Not Working?

### Check Browser Console
1. Press F12
2. Go to Console tab
3. Look for errors (red text)
4. Take a screenshot and share it

### Try Test Page
1. Go to `http://localhost:8000/test-auth.html`
2. Click "Test Signup" with any email/password
3. If this works, Firebase is configured correctly
4. If this doesn't work, there's a Firebase configuration issue

## Common Errors

### "Cannot use import statement outside a module"
**Fix:** You're using file:// protocol. Use http://localhost

### "Firebase: Error (auth/...)"
**Fix:** Check Firebase Console → Authentication → Sign-in method → Email/Password is enabled

### "Failed to fetch"
**Fix:** You're offline or Firebase is blocked by firewall

### Page just refreshes, no error
**Fix:** Form is submitting normally. Make sure you're using the updated files with `id="login-form"`

## Need Help?
Share:
1. Screenshot of browser console (F12)
2. Are you using http://localhost or file://?
3. Does test-auth.html work?
