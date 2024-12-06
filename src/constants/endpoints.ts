const BASE_URL = '/api/student'

export const getUrl = (url: string) => {
  return `${BASE_URL}/${url}`
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

// student-post-controller

export const BASE_API_URL_POST = '/api/student/posts'

export const getPostUrl = (postId?: number): string => {
  return postId ? `${BASE_API_URL_POST}/${postId}` : BASE_API_URL_POST
}

// feedback-controller

export const BASE_API_URL_FEEDBACK = '/api/student/feedbacks'

export const getFeedbackUrl = (feedbackId?: number): string => {
  return feedbackId ? `${BASE_API_URL_FEEDBACK}/${feedbackId}` : BASE_API_URL_FEEDBACK
}

// newsfeed-controller

export const BASE_API_URL_NEWSFEED = '/api/student/newsfeeds'

// student-profile-controller

export const BASE_API_URL_PROFILE = '/api/student/profile'

export const getProfileUrl = (studentId?: number): string => {
  return studentId ? `${BASE_API_URL_PROFILE}/${studentId}` : BASE_API_URL_PROFILE
}

// event-check-in-controller

export const BASE_API_URL_EVENT_CHECK_IN = '/api/event-check-in'

export const getEventCheckInUrl = (eventId?: number): string => {
  return eventId ? `${BASE_API_URL_EVENT_CHECK_IN}/${eventId}` : BASE_API_URL_EVENT_CHECK_IN
}

// student-activity-controller

export const BASE_API_URL_ACTIVITY = '/api/student/activities'
