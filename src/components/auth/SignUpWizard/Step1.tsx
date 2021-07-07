import React, { FC, useState } from 'react'
import { Cache } from 'aws-amplify'
import axios from 'axios'
import { useFormik } from 'formik'
import { Box, Typography, createStyles, makeStyles } from '@material-ui/core'
import * as Yup from 'yup'
import { v4 as uuid } from 'uuid'

import { Field, PillButton } from 'components/shared'
import { StepProps } from './StepProps'

import { userByEmail } from 'graphql/queries'
import { generateUser } from 'graphql/customMutations'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'
import { IUser } from 'types'
import { clientId, generateKey } from 'helpers'

export interface Step1Form {
  emailAddress: string
}

const SignupSchema = Yup.object().shape({
  emailAddress: Yup.string().email('Invalid email').required('Required')
})

const initiateB2BLogin = (b2bHint: string) => {
  const local = false
  // swap out un/commented link for local vs dev deployed development
  let redirectUri = 'https://dev.d2o6b06bpexdr7.amplifyapp.com/auth/b2b_redir'
  if (local) {
    redirectUri = 'https://localhost:3000/auth/b2b_redir'
  }
  const state = generateKey()
  const nonce = generateKey()
  window.location.assign(
    `https://id-uat.b2b.verizonmedia.com/identity/oauth2/authorize?realm=/techweek&client_id=${clientId}&response_type=code&scope=openid%20profile%20email%20oath:username%20fedidp:sub%20agency&redirect_uri=${redirectUri}&state=${state}&nonce=${nonce}&login_hint=${b2bHint}`
  )
}

const findUserInPostAuthDb = async (email: string): Promise<IUser> => {
  const foundUser: IUser = await graphQLQuery(userByEmail, 'userByEmail', {
    email
  })
  return foundUser
}

const createMvrkUserWithInviteData = async userInfo => {
  // user does not exist in our system, create them and send to register page
  const lowerEmail = userInfo.secondaryKey?.toLowerCase?.() || userInfo.userKey.toLowerCase()

  await graphQLMutation(generateUser, {
    id: uuid(),
    email: lowerEmail,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    viewOnlyTicket: userInfo.events?.length === 0,
    invitedTo: userInfo.events || []
  })
}

const checkUserInPreAuth = async (value: string) => {
  const res = await axios.get(
    `https://uyuvbc8vi6.execute-api.us-east-1.amazonaws.com/dev/users/1928272?email=${encodeURIComponent(
      value.toLowerCase()
    )}`
  )
  return res.data
}

Cache.removeItem('vx360-user')
Cache.removeItem('vx360-access')

export const Step1: FC<StepProps> = ({ formValues, onNextStep }) => {
  const classes = useStyles()
  const [userNotInvited, setUserNotInvited] = useState<boolean>(false)
  const [b2bSignUpInitiated, setB2bSignUpInitiated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const oidcLogin = async (email: string, setUserNotAllowed, setB2bSignUpInitiated) => {
    const preAuthUser = await checkUserInPreAuth(email)
    setLoading(true)
    setUserNotInvited(false)
    if (preAuthUser?.id) {
      const regUser = await findUserInPostAuthDb(preAuthUser.secondaryKey || preAuthUser.userKey)
      // pre-auth user is found
      if (preAuthUser?.secondaryKey) {
        // this is a verizon user who is registered even if they are not in our system
        if (!regUser) {
          await createMvrkUserWithInviteData(preAuthUser)
        }
        initiateB2BLogin(preAuthUser.userKey)
      } else {
        // this is not a verizion user, so we need to check if they exist already in our post auth db
        // where their reg data ususally exists. If they do not exist in this db, then we can say they are not-registered
        if (regUser) {
          initiateB2BLogin(regUser.email!)
        } else {
          // this user is a non-verizon user and they have not previously gotten past the b2b step,
          // send them a b2b registration email so they can setup a b2b account
          try {
            await createMvrkUserWithInviteData(preAuthUser)
            const { data } = await axios.post('https://uyuvbc8vi6.execute-api.us-east-1.amazonaws.com/dev/crestAuth', {
              email: preAuthUser.userKey
            })
            setB2bSignUpInitiated(true)
            setLoading(false)
            // Error Messages from unsuccessful register call
          } catch (err) {
            setLoading(false)
            console.error(err)
          }
        }
      }
    } else {
      setUserNotAllowed()
      setLoading(false)
    }
  }

  const formik = useFormik<Step1Form>({
    onSubmit: data => {
      oidcLogin(data.emailAddress, () => setUserNotInvited(true), setB2bSignUpInitiated)
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    initialValues: {
      emailAddress: formValues.emailAddress || ''
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant='h1' classes={{ root: classes.pageTitle }}>
        Tech Week
        <br />
        2020
      </Typography>

      <Typography paragraph>
        We are excited for you to experience Tech Week 2020. Please enter the email address to which your invitation was
        sent.
      </Typography>

      <Typography paragraph>Looking forward to seeing you there!</Typography>

      <Box marginY={4}>
        <Field fullWidth formik={formik} label='Primary email address' name='emailAddress' type='string' />
      </Box>
      {userNotInvited && (
        <Typography paragraph>
          This email has not been verified as a member of Tech Week. If you believe you are receiving this message in
          error, please try again using your primary email address. If you have any questions, please contact&nbsp;
          <a href='mailto:techweekevents@verizonmedia.com'>techweekevents@verizonmedia.com</a>.
        </Typography>
      )}

      {b2bSignUpInitiated && (
        <Typography paragraph>
          An email has been sent to {formik.values.emailAddress}. Please check your email to continue with registration.
        </Typography>
      )}

      <PillButton type='submit' size='large' className='button' solid={true} loading={loading}>
        Continue
      </PillButton>
    </form>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    pageTitle: {
      marginBottom: 30,
      fontSize: 62,
      fontWeight: 700
    }
  })
)
