import React from 'react'
import { ForgotPassword as AmplifyForgotPassword } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'
import TextField from '@material-ui/core/TextField'
import { PillButton } from 'components/shared'
import { ReactComponent as Logo } from 'assets/mvrk.svg'

export default class PasswordReset extends AmplifyForgotPassword {
  constructor(props) {
    super(props)

    this.state = {
      delivery: {
        submitted: false,
        error: false
      }
    }
  }

  submitReset = async () => {
    const { username } = this.inputs

    try {
      await Auth.forgotPassword(username)
      this.setState({ delivery: { submitted: true, code: true } })
    } catch (err) {
      this.setState({
        delivery: {
          submitted: true,
          error: err.message
        }
      })
    }
  }

  resetForm = () => {
    this.setState({
      delivery: {
        submitted: false,
        error: false
      }
    })
  }

  showComponent() {
    const { delivery } = this.state
    return (
      <section className='sign-in'>
        <div className='login'>
          <Logo fill='black' width={150} className='logo' />
          <div className='login-form'>
            <div className='actions title-box'>
              <h3 className='title'>Password Reset</h3>
              <p>
                <a
                  href='!#'
                  className='sign-up'
                  onClick={e => {
                    e.preventDefault()
                    this.changeState('signIn')
                  }}
                >
                  Cancel
                </a>
              </p>
            </div>
            {!delivery.error ? (
              !delivery.submitted ? (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.submitReset()
                  }}
                >
                  <div className='message'>
                    Enter the email registered to your account, and we'll send you an email with instructions to update
                    your password.
                  </div>
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
                  <div className='actions'>
                    <PillButton type='submit' className='button' variant='outlined'>
                      Send
                    </PillButton>
                  </div>
                </form>
              ) : (
                <React.Fragment>
                  <div className='message'>An email has been sent containing instructions to update your password.</div>
                  <TextField
                    variant='outlined'
                    placeholder='Reset Code'
                    fullWidth={true}
                    className='input'
                    type='text'
                    name='code'
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
                  <div className='actions'>
                    <PillButton type='button' className='button' variant='outlined' onClick={this.submit}>
                      Confirm
                    </PillButton>
                  </div>
                </React.Fragment>
              )
            ) : (
              <React.Fragment>
                <div className='message'>{delivery.error}</div>
                <div className='actions'>
                  <PillButton type='button' className='button' variant='outlined' onClick={() => this.resetForm()}>
                    Try Again
                  </PillButton>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className='spacer' />
      </section>
    )
  }
}
