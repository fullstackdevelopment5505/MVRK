import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Cache } from 'aws-amplify'
import { Box, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'

import { userByEmail } from 'graphql/queries'
import { graphQLQuery } from 'graphql/helpers'
import { StepProps } from './StepProps'
import { PillButton } from 'components/shared'
import { IUser } from 'types'
import { GoogleCalendarLink } from 'helpers'
import { landing } from 'utils'

export const Step3: FC<StepProps> = ({ formValues }) => {
  const classes = useStyles()
  const history = useHistory()
  const [user, setUser] = useState<IUser>()
  const authedUser = Cache.getItem('vx360-user')

  const apiFetchUser = async authedUser => {
    try {
      const foundUser = await graphQLQuery(userByEmail, 'userByEmail', { email: authedUser.email })
      setUser(foundUser)
    } catch (e) {
      setUser(authedUser)
      console.error(e)
    }
  }

  useEffect(() => {
    if (!authedUser) {
      history.push('/registration?step=1')
    } else {
      apiFetchUser(authedUser)
    }
  }, [])

  function renderEventType(eventNameKey: string) {
    let eventType

    landing.eventTypes.some(event => {
      if (event.key === eventNameKey) {
        eventType = event
        return true
      }
    })

    if (!eventType) {
      return null
    }

    return (
      <Grid item xs={6} className={classes.eventDescription} key={eventNameKey}>
        <strong>{eventType.name}</strong>
        <br />
        {eventType.date}
      </Grid>
    )
  }

  return (
    <div>
      <Typography variant='h1' classes={{ root: classes.pageTitle }}>
        Thank you for
        <br />
        registering to
        <br />
        Tech Week 2020!
      </Typography>
      {Array.isArray(user?.rsvp) && (
        <>
          <Typography paragraph className={classes.subtitle}>
            You are confirmed to attend:
          </Typography>
          <Grid container spacing={4}>
            {user?.rsvp?.map(renderEventType)}
          </Grid>
          <Box marginY={4}>
            <Typography paragraph>
              Please review the agenda to get familiar with the new virtual format. See you soon! If you have questions,
              please email{' '}
              <a
                rel='noopener noreferrer'
                target='_blank'
                href='mailto:techweekevents@verizonmedia.com'
                style={{ color: '#000' }}
              >
                techweekevents@verizonmedia.com
              </a>
              .
            </Typography>
          </Box>
        </>
      )}

      <Grid container spacing={4}>
        <Grid item>
          <PillButton solid classes={{ root: classes.button }} href={GoogleCalendarLink}>
            Add To Calendar
          </PillButton>

          <PillButton
            color='secondary'
            backgroundColor='transparent'
            classes={{ root: classes.button }}
            href='https://techweek2020.com'
          >
            Event Info
          </PillButton>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    subtitle: {
      fontSize: '1.25rem',
      lineHeight: '1.25rem',
      marginBottom: 30
    },
    pageTitle: {
      marginBottom: 30,
      fontSize: '62px',
      lineHeight: '62px',
      fontWeight: 700
    },
    eventDescription: {
      lineHeight: '1.3rem',
      '& > strong': {
        fontFamily: 'Verizon-Bold',
        fontWeight: 700,
        fontSize: '18px'
      }
    },
    button: {
      width: 'auto',
      minWidth: '160px',
      marginRight: '20px'
    }
  })
)
