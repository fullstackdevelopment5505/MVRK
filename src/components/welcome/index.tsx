import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useTheme, useMediaQuery } from '@material-ui/core'

import { ReactComponent as Logo } from 'assets/mvrk.svg'

import { PillButton } from 'components/shared'
import { setInitialState } from 'redux/auth'
import { useHistory } from 'react-router-dom'

interface WelcomeProps {
  isMobile?: boolean
}

export const Welcome: FC<WelcomeProps> = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles({ isMobile })
  const dispatch = useDispatch()
  const history = useHistory()

  const goToEvent = () => history.push('/event')

  const goToSignIn = (signUp?: boolean) => {
    if (signUp) {
      dispatch(setInitialState('signUp'))
      setTimeout(() => {
        goToEvent()
      }, 300)
    } else {
      goToEvent()
    }
  }

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Logo className={classes.logo} width={150} fill='white' />
        <div>
          <h1 className={classes.title}>
            Welcome to <br />
            Vx360 by MVRK
          </h1>
          <div className={classes.actions}>
            <PillButton textColor='white' borderColor='white' className={classes.pill} onClick={() => goToSignIn(true)}>
              Sign Up
            </PillButton>
            <PillButton textColor='white' borderColor='white' className={classes.pill} onClick={() => goToSignIn()}>
              Sign In
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'flex-start',
      zIndex: 1
    },
    container: {
      background: 'rgba(0,0,0,0.4)',
      width: '100%',
      paddingLeft: (props: WelcomeProps) => (props.isMobile ? '5%' : '13%'),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 1
    },
    logo: {
      marginTop: (props: WelcomeProps) => (props.isMobile ? '30px' : '50px'),
      position: 'absolute',
      top: 0
    },
    title: {
      fontSize: (props: WelcomeProps) => (props.isMobile ? '3rem' : '4rem'),
      marginTop: (props: WelcomeProps) => (props.isMobile ? '50px' : '100px'),
      zIndex: 2
    },
    actions: {
      display: 'flex',
      flexDirection: (props: WelcomeProps) => (props.isMobile ? 'column' : 'row'),
      alignItems: 'center',
      '& > button': {
        marginTop: (props: WelcomeProps) => (props.isMobile ? 24 : 0)
      }
    },
    pill: {
      width: '200px',
      marginRight: '16px',
      padding: '4px',
      height: '50px',
      fontSize: '0.75rem',
      lineHeight: '0.75rem'
    }
  })
)
