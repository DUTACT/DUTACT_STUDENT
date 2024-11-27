import {
  ERROR_INCORRECT_FORMAT_PASSWORD,
  ERROR_INVALID_PHONE,
  ERROR_MAX_LENGTH_PASSWORD,
  ERROR_MAX_LENGTH_USERNAME,
  ERROR_MIN_LENGTH_PASSWORD,
  ERROR_MIN_LENGTH_USERNAME,
  ERROR_PASSWORD_NOT_MATCHED,
  ERROR_REQUIRED_CONFIRM_PASSWORD,
  ERROR_REQUIRED_FIELD,
  ERROR_REQUIRED_NAME,
  ERROR_REQUIRED_PASSWORD,
  ERROR_REQUIRED_USERNAME,
  ERROR_SAME_OLD_PASSWORD,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_USERNAME,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
  REGEX_PASSWORD,
  REGEX_PHONE
} from 'src/constants/validate'
import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required(ERROR_REQUIRED_CONFIRM_PASSWORD)
    .min(MIN_LENGTH_PASSWORD, ERROR_MIN_LENGTH_PASSWORD)
    .max(MAX_LENGTH_PASSWORD, ERROR_MAX_LENGTH_PASSWORD)
    .oneOf([yup.ref(refString)], ERROR_PASSWORD_NOT_MATCHED)
}

export const authenSchema = yup.object({
  username: yup
    .string()
    .required(ERROR_REQUIRED_USERNAME)
    .min(MIN_LENGTH_USERNAME, ERROR_MIN_LENGTH_USERNAME)
    .max(MAX_LENGTH_USERNAME, ERROR_MAX_LENGTH_USERNAME),
  password: yup
    .string()
    .required(ERROR_REQUIRED_PASSWORD)
    .min(MIN_LENGTH_PASSWORD, ERROR_MIN_LENGTH_PASSWORD)
    .max(MAX_LENGTH_PASSWORD, ERROR_MAX_LENGTH_PASSWORD)
    .matches(REGEX_PASSWORD, ERROR_INCORRECT_FORMAT_PASSWORD),
  confirm_password: handleConfirmPasswordYup('password'),
  name: yup.string().required(ERROR_REQUIRED_NAME)
})

export const profileSchema = yup.object({
  name: yup.string().trim().required(ERROR_REQUIRED_FIELD),
  phone: yup.string().trim().required(ERROR_REQUIRED_FIELD).matches(REGEX_PHONE, ERROR_INVALID_PHONE).nullable(),
  address: yup.string().nullable(),
  faculty: yup.string().nullable(),
  className: yup.string().nullable()
})

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().trim().required(ERROR_REQUIRED_PASSWORD),
  newPassword: yup
    .string()
    .trim()
    .required(ERROR_REQUIRED_PASSWORD)
    .min(MIN_LENGTH_PASSWORD, ERROR_MIN_LENGTH_PASSWORD)
    .max(MAX_LENGTH_PASSWORD, ERROR_MAX_LENGTH_PASSWORD)
    .matches(REGEX_PASSWORD, ERROR_INCORRECT_FORMAT_PASSWORD)
    .test('not-same-as-old-password', ERROR_SAME_OLD_PASSWORD, function (newPassword) {
      const { oldPassword } = this.parent
      return newPassword !== oldPassword
    }),
  confirmPassword: handleConfirmPasswordYup('newPassword')
})

export type AuthenSchemaType = yup.InferType<typeof authenSchema>
export type ProfileSchemaType = yup.InferType<typeof profileSchema>
export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
