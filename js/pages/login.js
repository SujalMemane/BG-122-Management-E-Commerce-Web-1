/**
 * ForgeAdmin — Login Page
 * Firebase Email/Password Authentication
 */
import { auth } from '../firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { showToast, setLoading } from '../ui-utils.js';

// If already logged in → redirect
onAuthStateChanged(auth, user => {
  if (user) window.location.href = 'pages/dashboard.html';
});

const form    = document.getElementById('loginForm');
const emailEl = document.getElementById('loginEmail');
const passEl  = document.getElementById('loginPassword');
const btnEl   = document.getElementById('loginBtn');
const errEl   = document.getElementById('loginError');

function showError(msg) {
  if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
}
function clearError() {
  if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();

  const email    = emailEl?.value?.trim();
  const password = passEl?.value;

  if (!email || !password) { showError('Please enter email and password.'); return; }

  setLoading(btnEl, true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'pages/dashboard.html';
  } catch (err) {
    const messages = {
      'auth/user-not-found':    'No account found with this email.',
      'auth/wrong-password':    'Incorrect password. Please try again.',
      'auth/invalid-credential':'Invalid email or password.',
      'auth/too-many-requests': 'Too many failed attempts. Try again later.',
      'auth/invalid-email':     'Please enter a valid email address.'
    };
    showError(messages[err.code] || 'Login failed. Please try again.');
    setLoading(btnEl, false);
  }
});
