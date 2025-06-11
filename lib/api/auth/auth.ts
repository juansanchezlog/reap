import {
  LoginCredentials,
  AuthResponse,
} from '@/lib/types';
import { ROUTES } from '@/lib/routes';
import api from '../api';

export const authAPI = {
  login: (data: LoginCredentials): Promise<AuthResponse> =>
    api.post(ROUTES.ENDPOINTS.LOGIN, data).then(res => res.data),
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};
