const API_URL = 'https://app-artisan.onrender.com/api';

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Temporarily disabled - allow access without strict admin check
    if (!token) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Get auth headers
function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Show loading
function showLoading() {
    // You can add a loading spinner here
}

// Hide loading
function hideLoading() {
    // Hide loading spinner
}

// Show error message
function showError(message) {
    alert(message);
}

// Show success message
function showSuccess(message) {
    alert(message);
}

// Check auth on page load
const currentPage = window.location.pathname.toLowerCase();
if (!currentPage.includes('index.html') && !currentPage.includes('setup.html')) {
    checkAuth();
}
