import React from 'react'
import { FormikContextType } from 'formik'
import { TextField, TextFieldProps } from '@material-ui/core'
import { hasFieldError } from 'helpers/formik/hasFieldError'

type FieldProps<Values> = TextFieldProps & {
  formik: FormikContextType<Values>
}

export function Field<Values>({ formik, name = '', ...props }: FieldProps<Values>) {
  return (
    <TextField
      error={hasFieldError(formik, name)}
      helperText={hasFieldError(formik, name) && formik.errors[name]}
      id={`signup-${name}`}
      name={name}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      onReset={formik.handleReset}
      value={formik.values[name]}
      variant='outlined'
      {...props}
    />
  )
}
