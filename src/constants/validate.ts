// USERNAME
export const ERROR_REQUIRED_USERNAME = 'Email sinh viên là bắt buộc'
export const MAX_LENGTH_USERNAME = 255
export const MIN_LENGTH_USERNAME = 8
export const REGEX_USERNAME = /^[a-zA-Z0-9._%+-]+@sv1\.dut\.udn\.vn$/
export const ERROR_MAX_LENGTH_USERNAME = `Email sinh viên chỉ có tối đa ${MAX_LENGTH_USERNAME} ký tự`
export const ERROR_MIN_LENGTH_USERNAME = `Email sinh viên phải có tối thiểu ${MIN_LENGTH_USERNAME} ký tự`
export const ERROR_REGEX_USERNAME = 'Email sinh viên phải có đuôi là @sv1.dut.udn.vn'
// PASSWORD
export const MAX_LENGTH_PASSWORD = 128
export const MIN_LENGTH_PASSWORD = 8
export const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/
export const ERROR_REQUIRED_PASSWORD = 'Mật khẩu là bắt buộc'
export const ERROR_MAX_LENGTH_PASSWORD = `Mật khẩu chỉ có tối đa ${MAX_LENGTH_PASSWORD} ký tự`
export const ERROR_MIN_LENGTH_PASSWORD = `Mật khẩu phải có tối thiểu ${MIN_LENGTH_PASSWORD} ký tự`
export const ERROR_INCORRECT_FORMAT_PASSWORD =
  'Mật khẩu phải có ít nhất một ký tự thường, một ký tự in hoa và một ký tự số'

// CONFIRM_PASSWORD
export const ERROR_REQUIRED_CONFIRM_PASSWORD = 'Nhập lại mật khẩu là bắt buộc'
export const ERROR_PASSWORD_NOT_MATCHED = 'Nhập lại mật khẩu không khớp'

// NAME
export const ERROR_REQUIRED_NAME = 'Tên là bắt buộc'
