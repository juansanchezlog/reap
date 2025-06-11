import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://reap-backend.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export default api; 
