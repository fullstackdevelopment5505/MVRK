import React from 'react'
import { SignUp as AmplifySignUp } from 'aws-amplify-react'
import TextField from '@material-ui/core/TextField'

import { PillButton } from 'components/shared'
import { ReactComponent as Logo } from 'assets/mvrk.svg'
import { Auth } from 'aws-amplify'

export default class SignUp extends AmplifySignUp {
  _validAuthStates = ['signUp', 'confirmSignUp']
  signUpFields = [
    {
      label: 'Email',
      key: 'username',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2
    }
  ]

  checkPasswords = () => {
    const pw = document.getElementById('original-pw') as HTMLInputElement
    const confirm = document.getElementById('confirm') as HTMLInputElement
    const passwordCheck = pw.value === confirm.value
    return passwordCheck
  }

  isSignUp = () => {
    return this.props.authState === 'signUp'
  }

  confirm = async () => {
    const username = this.usernameFromAuthData() || this.inputs.username
    const { code } = this.inputs
    try {
      // sign up the user
      await Auth.confirmSignUp(username, code)
      // on successful sign up we sign them in
      const user = await Auth.signIn(username, this.inputs.password)
      this.changeState('signedIn', user)
    } catch (err) {
      this.error(err)
    }
  }

  submitForm = async () => {
    if (this.isSignUp()) {
      if (!this.checkPasswords()) {
        return this.error(new Error('Please make sure passwords match'))
      }
      try {
        await this.signUp()
      } catch (err) {
        this.error(err.message)
      }
    } else {
      this.confirm()
    }
  }

  showComponent() {
    const isSignUp = this.isSignUp()

    return (
      <section className='sign-in'>
        <div className='login'>
          <Logo fill='black' width={150} className='logo' />
          <div className='login-form'>
            <div className='actions title-box'>
              <h3 className='title'>{isSignUp ? 'Sign Up' : 'Confirmation Code'}</h3>
              {isSignUp && (
                <p>
                  Already have an account?
                  <a
                    href='!#'
                    className='sign-up'
                    onClick={e => {
                      e.preventDefault()
                      this.changeState('signIn')
                    }}
                  >
                    Sign in
                  </a>
                </p>
              )}
            </div>
            <form
              onSubmit={e => {
                e.preventDefault()
                this.submitForm()
              }}
            >
              {isSignUp ? (
                <>
                  <TextField
                    variant='outlined'
                    placeholder='Email'
                    fullWidth={true}
                    className='input'
                    type='email'
                    name='username'
                    onChange={this.handleInputChange}
                  />
                  <TextField
                    variant='outlined'
                    placeholder='Password'
                    id='original-pw'
                    fullWidth={true}
                    className='input'
                    type='password'
                    name='password'
                    onChange={this.handleInputChange}
                  />
                  <TextField
                    variant='outlined'
                    placeholder='Confirm Password'
                    id='confirm'
                    fullWidth={true}
                    className='input'
                    type='password'
                    name='password'
                    onChange={this.handleInputChange}
                  />
                </>
              ) : (
                <TextField
                  variant='outlined'
                  placeholder='Enter Your Code'
                  fullWidth={true}
                  className='input'
                  type='text'
                  name='code'
                  onChange={this.handleInputChange}
                />
              )}
              <div className='actions'>
                <PillButton type='submit' className='button' variant='outlined' loading={this.state.requestPending}>
                  Continue
                </PillButton>
              </div>
            </form>
          </div>
        </div>
        <div className='spacer' />
      </section>
    )
  }
}
