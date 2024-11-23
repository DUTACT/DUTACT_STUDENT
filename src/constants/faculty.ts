import { OptionSelect } from 'src/types/common.type'

export const LIST_FACULTIES: string[] = [
  'Cơ khí',
  'Cơ khí Giao thông',
  'Công nghệ Nhiệt – Điện lạnh',
  'Công nghệ Thông tin',
  'Hóa',
  'Điện',
  'Điện tử - Viễn thông',
  'Sư phạm Kỹ thuật',
  'Xây dựng Dân dụng và Công nghiệp',
  'Xây dựng Cầu đường',
  'Xây dựng Thủy lợi – Thủy điện',
  'Quản lý dự án',
  'Môi trường',
  'PFIEV'
]

export const getFacultyOptions = () =>
  LIST_FACULTIES.map(
    (facultyName) =>
      ({
        label: facultyName,
        value: facultyName
      }) as OptionSelect
  )
