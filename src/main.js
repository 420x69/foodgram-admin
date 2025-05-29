import { setupAuth } from './auth.js';
import { setupEndpoints } from './endpoints.js';
import { state } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
    setupAuth();
    setupEndpoints();
    
    // Language selector
    const langSelect = document.getElementById('language-select');
    langSelect.addEventListener('change', (e) => {
        state.language = e.target.value;
        document.dispatchEvent(new CustomEvent('language-changed'));
    });
});