export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  SECURE: `${BASE_URL}/secure`,
};
