# How to Start Local Server

Firebase Authentication **REQUIRES** a local web server. You cannot use `file://` protocol.

## ✅ Quick Start (Recommended)

### Option 1: Python (Easiest)
```bash
# If you have Python 3
python -m http.server 8000

# If you have Python 2
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000`

### Option 2: Node.js
```bash
npx live-server
```
This will automatically open your browser.

### Option 3: PHP
```bash
php -S localhost:8000
```
Then open: `http://localhost:8000`

### Option 4: VS Code Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🚫 DO NOT USE
- Double-clicking HTML files (opens as file://)
- Opening directly in browser (opens as file://)

## ✅ MUST USE
- Local web server (http://localhost)

## Why?
Firebase uses browser security features that only work with HTTP/HTTPS protocols, not file:// protocol.
