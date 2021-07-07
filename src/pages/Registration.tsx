import React, { FC, useMemo } from 'react'
import { ThemeProvider } from '@material-ui/core'
import { makeTheme } from 'helpers'
import { IUser } from 'types'
import { SignUpWizard } from 'components/auth/SignUpWizard'

interface RegProps {
  user: IUser 
}

export const Registration: FC<RegProps> = ({ user }) => {
  const theme = useMemo(() => makeTheme('light'), [])

  return (
    <ThemeProvider theme={theme}>
      <SignUpWizard user={user} />
    </ThemeProvider>
  )
}
