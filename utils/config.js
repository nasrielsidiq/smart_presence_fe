const API_BASE_URL = 'https://9ca5-36-93-6-234.ngrok-free.app/api/';

export const ENDPOINTS = {
    USERS: `${API_BASE_URL}/users`,
    LOGIN: `${API_BASE_URL}/login`,
    EMPLOYEES: `${API_BASE_URL}/employees`,
    ATTENDANCES: `${API_BASE_URL}/attendances`,
    ME: `${API_BASE_URL}/me`,
    OFFICES: `${API_BASE_URL}/offices`,
    DIVISIONS: `${API_BASE_URL}/divisions`,
    LEAVE: `${API_BASE_URL}/on-leave`,
    DEVICE: `${API_BASE_URL}/devices`,
    DASHBOARD: `${API_BASE_URL}/dashboard`,
    UNREGISTEDID: `${API_BASE_URL}/unknown-serial-ids`
    // Tambahkan endpoint lain di sini jika diperlukan
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replace(/:\d{2}$/, ''); // Menghilangkan detik
};