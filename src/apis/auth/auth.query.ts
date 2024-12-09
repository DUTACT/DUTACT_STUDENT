import { queryFetch } from 'src/config/queryClient'
import { AUTH_URL } from 'src/constants/endpoints'

export const resendOtp = (email: string) =>
  queryFetch({
    url: AUTH_URL.RESEND_OTP,
    inputParams: { email }
  })
