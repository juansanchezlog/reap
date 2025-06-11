export const ROUTES = {
  HOME: '/',
  FORMS: '/forms',
  FORM_DETAIL: (token: string) => `/form/${token}`,
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  NEW_FORM: '/new-form',
  
  ENDPOINTS: {
    LOGIN: '/auth/login',
    FORMS: '/forms',
    FORM_DETAIL: (id: string) => `/forms/${id}`,
    FORM_PUBLIC: (token: string) => `/forms/public/${token}`,
    FORM_SUBMISSION: (token: string) => `/forms/public/${token}/submit`,
  }
};

export type RouteKeys = keyof typeof ROUTES;