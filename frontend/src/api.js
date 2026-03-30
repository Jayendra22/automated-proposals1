import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = {
    // Proposals
    getAll: () => axios.get(`${API_BASE_URL}/proposals`),
    getById: (id) => axios.get(`${API_BASE_URL}/proposals/${id}`),
    create: (proposal) => axios.post(`${API_BASE_URL}/proposals`, proposal),
    update: (id, proposal) => axios.put(`${API_BASE_URL}/proposals/${id}`, proposal),
    updateStatus: (id, status) => axios.patch(`${API_BASE_URL}/proposals/${id}/status`, { status }),
    delete: (id) => axios.delete(`${API_BASE_URL}/proposals/${id}`),
    
    // Auth
    login: (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials),
    register: (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData),
};

export default api;
