export interface StudentProfile {
  studentEmail: string
  fullName: string
  phone: string | null
  faculty: string | null
  avatarUrl: string | null
  address: string | null
  className: string | null
}

export type UpdateStudentProfileBody = Omit<StudentProfile, 'avatarUrl'> | { avatar: File }
