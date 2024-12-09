export interface AuthBody {
  username: string
  password: string
}

export interface AuthResponse {
  accessToken: string
}

export interface RegisterBody {
  fullName: string
  email: string
  password: string
}

export interface ConfirmRegistrationBody {
  email: string
  otp: number
}
