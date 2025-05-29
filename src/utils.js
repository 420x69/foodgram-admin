export function formatResponse(data, language) {
    switch (language) {
        case 'javascript':
            return `const response = ${JSON.stringify(data, null, 2)};`;
        case 'python':
            return `response = ${JSON.stringify(data, null, 2).replace(/"/g, "'")}`; 
        case 'curl':
            return `curl -X GET -H "Content-Type: application/json" ${JSON.stringify(data, null, 2)}`;
        default:
            return JSON.stringify(data, null, 2);
    }
}