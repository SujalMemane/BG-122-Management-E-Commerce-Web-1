# Firebase Authentication Testing Guide

## 🔍 Current Issue
You can create an account successfully, but after login you stay on the login page instead of being redirected to the dashboard.

## 🧪 Testing Steps

### Step 1: Test Firebase Connection
1. Open `test-auth.html` in your browser
2. This page will show if Firebase is properly initialized
3. Try the "Check Auth State" button to see current login status

### Step 2: Test Account Creation
1. Open `pages/signup.html`
2. Fill in the form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
3. Click "Sign Up"
4. You should see a success message and be redirected to dashboard

### Step 3: Test Login
1. Open `index.html` (login page)
2. Enter the credentials you just created:
   - Email: test@example.com
   - Password: test123456
3. Click "Sign In"
4. You should see "Login successful! Redirecting..." and be taken to dashboard

### Step 4: Check Browser Console
Open browser Developer Tools (F12) and check the Console tab for any errors:
- Look for Firebase errors
- Look for "Auth state changed" messages
- Look for any red error messages

## 🐛 Common Issues & Solutions

### Issue 1: "Firebase not defined" or Module errors
**Cause:** Browser doesn't support ES6 modules or file:// protocol
**Solution:** Use a local server:
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx live-server

# Option 3: PHP
php -S localhost:8000
```
Then access via `http://localhost:8000`

### Issue 2: Login works but no redirect
**Cause:** Auth state not properly detected
**Solution:** 
1. Check browser console for errors
2. Make sure you're using http://localhost not file://
3. Clear browser cache and cookies
4. Try the test-auth.html page first

### Issue 3: "Email already in use" error
**Cause:** Account already exists
**Solution:** 
1. Use a different email
2. Or go to Firebase Console → Authentication → Users and delete the existing user

### Issue 4: CORS errors
**Cause:** Accessing via file:// protocol
**Solution:** Must use a local web server (see Issue 1)

## 📋 Debugging Checklist

- [ ] Using http://localhost (not file://)
- [ ] Firebase Console shows Email/Password is enabled
- [ ] Browser console shows no errors
- [ ] test-auth.html shows "Firebase initialized successfully"
- [ ] Can create account successfully
- [ ] Can see success message after login
- [ ] Auth state listener is working (check console logs)

## 🔧 Manual Testing with test-auth.html

1. Open `test-auth.html` in browser
2. Click "Check Auth State" - should show "Not logged in"
3. Enter email and password in "Test Signup" section
4. Click "Test Signup" - should show success
5. Click "Check Auth State" - should now show user email
6. Click "Logout"
7. Click "Check Auth State" - should show "Not logged in" again
8. Enter same email/password in "Test Login" section
9. Click "Test Login" - should show success
10. Click "Check Auth State" - should show user email

If all these steps work, Firebase is configured correctly!

## 🎯 Next Steps

If test-auth.html works but the main site doesn't:

1. **Check the browser console on index.html** for errors
2. **Verify the script is loading:**
   - Open index.html
   - Press F12 (Developer Tools)
   - Go to Network tab
   - Refresh page
   - Look for `auth-ui.js`, `auth.js`, `firebase-config.js`
   - Make sure they load without 404 errors

3. **Check if auth state listener is firing:**
   - Open index.html
   - Open Console (F12)
   - You should see: "Initializing login page..."
   - After login, you should see: "Auth state changed: [user object]"

4. **Try logging in with console open:**
   - Open index.html
   - Open Console (F12)
   - Enter credentials and click Sign In
   - Watch for any error messages
   - You should see "Login successful! Redirecting..."

## 📞 What to Report

If it still doesn't work, please provide:
1. Screenshot of browser console (F12 → Console tab)
2. Screenshot of Network tab showing loaded files
3. What happens when you click "Sign In" (any message? any redirect?)
4. Does test-auth.html work correctly?

## ✅ Expected Behavior

**Signup Flow:**
1. Fill form → Click "Sign Up"
2. See green success message: "Account created successfully! Redirecting..."
3. After 1 second, redirect to `pages/dashboard.html`
4. Dashboard shows your email in sidebar

**Login Flow:**
1. Fill form → Click "Sign In"
2. See green success message: "Login successful! Redirecting..."
3. After 1 second, redirect to `pages/dashboard.html`
4. Dashboard shows your email in sidebar

**Logout Flow:**
1. Click logout icon in sidebar
2. Immediately redirect to `index.html` (login page)

**Page Protection:**
1. If logged out, trying to access `pages/dashboard.html` redirects to login
2. If logged in, trying to access `index.html` redirects to dashboard
