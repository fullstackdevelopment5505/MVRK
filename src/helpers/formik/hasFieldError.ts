import { FormikContextType } from 'formik'

export function hasFieldError<Values>(formik: FormikContextType<Values>, fieldName: string = ''): boolean {
  return formik.touched[fieldName] && formik.errors[fieldName] ? true : false
}
