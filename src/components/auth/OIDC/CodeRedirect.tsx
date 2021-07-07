import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Cache } from 'aws-amplify'
import axios from 'axios'
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'

import { ReactComponent as Logo } from 'assets/vmg.svg'
import { userByEmail } from 'graphql/queries'
import { graphQLQuery } from 'graphql/helpers'

export const CodeRedirect = () => {
  const classes = useStyles()
  const history = useHistory()
  const [code, setCode] = useState('')

  const authUser = async (code: string) => {
    const access = Cache.getItem('vx360-access')
    try {
      if (!access) {
        const { data } = await axios.post('https://uyuvbc8vi6.execute-api.us-east-1.amazonaws.com/dev/auth', {
          code
        })

        Cache.setItem('vx360-access', data.accessInfo)
        Cache.setItem('vx360-user', data.userInfo)
        // { email, given_name, family_name }

        await getUserDetails(data.userInfo)
      } else {
        const user = Cache.getItem('vx360-user')
        await getUserDetails(user)
      }
    } catch (e) {
      console.error('error')
      console.error(e)
    }
  }

  const getUserDetails = async userInfo => {
    let foundUser = await graphQLQuery(userByEmail, 'userByEmail', { email: userInfo.email })
    // user completed registration (timezone field is required of view only and full attendee users)
    if (foundUser?.timeZone) {
      // push thank you
      history.push('/registration?step=3')
      return
    } else if (foundUser) {
      // users previously created account but did not complete registration
      history.push('/registration?step=2')
      return
    } else {
      // may need to jump directly to a specific step of reg
      history.push('/registration?step=1')
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    setCode(code || '')

    if (code) {
      authUser(code)
    }
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Logo height={50} width={100} />
      </div>
      <Card className={classes.paper}>
        <CardContent>
          <Typography variant='h6'>{code ? 'Redirecting...' : 'Loading...'}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#eee',
    height: '100vh',
    color: 'black'
  },
  logo: {
    position: 'absolute',
    top: '24px',
    left: '24px'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '24px',
    '&.MuiPaper-root': {
      backgroundColor: 'white !important'
    },
    '& h6, & h5, & p': {
      color: 'black',
      marginBottom: '24px'
    }
  }
}))
