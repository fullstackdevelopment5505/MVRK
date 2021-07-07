import React, { FC, useMemo, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useHistory } from 'react-router-dom'
import { Cache, Storage } from 'aws-amplify'
import { useFormik } from 'formik'
import cn from 'classnames'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  Typography,
  createStyles,
  makeStyles,
  Tooltip,
  FormHelperText
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as Yup from 'yup'

import { Field, PillButton } from 'components/shared'
import { userByEmail } from 'graphql/queries'
import { userCompletedReg } from 'graphql/customMutations'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'
import { landing } from 'utils'
import { ITimezone, IUser } from 'types'
import { countries, timezones } from 'helpers'
import { hasFieldError } from 'helpers/formik/hasFieldError'
import { StepProps } from './StepProps'
import { topicsOfInterest } from './topics'

export interface Step2Form {
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  timeZone: string
  tshirtSize: string
  team: string
  accommodations: string
  classes?: string
  interested: string[]
  rsvp: number[]
  terms: boolean
}

const Step2AttendeeSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  timeZone: Yup.string().required('Required'),
  tshirtSize: Yup.string().required('Required'),
  team: Yup.string(),
  accommodations: Yup.string(),
  terms: Yup.boolean().oneOf([true], 'Must accept Terms & Conditions')
})

const Step2ViewerSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  timeZone: Yup.string().required('Required'),
  accommodations: Yup.string(),
  terms: Yup.boolean().oneOf([true], 'Must accept Terms & Conditions')
})

enum ERegUserMode {
  unknown,
  attendee,
  viewer
}
export const Step2: FC<StepProps> = ({ formValues, onNextStep }) => {
  const classes = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUser>()
  const [regUserMode, setRegUserMode] = useState<ERegUserMode>(ERegUserMode.attendee)

  const authedUser = Cache.getItem('vx360-user')

  const apiFetchUser = async authedUser => {
    try {
      const foundUser = await graphQLQuery(userByEmail, 'userByEmail', { email: authedUser.email })
      setUserData(foundUser)
      if (foundUser.viewOnlyTicket) {
        setRegUserMode(ERegUserMode.viewer)
      } else {
        setRegUserMode(ERegUserMode.attendee)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!authedUser) {
      history.push('/registration?step=1')
    }
    setUserData(authedUser)
    apiFetchUser(authedUser)
  }, [])

  const initialValues = useMemo<Step2Form>(
    () => ({
      id: userData?.id,
      firstName: authedUser?.given_name || '',
      lastName: authedUser?.family_name || '',
      street: formValues.street || '',
      city: formValues.city || '',
      state: formValues.state || '',
      zip: formValues.zip || '',
      country: formValues.country || '',
      timeZone: formValues.timeZone || '',
      tshirtSize: formValues.tshirtSize || '',
      team: formValues.team || '',
      accommodations: formValues.accommodations || '',
      interested: formValues.interested || [],
      rsvp: formValues.rsvp || [],
      terms: formValues.terms || false
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    []
  )

  const updateDbUser = async formData => {
    setLoading(true)
    try {
      let avatar = ''
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0]
        avatar = `${formData.id}.${file.type.split('/')[1]}`

        // eslint-disable-next-line
        await Storage.put(avatar, file, { level: 'public', contentType: file.type })
      }
      await graphQLMutation(userCompletedReg, {
        id: userData?.id,
        avatar: avatar,
        phoneNumber: formData.phoneNumber,
        company: formData.company,
        companySize: formData.companySize,
        companyAddress1: formData.street,
        companyCity: formData.companyCity,
        companyState: formData.companyState,
        companyPostalCode: formData.companyPostalCode,
        address1: formData.address1,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        country: formData.country,
        title: formData.title,
        timeZone: formData.timeZone,
        team: formData.team,
        interests: formData.interested,
        tShirt: formData.tshirtSize,
        accessibilityNeeds: formData.accommodations,
        rsvp: formData.rsvp.map(rsvpIndex => {
          return landing.eventTypes[rsvpIndex].key
        })
        // the the event key name instead of the index
      })
      setLoading(false)
      onNextStep(formData)
    } catch (e) {
      setLoading(false)
      console.error('There was an error submitting the registration completion')
      console.error(e)
      return
    }
  }

  const formik = useFormik<Step2Form>({
    onSubmit: updateDbUser,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: authedUser?.events?.length > 0 ? Step2AttendeeSchema : Step2ViewerSchema,
    initialValues
  })

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: 'image/jpeg, image/png'
  })

  return (
    <form onSubmit={formik?.handleSubmit}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography component='h1' variant='h1' classes={{ root: classes.title }}>
                Tech Week
                <br />
                2020
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component='h3' variant='h3' className={classes.subtitle}>
                Profile Information
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} classes={{ root: classes.row }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field
                fullWidth
                formik={formik}
                label='First name'
                name='firstName'
                InputProps={{ classes: { root: classes.outlinedInput } }}
                margin='dense'
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                fullWidth
                formik={formik}
                label='Last name'
                name='lastName'
                InputProps={{ classes: { root: classes.outlinedInput } }}
                margin='dense'
              />
            </Grid>
          </Grid>
        </Grid>

        {regUserMode === ERegUserMode.attendee && (
          <>
            <Grid item xs={12} classes={{ root: classes.row }}>
              <Typography component='h3' variant='h3' className={classes.subtitle}>
                Upload profile picture
              </Typography>
            </Grid>
            <Grid item container xs={12} className={classes.avatarContainer}>
              <div {...getRootProps()} className={classes.inlineAvatarUpload}>
                <input {...getInputProps()} />
                <PillButton
                  loading={loading}
                  onClick={() => {}}
                  backgroundColor='solid'
                  className={classes.inlinePillButton}
                  solid
                >
                  Select File
                </PillButton>
                <Typography variant='body2'>
                  {acceptedFiles[0] ? <>Selected Image: {acceptedFiles[0].name}</> : <>No file selected</>}
                </Typography>
              </div>
            </Grid>
            <Grid>
              <Typography component='p' variant='body1'>
                Please upload a .png or .jpg file
              </Typography>
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <FormControl fullWidth error={hasFieldError(formik, 'tshirtSize')}>
                <InputLabel
                  classes={{
                    root: classes.selectorLabel,
                    shrink: classes.selectorLabelShrink
                  }}
                  id='tshirtSize'
                >
                  T-Shirt Size (unisex)
                </InputLabel>
                <Select
                  margin='dense'
                  labelId='tshirtSize'
                  id='tshirtSize'
                  defaultValue={initialValues.tshirtSize}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  label='tshirtSize'
                  name='tshirtSize'
                  classes={{
                    root: `${classes.selector} ${classes.outlinedInput}`,
                    selectMenu: classes.selectMenuOptionsPane
                  }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='xs'>XS</MenuItem>
                  <MenuItem value='sm'>S</MenuItem>
                  <MenuItem value='md'>M</MenuItem>
                  <MenuItem value='lg'>L</MenuItem>
                  <MenuItem value='xl'>XL</MenuItem>
                  <MenuItem value='2xl'>2XL</MenuItem>
                  <MenuItem value='3xl'>3XL</MenuItem>
                  <MenuItem value='4xl'>4XL</MenuItem>
                  <MenuItem value='5xl'>5XL</MenuItem>
                </Select>

                {hasFieldError(formik, 'tshirtSize') && <FormHelperText>{formik?.errors?.tshirtSize}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <Typography component='h3' variant='h3' className={classes.subtitle}>
                Work from home mailing address
              </Typography>
              <Typography component='p' variant='body1'>
                There will be a chance to win swag during the event, so please enter your mailing address to opt in for
                any swag.
              </Typography>
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <Field
                fullWidth
                formik={formik}
                label='Street'
                name='street'
                InputProps={{ classes: { root: classes.outlinedInput } }}
                margin='dense'
              />
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <Field
                fullWidth
                formik={formik}
                label='City'
                name='city'
                InputProps={{ classes: { root: classes.outlinedInput } }}
                margin='dense'
              />
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <Field
                fullWidth
                formik={formik}
                label='State'
                name='state'
                InputProps={{ classes: { root: classes.outlinedInput } }}
                margin='dense'
              />
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <Field
                fullWidth
                formik={formik}
                label='Zip Code'
                name='zip'
                InputProps={{ classes: { root: classes.outlinedInput } }}
                margin='dense'
              />
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <FormControl fullWidth error={hasFieldError(formik, 'country')}>
                <InputLabel
                  classes={{
                    root: classes.selectorLabel,
                    shrink: classes.selectorLabelShrink
                  }}
                  id='country'
                >
                  Country
                </InputLabel>
                <Select
                  margin='dense'
                  labelId='country'
                  id='country'
                  defaultValue={initialValues.country}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  label='Country'
                  name='country'
                  classes={{
                    root: `${classes.selector} ${classes.outlinedInput}`,
                    selectMenu: classes.selectMenuOptionsPane
                  }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {countries.map((countryName: string, countryIndex: number) => (
                    <MenuItem value={countryName} key={countryIndex}>
                      {countryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {hasFieldError(formik, 'country') && <FormHelperText>{formik?.errors?.country}</FormHelperText>}
            </Grid>
          </>
        )}

        <Grid item xs={12} classes={{ root: classes.row }}>
          <FormControl fullWidth error={hasFieldError(formik, 'timeZone')}>
            <InputLabel
              classes={{
                root: classes.selectorLabel,
                shrink: classes.selectorLabelShrink
              }}
              id='timeZone'
            >
              Time Zone
            </InputLabel>
            <Select
              margin='dense'
              labelId='timeZone'
              id='timeZone'
              defaultValue={initialValues.timeZone}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              label='timeZone'
              name='timeZone'
              classes={{
                root: `${classes.selector} ${classes.outlinedInput}`,
                selectMenu: classes.selectMenuOptionsPane
              }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {timezones.map((t: ITimezone) => (
                <MenuItem value={t.value}>{t.text}</MenuItem>
              ))}
            </Select>

            {hasFieldError(formik, 'timeZone') && <FormHelperText>{formik.errors.timeZone}</FormHelperText>}
          </FormControl>
        </Grid>

        {regUserMode === ERegUserMode.attendee && (
          <>
            <Grid item xs={12} classes={{ root: classes.row }}>
              <Field
                fullWidth
                formik={formik}
                label='What team are you on? (Optional)'
                name='team'
                InputProps={{ classes: { root: classes.outlinedInput } }}
                margin='dense'
              />
            </Grid>

            <Grid item xs={12} classes={{ root: classes.row }}>
              <Typography component='p' variant='body1'>
                What are your topics of interest?
              </Typography>
            </Grid>

            {/* Topics of Interest */}
            <Grid item xs={12} classes={{ root: classes.row }}>
              <Grid container>
                {topicsOfInterest.map(topic => (
                  <Grid item xs={6} key={topic.value}>
                    <Tooltip title={topic.description} placement='right' classes={{ tooltip: classes.interestTooltip }}>
                      <FormControlLabel
                        label={topic.name}
                        control={
                          <Checkbox
                            name='interested'
                            classes={{
                              root: classes.checkbox
                            }}
                            defaultChecked={initialValues.interested.includes(topic.value)}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            value={topic.value}
                          />
                        }
                      />
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={12} classes={{ root: classes.row }}>
          <Typography component='p' variant='body1'>
            We are committed to accessibility. Please let us know if you require any specific accommodations for the
            event.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            formik={formik}
            label='Accommodations'
            name='accommodations'
            InputProps={{ classes: { root: classes.outlinedInput } }}
            margin='dense'
          />
        </Grid>

        {/* Terms and Conditions */}
        <Grid item xs={12} classes={{ root: classes.row }}>
          <FormControl error={hasFieldError(formik, 'terms')}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      classes={{
                        root: classes.checkbox
                      }}
                      defaultChecked={initialValues.terms}
                      id='signup-terms'
                      name='terms'
                      onBlur={formik?.handleBlur}
                      onChange={formik?.handleChange}
                      value={true}
                    />
                  }
                  label=''
                />
              </Grid>
              <Grid item xs={11}>
                <Typography component='p' style={{ paddingTop: '8px' }}>
                  I agree to the terms and conditions listed below.*
                  {hasFieldError(formik, 'terms') && <FormHelperText>{formik.errors.terms}</FormHelperText>}
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={11}>
                <div className={classes.termsAndConditions}>
                  <Typography component='label' variant='body1' htmlFor='signup-terms'>
                    By submitting to the terms and conditions of this agreement, I agree that Verizon Media may use the
                    data I provide to contact me with information about related products and services. To learn more,
                    please view Verizon Media’s Privacy Policy and Verizon Media’s Terms of Service for the US. For
                    those in Canada, please view Verizon Media’s Privacy Policy and Verizon Media’s Terms of Service. If
                    I am an interactive participant at the Event, I irrevocably consent to being recorded (e.g.,
                    photographed, filmed, audiotaped, or videotaped) and simultaneously live streamed/broadcast, and
                    release Verizon Media and users of such recordings from liability or loss or damage to persons or
                    property or for infringement of any rights. Further, I expressly authorize and permit use of my
                    name, likeness and voice and all reproductions thereof throughout the world in perpetuity without
                    limitation and without any compensation. I acknowledge that Verizon Media is the exclusive owner of
                    the live stream and recordings and any proceeds related thereto. The live stream and recordings are
                    for Verizon Media’s use only. I agree not to make my own recordings of the event. Verizon Media is
                    not responsible for the content or accuracy of speakers’ statements, presentations, or sessions. The
                    views and opinions expressed by speakers are their own and do not imply an endorsement or
                    recommendation by Verizon Media. You are responsible for reviewing all information and performing
                    your own diligence before taking any actions with respect to the speaker’s topic. GDPR: For EU
                    residents, please visit Verizon Media EMEA Limited’s Privacy Policy to learn more about the data
                    that Verizon Media EMEA Limited collects, the purposes for collection, and your rights in relation
                    to such data. CCPA Notice at Collection: For California consumers, please visit Verizon Media’s
                    California Privacy Rights page to learn more about the categories of personal information Verizon
                    Media collects and the purposes for collection.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>

        {/* RSVP to Events */}
        {regUserMode === ERegUserMode.attendee && (
          <>
            <Grid item xs={12} classes={{ root: classes.row }}>
              <Typography component='h3' variant='h3' className={classes.subtitle}>
                Please RSVP to the events below:
              </Typography>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.row }}>
              {landing.eventTypes.map((eventType, eventTypeIndex) => {
                const userHasEvent = (userData?.invitedTo || []).indexOf(eventType.key) >= 0
                return userHasEvent ? (
                  <div className={classes.rsvpBlock} key={eventTypeIndex}>
                    <FormControlLabel
                      label=''
                      control={
                        <Checkbox
                          classes={{
                            root: cn(classes.checkbox, classes.rsvpCheckbox)
                          }}
                          defaultChecked={initialValues.rsvp.includes(eventTypeIndex)}
                          name='rsvp'
                          onBlur={formik?.handleBlur}
                          onChange={formik?.handleChange}
                          value={eventTypeIndex}
                        />
                      }
                    />
                    <Accordion square classes={{ root: classes.accordion }}>
                      <AccordionSummary
                        classes={{ root: classes.rsvpHeader }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id={`panel1a-header-${eventTypeIndex}`}
                      >
                        <div>
                          <Typography component='h3' className={classes.eventTitle}>
                            {eventType.name}
                          </Typography>
                          <Typography component='h5'>{eventType.date}</Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {eventType.descriptions.map((description, index) => (
                          <Typography key={index}>{description}</Typography>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ) : null
              })}
            </Grid>
          </>
        )}
      </Grid>

      {formik?.submitCount && !formik?.isValid ? (
        <FormHelperText className={classes.error}>Please fill in all required fields</FormHelperText>
      ) : null}

      <PillButton type='submit' size='large' solid classes={{ root: classes.submitPill }}>
        Continue
      </PillButton>
    </form>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 62,
      fontWeight: 700,
      marginBottom: 30
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 700
    },
    outlinedInput: {
      borderRadius: 0,
      borderBottom: '1px solid black'
    },
    mobileImage: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '35rem',
      minWidth: '100%'
    },
    image: {
      backgroundSize: 'cover',
      height: '42rem'
    },
    row: {
      marginTop: '2rem'
    },
    error: {
      color: theme.palette.error.main
    },
    eventTitle: {
      fontSize: 16,
      fontFamily: 'Verizon-Bold'
    },
    accordion: {
      boxShadow: 'none',
      marginBottom: '1rem',
      background: 'transparent',
      marginTop: '0 !important'
    },
    button: {
      minWidth: 165,
      marginTop: '1rem',
      [theme.breakpoints.down('md')]: {
        marginBottom: '1rem'
      }
    },
    // dragDrop: {
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   minHeight: 80,
    //   backgroundColor: 'transparent',
    //   marginBottom: '1rem',
    //   cursor: 'pointer',
    //   padding: '0 .5rem',
    //   '& span': {
    //     textDecoration: 'underline',
    //     cursor: 'pointer'
    //   }
    // },
    heading: {
      fontWeight: 700,
      fontSize: '3.125rem',
      lineHeight: '3.125rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '3rem',
        lineHeight: '3rem'
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: '2rem'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
        lineHeight: '2rem'
      }
    },
    input: {
      color: '#000',
      borderRadius: 0,
      '& .MuiInputBase-root': {
        backgroundColor: '#fff'
      },
      '& label': {
        color: '#777'
      },
      '& fieldset': {
        borderRadius: 0,
        borderColor: '#dadada',
        borderBottomColor: '#000'
      }
    },
    inlineButton: {
      color: '#000',
      margin: '0 .5rem',
      fontFamily: 'Verizon-Regular',
      textDecoration: 'underline'
    },
    spaceAbove: {
      marginTop: '2rem'
    },
    avatarContainer: {
      backgroundColor: '#F2F2F2',
      marginTop: '1rem'
    },
    inlineAvatarIcon: {
      position: 'relative',
      top: '12px',
      display: 'inline-block',
      marginTop: '20px',
      marginRight: '20px'
    },
    inlineAvatarUpload: {
      display: 'flex',
      alignItems: 'center',
      padding: '1.25rem 1rem'
    },
    inlinePillButton: {
      minWidth: 165,
      marginRight: '1rem',
      marginTop: 0,
      [theme.breakpoints.down('md')]: {
        marginBottom: '1rem'
      }
    },
    interestTooltip: {
      backgroundColor: '#fff',
      color: 'rgba(0, 0, 0, 0.87)',
      border: '2px solid #000',
      padding: '8px',
      fontSize: 18
    },
    selectMenuOptionsPane: {
      maxheight: '400px',
      scroll: 'auto'
    },
    selector: {
      padding: '10px 34px 10px 10px',
      border: '1px solid rgba(0, 0, 0, 0.23);'
    },
    selectorLabel: {
      transform: 'translate(10px, 30px) scale(1)'
    },
    selectorLabelShrink: {
      transform: 'translate(0, 1.5px) scale(0.75)'
    },
    submitPill: {
      marginTop: '20px'
    },
    termsAndConditions: {
      padding: '4px',
      border: '1px solid black',
      fontSize: '12px',
      overflowY: 'auto',
      height: '80px'
    },
    checkbox: {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      },
      '&.Mui-checked': {
        color: '#000',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
      }
    },
    rsvpCheckbox: {
      marginRight: 0,
      marginTop: 4
    },
    rsvpBlock: {
      borderTop: '1px solid black',
      display: 'flex',
      alignItems: 'flex-start'
    },
    rsvpHeader: {
      minHeight: '48px !important',

      '& > .Mui-expanded': {
        margin: '12px 0'
      }
    }
  })
)
