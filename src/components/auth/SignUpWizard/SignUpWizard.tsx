import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Theme, createStyles, makeStyles, useMediaQuery, Grid } from '@material-ui/core'
import { Cache } from 'aws-amplify'
import classnames from 'classnames'

import { graphQLMutation } from 'graphql/helpers'
import { updateUser } from 'graphql/mutations'
import { Header, Footer } from 'components/landing'
import { StepData } from './StepProps'
import { IUser } from 'types'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import techWeekImg from 'assets/reg-bg.png'

enum WizardSteps {
  unknown = '0',
  step1 = '1',
  step2 = '2',
  confirm = '3'
}

interface WizardProps {
  user: IUser
}

export const SignUpWizard: FC<WizardProps> = ({ user }) => {
  const history = useHistory()
  const [currentStep, setStep] = useState<WizardSteps>(WizardSteps.step1)
  const [formValues, setFormValues] = useState<StepData>({})
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width:960px)')
  const authedUser = Cache.getItem('vx360-user')

  useEffect(() => {
    const queryStep = window.location.search.match(/\?step=(\d)/i)
    if (queryStep?.[1]) {
      if (!authedUser) {
        setStep(WizardSteps.step1)
        history.push('/registration?step=1')
      } else {
        setStep((queryStep?.[1] as WizardSteps) || WizardSteps.step1)
      }
      // console.log('setting step auto to:' + queryStep?.[1])
    }
  }, [])

  function updateFormValues(updatedFormValues: StepData) {
    setFormValues({
      ...formValues,
      ...updatedFormValues
    })
  }

  function handleStep1Complete(updatedFormValues: StepData) {
    updateFormValues(updatedFormValues)
    setStep(WizardSteps.step2)

    graphQLMutation(updateUser, { id: user.id, ...updatedFormValues })
  }

  function handleStep2Complete(updatedFormValues: StepData) {
    updateFormValues(updatedFormValues)
    setStep(WizardSteps.confirm)
  }

  function handleStep3Complete() {
    console.log('Step 3 Complete!')
  }

  return (
    <Paper elevation={0} square className={classes.paper}>
      <Header
        showNav
        navPills={true}
        isMobile={isMobile}
        menuItems={[
          {
            href: '/',
            displayName: 'Event Info'
          }
        ]}
      />

      <div
        className={classnames(classes.paperContainer, {
          [classes.backgroundFixedTop]: currentStep === WizardSteps.step2
        })}
      >
        <Grid container>
          <Grid container item sm={12} md={1} className={classes.filler} />
          <Grid container item md={5}>
            <div className={classes.steps}>
              {currentStep === WizardSteps.step1 && <Step1 formValues={formValues} onNextStep={handleStep1Complete} />}
              {currentStep === WizardSteps.step2 && <Step2 formValues={formValues} onNextStep={handleStep2Complete} />}
              {currentStep === WizardSteps.confirm && (
                <Step3 formValues={formValues} onNextStep={handleStep3Complete} />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer variant='dark' />
    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    paperContainer: {
      padding: '30px calc(1rem + 26px)',
      display: 'flex',
      flex: '1 1 auto',
      [theme.breakpoints.up('md')]: {
        backgroundAttachment: 'fixed',
        backgroundImage: `url(${techWeekImg})`,
        backgroundPosition: 'right -20vw top 40%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%'
      },
      [theme.breakpoints.up('lg')]: {
        backgroundAttachment: 'fixed',
        backgroundImage: `url(${techWeekImg})`,
        backgroundPosition: 'right 0 top 40%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%'
      }
    },
    backgroundFixedTop: {
      backgroundAttachment: 'initial',
      [theme.breakpoints.up('md')]: {
        backgroundPosition: 'right -20vw top 0'
      },
      [theme.breakpoints.up('lg')]: {
        backgroundPosition: 'right 0 top 0'
      }
    },
    steps: {
      maxWidth: 600,
      margin: 'auto 0'
    },
    filler: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  })
)
