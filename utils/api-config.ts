export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  PROFILE: `${BASE_URL}/user/profile`,
  GET_EVENTS: `${BASE_URL}/event/events` ,
  CREATE_EVENT: `${BASE_URL}/event/events`,
  BOOK_EVENT: `${BASE_URL}/book`,
  GET_BOOKINGS: `${BASE_URL}/book`
};
