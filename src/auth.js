import { state } from './state.js';

export function setupAuth() {
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = authModal.querySelector('.close-modal');
    const authOptions = authModal.querySelectorAll('[data-auth]');
    const tokenForm = document.getElementById('token-form');
    const basicForm = document.getElementById('basic-form');

    authBtn.addEventListener('click', () => {
        authModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        authModal.classList.remove('active');
    });

    authOptions.forEach(option => {
        option.addEventListener('click', () => {
            const authType = option.dataset.auth;
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.add('hidden');
            });
            
            if (authType === 'token') {
                tokenForm.classList.remove('hidden');
            } else if (authType === 'basic') {
                basicForm.classList.remove('hidden');
            } else if (authType === 'none' || authType === 'session') {
                updateAuth(authType);
                authModal.classList.remove('active');
            }
        });
    });

    tokenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const scheme = document.getElementById('token-scheme').value;
        const token = document.getElementById('token-key').value;
        updateAuth('token', { scheme, token });
        authModal.classList.remove('active');
    });

    basicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('basic-username').value;
        const password = document.getElementById('basic-password').value;
        updateAuth('basic', { username, password });
        authModal.classList.remove('active');
    });
}

function updateAuth(type, data = {}) {
    state.auth = { type, ...data };
    const authBtn = document.getElementById('auth-btn');
    authBtn.textContent = `Auth: ${type}`;
    document.dispatchEvent(new CustomEvent('auth-changed'));
}