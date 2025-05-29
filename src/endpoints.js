import { state } from './state.js';
import { formatResponse } from './utils.js';

export function setupEndpoints() {
    const endpointsContainer = document.getElementById('endpoints');
    
    // Example endpoint rendering - replace with your actual endpoints
    const endpoints = [
        {
            method: 'GET',
            path: '/api/example',
            description: 'Get example data'
        },
        {
            method: 'POST',
            path: '/api/example',
            description: 'Create example data'
        }
    ];

    endpoints.forEach(endpoint => {
        const el = createEndpointElement(endpoint);
        endpointsContainer.appendChild(el);
    });
}

function createEndpointElement(endpoint) {
    const div = document.createElement('div');
    div.className = 'endpoint';
    
    const header = document.createElement('div');
    header.className = 'endpoint-header';
    
    const method = document.createElement('span');
    method.className = 'method';
    method.textContent = endpoint.method;
    
    const path = document.createElement('span');
    path.className = 'path';
    path.textContent = endpoint.path;
    
    header.appendChild(method);
    header.appendChild(path);
    
    const description = document.createElement('p');
    description.textContent = endpoint.description;
    
    const tryBtn = document.createElement('button');
    tryBtn.textContent = 'Try it';
    tryBtn.addEventListener('click', () => tryEndpoint(endpoint, div));
    
    div.appendChild(header);
    div.appendChild(description);
    div.appendChild(tryBtn);
    
    return div;
}

async function tryEndpoint(endpoint, container) {
    try {
        const response = await fetch(endpoint.path, {
            method: endpoint.method,
            headers: getHeaders()
        });
        
        const data = await response.json();
        showResponse(container, data, response.ok);
    } catch (err) {
        showResponse(container, { error: err.message }, false);
    }
}

function getHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (state.auth.type === 'token') {
        headers.Authorization = `${state.auth.scheme} ${state.auth.token}`;
    } else if (state.auth.type === 'basic') {
        const credentials = btoa(`${state.auth.username}:${state.auth.password}`);
        headers.Authorization = `Basic ${credentials}`;
    }
    
    return headers;
}

function showResponse(container, data, success) {
    let existing = container.querySelector('.response');
    if (existing) {
        existing.remove();
    }
    
    const response = document.createElement('pre');
    response.className = `response ${success ? 'success' : 'error'}`;
    response.textContent = formatResponse(data, state.language);
    container.appendChild(response);
}