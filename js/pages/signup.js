/**
 * ForgeAdmin — Signup Page
 * Firebase Email/Password Registration
 */
import { auth } from '../firebase-config.js';
import { db }   from '../firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { showToast, setLoading } from '../ui-utils.js';

const form    = document.getElementById('signupForm');
const nameEl  = document.getElementById('signupName');
const emailEl = document.getElementById('signupEmail');
const passEl  = document.getElementById('signupPassword');
const confEl  = document.getElementById('signupConfirm');
const btnEl   = document.getElementById('signupBtn');
const errEl   = document.getElementById('signupError');

function showError(msg) {
  if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (errEl) errEl.classList.add('hidden');

  const name     = nameEl?.value?.trim();
  const email    = emailEl?.value?.trim();
  const password = passEl?.value;
  const confirm  = confEl?.value;

  if (!name)                        { showError('Full name is required.'); return; }
  if (!email)                       { showError('Email is required.'); return; }
  if (password.length < 8)          { showError('Password must be at least 8 characters.'); return; }
  if (password !== confirm)         { showError('Passwords do not match.'); return; }

  setLoading(btnEl, true);
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    // Save profile to Firestore - HACKATHON MODE: give admin access
    // TODO: Change to 'viewer' for production and require admin promotion
    await setDoc(doc(db, 'settings', cred.user.uid), {
      profile: { firstName: name.split(' ')[0], lastName: name.split(' ').slice(1).join(' '), email, name },
      notifications: { dailyOrderSummary: true, lowStockAlerts: true, marketingUpdates: false },
      role: 'admin',
      createdAt: serverTimestamp()
    });

    window.location.href = 'dashboard.html';
  } catch (err) {
    const messages = {
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/invalid-email':        'Please enter a valid email address.',
      'auth/weak-password':        'Password is too weak. Use at least 8 characters.',
      'auth/operation-not-allowed':'Email/Password sign-in is not enabled in Firebase Auth.',
      'auth/network-request-failed':'Network error. Check internet/firewall and try again.',
      'permission-denied':          'Firestore rules blocked profile creation. Deploy/update rules.',
    };
    showError(messages[err.code] || `Registration failed: ${err.code || err.message}`);
    setLoading(btnEl, false);
  }
});
