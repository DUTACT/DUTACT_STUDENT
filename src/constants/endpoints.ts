const BASE_URL = '/api/student'

export const getUrl = (url: string) => {
  return `${BASE_URL}${url}`
}

// student-auth-controller

export const AUTH_URL = {
  LOGIN: '/api/login',
  RESET_PASSWORD: getUrl('reset-password'),
  CONFIRM_REGISTRATION: getUrl('confirm-registration'),
  REGISTER: getUrl('register'),
  RESEND_OTP: getUrl('resend-otp')
}

// student-event-controller

export const BASE_API_URL_EVENT = '/api/events'

export const getEventUrl = (eventId?: number, action?: string): string => {
  return eventId ? `${BASE_API_URL_EVENT}/${eventId}${action ? `/${action}` : ''}` : BASE_API_URL_EVENT
}
