import React from 'react'
import { ConfirmSignUp as AmplifyConfirmSignUp } from 'aws-amplify-react'
import TextField from '@material-ui/core/TextField'

import { PillButton } from 'components/shared'
import { ReactComponent as Logo } from 'assets/mvrk.svg'

export default class ConfirmSignUp extends AmplifyConfirmSignUp {
  showComponent() {
    return (
      <section className='sign-in'>
        <div className='login'>
          <Logo fill='black' width={150} className='logo' />
          <div className='login-form'>
            <div className='actions title-box'>
              <h3 className='title'>Confirmation Code</h3>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault()
                this.confirm()
              }}
            >
              <div className=''>
                <TextField
                  variant='outlined'
                  placeholder='Enter Your Code'
                  fullWidth={true}
                  className='input'
                  type='text'
                  name='code'
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='actions'>
                <PillButton type='submit' className='button' variant='outlined'>
                  Confirm
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
