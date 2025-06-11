import {
  CreateFormData,
  SubmissionData
} from '@/lib/types';
import { ROUTES } from '@/lib/routes';
import api from '../api';

export const formsAPI = {
  create: (data: CreateFormData) =>
    api.post(ROUTES.ENDPOINTS.FORMS, data).then(res => res.data),
  
  getAll: () =>
    api.get(ROUTES.ENDPOINTS.FORMS).then(res => res.data),
  
  getByToken: (token: string) =>
    api.get(ROUTES.ENDPOINTS.FORM_PUBLIC(token)).then(res => res.data),
  
  submit: (token: string, data: SubmissionData) =>
    api.post(ROUTES.ENDPOINTS.FORM_SUBMISSION(token), data).then(res => res.data),
};
