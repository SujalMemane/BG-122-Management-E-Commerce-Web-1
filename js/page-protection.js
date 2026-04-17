// Simple page protection script for all protected pages
// Add this script to every page that requires authentication

import { initAuthUI } from './auth-ui.js';

// Initialize authentication when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initAuthUI();
});
