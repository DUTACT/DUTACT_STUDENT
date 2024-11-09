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
