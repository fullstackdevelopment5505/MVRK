import React, { useState } from 'react'
import axios from 'axios'
import { Button, Card, CardContent, makeStyles, TextField, Typography } from '@material-ui/core'

import { clientId, generateKey } from 'helpers'
import { ReactComponent as Logo } from 'assets/vmg.svg'

export const UserLookup = () => {
  const classes = useStyles()
  const [value, setValue] = useState<string>('')

  const checkUsers = async () => {
    const res = await axios.get(
      `https://uyuvbc8vi6.execute-api.us-east-1.amazonaws.com/dev/users/1928272?email=${value}`
    )
    return res.data
  }

  const submit = async () => {
    const user = await checkUsers()

    if (user?.id && user?.registered === 'true') {
      const state = generateKey()
      const nonce = generateKey()
      window.location.assign(
        // swap out un/commented link for local vs dev deployed development
        `https://id-uat.b2b.verizonmedia.com/identity/oauth2/authorize?realm=/techweek&client_id=${clientId}&response_type=code&scope=openid%20profile%20email%20oath:username%20fedidp:sub%20agency&redirect_uri=https://dev.d2o6b06bpexdr7.amplifyapp.com/auth/b2b_redir&state=${state}&nonce=${nonce}&login_hint=${value}`
        // `https://id-uat.b2b.verizonmedia.com/identity/oauth2/authorize?realm=/techweek&client_id=${clientId}&response_type=code&scope=openid%20profile%20email%20oath:username%20fedidp:sub%20agency&redirect_uri=https://localhost:3000/auth/b2b_redir&state=${state}&nonce=${nonce}&login_hint=${value}`
      )
    } else if (user?.id && user?.registered === 'false') {
      try {
        const { data } = await axios.post('https://uyuvbc8vi6.execute-api.us-east-1.amazonaws.com/dev/crestAuth', {
          email: value
        })
        // Error Messages from unsuccessful register call
      } catch (err) {
        // console.error(err)
      }
    } else {
      alert('Not Valid User')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Logo height={50} width={100} />
      </div>
      <Card className={classes.paper}>
        <Typography variant='h6'>Registration</Typography>
        <CardContent>
          <div className={classes.inputContainer}>
            <TextField placeholder='email or id' onChange={handleChange} />
            <Button variant='contained' onClick={submit} className={classes.submitButton}>
              Submit
            </Button>
          </div>
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
    '& h6': {
      color: 'black',
      marginBottom: '24px'
    }
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& button': {
      marginTop: '16px'
    },
    '& input': {
      color: 'black',
      '&::placeholder': {
        color: 'gray'
      }
    }
  },
  submitButton: {
    borderRadius: '16px',
    textTransform: 'none',
    backgroundColor: 'black',
    color: 'white'
  }
}))
