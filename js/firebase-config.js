// Firebase Configuration and Initialization
// Using Firebase v9+ Modular SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    connectAuthEmulator 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration object
// IMPORTANT: Replace these values with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyCiasPOawO_890pGm-qtyx7GyzAVhnvtyI",
    authDomain: "management-e-commerce-we-b8dda.firebaseapp.com",
    projectId: "management-e-commerce-we-b8dda",
    storageBucket: "management-e-commerce-we-b8dda.firebasestorage.app",
    messagingSenderId: "383474957316",
    appId: "1:383474957316:web:bc402de7a24653b2780951"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Optional: Connect to Auth Emulator for local development
// Uncomment the line below if you're using Firebase Emulator Suite
// connectAuthEmulator(auth, "http://localhost:9099");

export { auth };
