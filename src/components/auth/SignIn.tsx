import React from 'react'
import { SignIn as AmplifySignIn } from 'aws-amplify-react'
import TextField from '@material-ui/core/TextField'

import { PillButton } from 'components/shared'
import { ReactComponent as Logo } from 'assets/mvrk.svg'

export default class SignIn extends AmplifySignIn {
  showComponent() {
    return (
      <section className='sign-in'>
        <div className='login'>
          <Logo fill='black' width={150} className='logo' />
          <div className='login-form'>
            <div className='actions title-box'>
              <h3 className='title'>Sign In</h3>
              <p>
                Don't have an account?
                <a
                  href='!#'
                  className='sign-up'
                  onClick={e => {
                    e.preventDefault()
                    this.changeState('signUp')
                  }}
                >
                  Sign up
                </a>
              </p>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault()
                this.signIn(e)
              }}
            >
              <div className=''>
                <TextField
                  variant='outlined'
                  placeholder='Email'
                  fullWidth={true}
                  className='input'
                  type='email'
                  name='username'
                  onChange={this.handleInputChange}
                />
              </div>
              <div className=''>
                <TextField
                  variant='outlined'
                  placeholder='Password'
                  fullWidth={true}
                  className='input'
                  type='password'
                  name='password'
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='actions'>
                <PillButton type='submit' className='button' variant='outlined' loading={false}>
                  Continue
                </PillButton>
                <a
                  href='!#'
                  onClick={e => {
                    e.preventDefault()
                    this.changeState('forgotPassword')
                  }}
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='spacer' />
      </section>
    )
  }
}
