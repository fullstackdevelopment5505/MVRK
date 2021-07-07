import React, { useState, ChangeEvent } from 'react'
import { I18n, Storage, Auth } from 'aws-amplify'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Theme,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText
} from '@material-ui/core'
import techPulseImg from '../assets/landing/TW20_PosterSubmission_Page_TechPulse.png'
import verizonLogo from '../assets/logo_vzm_dark.png'
import { IPoster } from 'types'
import { v4 as uuid } from 'uuid'
import { useDropzone } from 'react-dropzone'
import { PillButton } from 'components'

// internal components
import { Footer } from '../components/landing'
import { graphQLMutation } from '../graphql/helpers'
import { createPresenterDetails } from '../graphql/mutations'

interface IPosterRegErrors {
  fullName?: string
  email?: string
  coPresenterName?: string
  submissionNumber?: string
  posterTitle?: string
  posterImage?: string
  impactStatement?: string
}

const PosterSubmission = ({}) => {
  const classes = useStyles()

  const initialPoster: IPoster = {
    id: uuid(),
    fullName: '',
    email: '',
    coPresenterName: '',
    submissionNumber: '',
    posterTitle: '',
    posterImage: '',
    impactStatement: ''
  }

  const initialPosterErrors: IPosterRegErrors = {
    fullName: '',
    email: '',
    coPresenterName: '',
    submissionNumber: '',
    posterTitle: '',
    posterImage: '',
    impactStatement: ''
  }

  const [presenterDetails, setPresenterDetails] = useState<IPoster>(initialPoster)
  const [posterErrors, setPosterErrors] = useState<IPosterRegErrors>(initialPosterErrors)
  const [loading, setLoading] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<Number>(1)
  const [userConfirmedCopy, setUserConfirmedCopy] = useState<boolean>(false)
  const [userConfirmedCopyError, setUserConfirmedCopyError] = useState<boolean>(false)

  const isMobile = useMediaQuery('(max-width:960px)')

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: 'image/png'
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setPresenterDetails({
      ...presenterDetails,
      [target.name]: target.value
    })
  }

  const submitPoster = async () => {
    const hasErrors = posterFormHasErrors()
    if (!userConfirmedCopy) {
      setUserConfirmedCopyError(true)
    } else if (!hasErrors) {
      setSubmitError('')
      setLoading(true)
      setUserConfirmedCopyError(false)
      try {
        await createNewPresenterDetails()
        setCurrentStep(3)
      } catch (error) {
        setSubmitError(I18n.get('submitError'))
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const createNewPresenterDetails = async () => {
    const lowerCaseEmail: string = presenterDetails.email?.toLowerCase() || ''
    console.log('Create New Post Submission!')

    try {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0]
        const posterImage = `posters/${presenterDetails.id}.${file.type.split('/')[1]}`

        // eslint-disable-next-line
        await Storage.put(posterImage, file, { level: 'public', contentType: file.type })
        await graphQLMutation(createPresenterDetails, {
          ...presenterDetails,
          posterImage
        })
      } else {
        await graphQLMutation(createPresenterDetails, { ...presenterDetails })
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  const posterFormHasErrors = (): boolean => {
    const errorObj: IPosterRegErrors = {
      fullName: !presenterDetails.fullName ? 'Required' : '',
      email: !presenterDetails.email ? 'Required' : '',
      // coPresenterName: !presenterDetails.coPresenterName ? 'Required' : '',
      submissionNumber: !presenterDetails.submissionNumber ? 'Required' : '',
      posterTitle: !presenterDetails.posterTitle ? 'Required' : '',
      impactStatement: !presenterDetails.impactStatement ? 'Required' : ''
      // posterImage: !presenterDetails.posterImage ? 'Required' : '' //TODO flagged as not completely
    }
    const hasErrors = Object.keys(errorObj).some(key => errorObj[key] !== '')

    if (hasErrors) {
      setPosterErrors(errorObj)
      return true
    }

    return false
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // submitPoster()
      // activeRegSection === RegSection.company ? submitPoster() : advanceToCompanyForm()
    }
  }

  return (
    <div id='postersubmission' className={classes.page}>
      {/* Header */}
      <div className={isMobile ? classes.lightFormTopSection : classes.lightFormTopSection}>
        <Grid container justify='center'>
          <Grid xs={8} sm={8} item container alignItems='center' spacing={0}>
            <Grid item container id='122' xs alignItems='center'>
              <Typography variant='h4' classes={{ root: classes.bold }}>
                Tech Pulse
              </Typography>
            </Grid>
            <Grid item spacing={0}>
              <img className={classes.imgPulse} src={techPulseImg} alt='Tech Pulse Image' />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <hr className={classes.hrLine} />
          </Grid>
        </Grid>
      </div>
      {/* Form */}
      {currentStep === 1 && (
        <div className={isMobile ? classes.lightFormMobile : classes.lightFormSection}>
          <Grid container justify='center'>
            <Grid xs={8} sm={8} item container spacing={2} alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='h5' display='inline'>
                  Poster submission form
                </Typography>
                <p>
                  Congratulations on being accepted to Tech Pulse! We’re excited to have you share your work with peers
                  and leaders.
                </p>
                <p>
                  This year we’re having participants submit their posters using this submission form.
                  <span className={classes.bold}> Posters are due by Nov 6 at 5 PM PT. </span>
                  Our new submission process will streamline poster creations and submissions in an all-new digital
                  format.
                </p>
              </Grid>
              <Grid item container xs={12}>
                <PillButton onClick={() => setCurrentStep(2)} className={classes.button}>
                  Get started
                </PillButton>
              </Grid>
              <Grid item container xs={12}>
                <img src={verizonLogo} alt='verizon logo' />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      {currentStep === 2 && (
        <div className={isMobile ? classes.lightFormMobile : classes.lightFormSection}>
          <Grid container justify='center'>
            <Grid xs={8} sm={8} item container spacing={2} alignItems='center'>
              <Grid item container xs={12} justify='space-between' alignItems='flex-end'>
                <Grid item>
                  <Typography variant='h5' display='inline'>
                    Presenter details
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component='p' display='inline' paragraph>
                    <span className={`${classes.bold} ${classes.fontSize12}`}>Deadline: </span>
                    <span className={`${classes.bold} ${classes.fontSize12}`}>Nov 6 at 5 PM PT</span>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <p className={`${classes.fontSize12} ${classes.bold}`}>{I18n.get('oneSubmission')}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  error={!!posterErrors.fullName}
                  helperText={posterErrors.fullName}
                  onFocus={() => setPosterErrors({ ...posterErrors, fullName: '' })}
                  label={I18n.get('name')}
                  fullWidth
                  className={classes.input}
                  type='text'
                  name='fullName'
                  required
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  error={!!posterErrors.email}
                  helperText={posterErrors.email}
                  onFocus={() => setPosterErrors({ ...posterErrors, email: '' })}
                  label={I18n.get('email')}
                  fullWidth
                  className={classes.input}
                  type='text'
                  name='email'
                  required
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  error={!!posterErrors.coPresenterName}
                  helperText={posterErrors.coPresenterName}
                  onFocus={() => setPosterErrors({ ...posterErrors, coPresenterName: '' })}
                  label={I18n.get('coPresenterName')}
                  fullWidth
                  className={classes.input}
                  type='text'
                  name='coPresenterName'
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  error={!!posterErrors.submissionNumber}
                  helperText={posterErrors.submissionNumber}
                  onFocus={() => setPosterErrors({ ...posterErrors, submissionNumber: '' })}
                  label={I18n.get('submissionNumber')}
                  fullWidth
                  className={classes.input}
                  type='text'
                  name='submissionNumber'
                  required
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  error={!!posterErrors.posterTitle}
                  helperText={posterErrors.posterTitle}
                  onFocus={() => setPosterErrors({ ...posterErrors, posterTitle: '' })}
                  label={I18n.get('posterTitle')}
                  fullWidth
                  className={classes.input}
                  type='text'
                  name='posterTitle'
                  required
                  inputProps={{ maxLength: 135 }}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              {/* IMPACT */}
              <Grid item container xs={12}>
                <Typography variant='h5' display='inline'>
                  Impact statement*
                </Typography>
                <p className={classes.marginBottom0}>
                  Let us know some of the ways your work supports the company. What products rely on your systems or
                  what is a path from your work to customer/business impact? This can be just a couple of examples and
                  does not need to be comprehensive.
                </p>
                <p className={classes.marginBottom0}>
                  <span className={classes.bold}>Examples: </span>
                  <br />
                  The MX3 pipeline supports Gemini native advertising. Improvements in processing speed results in
                  faster input to our machine learning models, therefore adapting to new ads and increasing revenue
                  through improved budget models.
                </p>
                <p className={classes.marginBottom0}>
                  The Hadoop on prem grid supports all of our advertising data pipelines.
                </p>
                <TextField
                  multiline
                  rows={10}
                  variant='outlined'
                  error={!!posterErrors.impactStatement}
                  helperText={posterErrors.impactStatement}
                  onFocus={() => setPosterErrors({ ...posterErrors, impactStatement: '' })}
                  // label={I18n.get('Notes')}
                  fullWidth
                  className={classes.textAreaHeight}
                  type='text'
                  name='impactStatement'
                  required
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              {/* IMAGE UPLOAD */}
              <Grid item container xs={12}>
                <p className={classes.fontSize12}>{I18n.get('Poster image upload')}</p>
                <Grid item xs={12}>
                  <div className={classes.dragDropParent}>
                    <div {...getRootProps()} className={classes.dragDropButtonWrapper}>
                      <input {...getInputProps()} />
                      <PillButton className={classes.dragDropButton}>
                        <span className={classes.fontSize12}>{I18n.get('Select file')}</span>
                      </PillButton>
                    </div>
                    <div>
                      {isDragActive ? (
                        <p>{I18n.get('dropImage')}</p>
                      ) : acceptedFiles[0] ? (
                        <p>{acceptedFiles[0].name}</p>
                      ) : (
                        <p className={classes.fontSize12}>{I18n.get('No file selected')}</p>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid item container spacing={1} xs={12}>
                <p className={classes.fontSize12}>{I18n.get('imageReqs')}</p>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={userConfirmedCopyError}>
                  <FormControlLabel
                    classes={{ label: classes.checkboxLabel }}
                    control={
                      <Checkbox
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        className={classes.checkbox}
                        checked={userConfirmedCopy}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserConfirmedCopy(e.target.checked)}
                        inputProps={{ 'aria-label': 'copy is free of typos acknowledgement' }}
                      />
                    }
                    label={I18n.get('copyPolicy')}
                  />
                  <FormHelperText>{I18n.get('youMustConfirmToProceed')}</FormHelperText>
                </FormControl>
              </Grid>
              {submitError && (
                <Grid item container spacing={1} xs={12}>
                  <p className={classes.submitError}>{submitError}</p>
                </Grid>
              )}
              {/* CONTINUE */}
              <Grid item container xs={12}>
                <PillButton
                  loading={loading}
                  type='submit'
                  onClick={() => submitPoster()}
                  className={classes.button}
                  solid={true}
                >
                  Continue
                </PillButton>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      {currentStep === 3 && (
        <div className={isMobile ? classes.lightFormMobile : classes.lightFormSection}>
          <Grid container justify='center'>
            <Grid xs={8} sm={8} item container spacing={2} alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='h5' display='inline'>
                  Your poster has been submitted.
                </Typography>
                <p>Thank you for submitting your poster for Tech Pulse 2020. We've received your submission.</p>
                <p>If you have any questions, please email techweekevents@verizonmedia.com</p>
              </Grid>
              <Grid item container xs={12}>
                <img src={verizonLogo} alt='verizon logo' />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      <Footer />
    </div>
  )
}

interface ICombinedStyles {
  [key: string]: React.CSSProperties
}
// TODO: figure out how to not use :any here
const commonStyles: any = {
  sectionHeading: {
    fontSize: '3rem',
    fontWeight: 'bold'
  },
  subHeading: {
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  baseSection: {
    padding: '6rem 4rem'
  },
  mobileSection: {
    padding: '4rem 2rem'
  },
  horizontalRule: {
    borderTop: '1px solid',
    width: '100%',
    margin: '8px 0px'
  },
  heavyHorizontalRule: {
    borderTop: '2px solid',
    width: '100%',
    margin: '8px 0px'
  }
}

// TODO: figure out how to not use :any here
const useStyles = makeStyles((theme: Theme) => ({
  dragDropButtonWrapper: {
    marginLeft: '15px',
    marginRight: '15px'
  },
  dragDropParent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    minHeight: '90px',
    padding: '0 .5rem'
  },
  dragDropButton: {
    width: 110,
    backgroundColor: 'black',
    padding: '4px',
    textTransform: 'none',
    color: 'white',
    '& .MuiButton-root': {
      textTransform: 'default'
    }
  },
  button: {
    width: 165,
    marginRight: '20px',
    marginBottom: '20px',
    backgroundColor: 'black',
    textTransform: 'none',
    color: 'white',
    '& .MuiButton-root': {
      textTransform: 'default'
    }
  },
  textAreaHeight: {
    marginTop: '20px',
    width: '100%',
    '& .MuiInputBase-input': {
      color: '#000'
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#fff'
    },
    '& label': {
      color: theme.palette.grey[500]
    },
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    },
    '& .MuiInputBase-multiline:hover': {
      outline: '1px solid lightgray'
    },
    '& .MuiInputBase-multiline': {
      outline: 'none'
    }
  },
  fontSize12: {
    fontSize: '12px'
  },
  submitError: {
    fontSize: '12px',
    color: theme.palette.error.main
  },
  marginBottom0: {
    marginBottom: '0px'
  },
  bold: {
    fontFamily: 'Verizon-Bold',
    fontWeight: 'bold'
  },
  hrLine: {
    margin: '0px'
  },
  lightFormMobile: {
    ...commonStyles.mobileSection,
    backgroundColor: '#fff',
    color: '#000'
  },
  lightFormTopSection: {
    backgroundColor: '#fff',
    color: '#000'
  },
  lightFormSection: {
    ...commonStyles.baseSection,
    backgroundColor: '#fff',
    color: '#000'
  },
  input: {
    color: '#000 !important',
    borderRadius: 0,
    '& .MuiInputBase-input': {
      color: '#000 !important',
      WebkitBoxShadow: '0 0 0 100px #fff inset !important',
      WebkitTextFillColor: '#000'
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#fff'
    },
    '& label': {
      color: theme.palette.grey[500]
    },
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    }
  },
  checkbox: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '& .MuiIconButton-label': {
      color: '#000'
    }
  },
  checkboxLabel: {
    fontSize: '12px'
  },
  imgPulse: {
    width: '238px'
  },
  page: {
    backgroundColor: '#fff',
    color: '#000'
  }
}))

export default withRouter(PosterSubmission)
