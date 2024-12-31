export interface StudentProfile {
  studentEmail: string
  name: string
  phone: string | null
  faculty: string | null
  avatarUrl: string | null
  address: string | null
  className: string | null
}

export type UpdateStudentProfileBody = Omit<StudentProfile, 'avatarUrl'> | { avatar: File }

export interface ChangePasswordBody {
  oldPassword: string
  newPassword: string
}

export interface StudentInfo {
  id: number
  fullName: string
  email: string
  avatarUrl: string
}
