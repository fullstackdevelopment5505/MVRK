import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  useMediaQuery,
  Grid,
  SvgIcon,
  Container,
  Typography,
  Tab,
  Tabs,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

// internal components
import { Header, Footer, IHeaderMenuItem, Carousel, ICarouselSlide } from '../components/landing'

// content
import { landing as event } from '../utils/landing'

interface ISessionAgendaItem {
  title: string
  startTime: string
  endTime?: string
}

interface ISessionAgenda {
  type: string
  agenda: ISessionAgendaItem[]
}

interface IDailySchedule {
  date: string
  mobileDate: string
  dayOfWeek: string
  sessions: ISessionAgenda[]
}

interface IEventTypeBlock {
  name: string
  date: string
  descriptions: string[]
}

interface IFaqItem {
  question: string
  answer: string[]
}

const Landing = ({}) => {
  const classes = useStyles()
  // state and state handlers
  const [agendaState, setAgendaState] = useState({ activeIndex: 0 })

  const singleDayMs = 1000 * 60 * 60 * 24
  const autoRotateTimePerSlide = 7 * 1000

  const headerMenu: IHeaderMenuItem[] = [
    {
      href: '#agenda',
      displayName: 'Agenda'
    },
    {
      href: '#faq',
      displayName: 'FAQ'
    },
    {
      href: '#events',
      displayName: 'Events'
    }
  ]
  const isMobile = useMediaQuery('(max-width:960px)')

  const daysUntilEventBegins = Math.ceil((new Date(event.startDate).getTime() - new Date().getTime()) / singleDayMs)

  // display sections
  const buildEventTypeBlock = (eventType: IEventTypeBlock, index: number) => {
    return (
      <Grid item xs={12} md={6} key={index}>
        <div className={classes.eventTypeBlock}>
          <div className={classes.horizontalRuleOnLight} />

          <Typography variant='h4' classes={{ root: classes.subHeadingOnLight }} paragraph>
            {eventType.name}
          </Typography>

          <Typography variant='h6' paragraph>
            {eventType.date}
          </Typography>

          {eventType.descriptions.map((text, i) => (
            <Typography key={i} classes={{ root: classes.eventTypeDescription }} component='p' paragraph>
              {text}
            </Typography>
          ))}
        </div>
      </Grid>
    )
  }

  const buildFAQAccordionSection = (faq: IFaqItem, index: number) => {
    const sectionName = `faq-section-${index}`
    return (
      <Accordion key={index} classes={{ root: classes.accordion, expanded: classes.accordionExpanded }} square>
        <AccordionSummary
          classes={{ root: classes.accordionSummary, expanded: classes.accordionExpanded }}
          aria-controls={`${sectionName}-content`}
          id={`${sectionName}-header`}
          expandIcon={
            <SvgIcon classes={{ root: classes.accordionIcon }}>
              <ExpandMore />
            </SvgIcon>
          }
        >
          <Typography>{faq.question}</Typography>
        </AccordionSummary>

        <AccordionDetails classes={{ root: classes.accordionDetails }}>
          {faq.answer.map((text: string, i: number) => (
            <Typography component='p' paragraph key={`answer-p-${i}`} dangerouslySetInnerHTML={{ __html: text }} />
          ))}
        </AccordionDetails>
      </Accordion>
    )
  }

  const buildScheduleSessionsForDay = (session: ISessionAgenda, index: number) => {
    return (
      <div className={classes.sessionBlock} key={index}>
        <Typography variant='h4' classes={{ root: classes.subHeadingOnLight }} paragraph>
          {session.type}
        </Typography>
        <div className={classes.heavyHorizontalRuleOnLight} />

        {session.agenda.map((agendaBlock: ISessionAgendaItem, i: number) => (
          <div key={i}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={8} lg={9}>
                <Typography component='h6' dangerouslySetInnerHTML={{ __html: agendaBlock.title }} />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Typography component='h6'>
                  {`${agendaBlock.startTime} ${agendaBlock.endTime ? ` - ${agendaBlock.endTime}` : ''}`}
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.horizontalRuleOnLight} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={classes.page}>
      <Header showNav={true} menuItems={headerMenu} isMobile={isMobile} />

      {/* Title Carousel */}
      <div className={classes.lightSectionNoPadding}>
        <Carousel msPerSlide={autoRotateTimePerSlide} slides={event.carouselSlides} isMobile={isMobile} />
      </div>

      {/* Days Until */}
      <section className={isMobile ? classes.darkSectionMobile : classes.darkSection}>
        <Typography variant='h2' classes={{ root: classes.centeredSectionHeadingOnDark }}>
          {daysUntilEventBegins} {event.daysUntilTechWeek}
        </Typography>
      </section>

      <div className={isMobile ? classes.lightSectionMobile : classes.lightSection}>
        <Container>
          {/* Welcome */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant='h2' classes={{ root: classes.sectionHeadingOnLight }}>
                {event.welcomeToTechWeek}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* iterate over paragraphs */}
              {event.landingBlurbParagraphs.map((text, i) => (
                <Typography key={i} component='p' paragraph>
                  {text}
                </Typography>
              ))}
            </Grid>
          </Grid>

          {/* events */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography id='events' variant='h2' classes={{ root: classes.sectionHeadingOnLight }}>
                {event.techWeekEvents}
              </Typography>
            </Grid>
            <Grid container item xs={12} md={12}>
              {/* display individual event types */}
              {event.eventTypes.map(buildEventTypeBlock)}
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* FAQ */}
      <div id='faq' className={isMobile ? classes.darkSectionMobile : classes.darkSection}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant='h2' classes={{ root: classes.sectionHeadingOnDark }}>
                {event.faq}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h4' classes={{ root: classes.subHeadingOnDark }} paragraph>
                {event.generalQuestions}
              </Typography>
              <div className={classes.heavyHorizontalRuleOnDarkNoMarginBottom} />
              {event.questionsAndAnswers.map(buildFAQAccordionSection)}
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Tabed Event Agenda Breakdown */}
      <div id='agenda' className={isMobile ? classes.lightSectionMobile : classes.lightSection}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant='h2' classes={{ root: classes.sectionHeadingOnLight }}>
                {event.eventAgenda}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tabs
                classes={{ root: classes.scheduleTabs, indicator: classes.scheduleTabIndicator }}
                value={agendaState.activeIndex}
                onChange={(e: object, changeTo: number) => setAgendaState({ activeIndex: changeTo })}
              >
                {/* render individual tab handles */}
                {event.dailySchedule.map((schedule: IDailySchedule, tabInd: number) => {
                  const dayLabel = (
                    <>
                      {isMobile ? null : <Typography variant='caption'>{schedule.dayOfWeek},</Typography>}
                      <Typography variant='caption'>{isMobile ? schedule.mobileDate : schedule.date}</Typography>
                    </>
                  )
                  return (
                    <Tab
                      key={tabInd}
                      value={tabInd}
                      label={dayLabel}
                      disableRipple
                      classes={{ root: classes.scheduleTab }}
                    />
                  )
                })}
              </Tabs>

              {/* tab content */}
              {event.dailySchedule[agendaState.activeIndex].sessions.map(buildScheduleSessionsForDay)}
              <Typography variant='body2' paragraph>
                {event.dailyScheduleTimeZoneNote}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

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
const useStyles = makeStyles(() => ({
  page: {},
  date: {
    fontSize: 18,
    fontFamily: 'VerizonNHGBold',
    color: '#fff'
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  lightSection: {
    ...commonStyles.baseSection,
    backgroundColor: '#fff',
    color: '#000'
  },
  lightSectionMobile: {
    ...commonStyles.baseSection,
    ...commonStyles.mobileSection,
    backgroundColor: '#fff',
    color: '#000'
  },
  lightSectionNoPadding: {
    ...commonStyles.baseSection,
    backgroundColor: '#fff',
    color: '#000',
    padding: '0px'
  },
  darkSection: {
    ...commonStyles.baseSection,
    backgroundColor: '#000',
    color: '#fff'
  },
  darkSectionMobile: {
    ...commonStyles.baseSection,
    ...commonStyles.mobileSection,
    backgroundColor: '#000',
    color: '#fff'
  },
  sectionHeadingOnLight: {
    ...commonStyles.sectionHeading,
    color: '#000'
  },
  sectionHeadingOnDark: {
    ...commonStyles.sectionHeading,
    color: '#fff'
  },
  centeredSectionHeadingOnLight: {
    ...commonStyles.sectionHeading,
    textAlign: 'center',
    color: '#000'
  },
  centeredSectionHeadingOnDark: {
    ...commonStyles.sectionHeading,
    textAlign: 'center',
    color: '#fff'
  },
  subHeadingOnLight: {
    ...commonStyles.subHeading,
    color: '#000'
  },
  subHeadingOnDark: {
    ...commonStyles.subHeading,
    color: '#fff'
  },
  eventTypeBlock: {
    paddingBottom: '20px',
    paddingRight: '20px'
  },
  eventTypeDescription: {
    paddingRight: '12%'
  },
  horizontalRuleOnLight: {
    ...commonStyles.horizontalRule,
    borderColor: '#000'
  },
  heavyHorizontalRuleOnLight: {
    ...commonStyles.heavyHorizontalRule,
    borderColor: '#000'
  },
  horizontalRuleOnDark: {
    ...commonStyles.horizontalRule,
    borderColor: '#fff'
  },
  heavyHorizontalRuleOnDark: {
    ...commonStyles.heavyHorizontalRule,
    borderColor: '#fff'
  },
  heavyHorizontalRuleOnDarkNoMarginBottom: {
    ...commonStyles.heavyHorizontalRule,
    marginBottom: 0,
    borderColor: '#fff'
  },
  accordion: {
    backgroundColor: '#000',
    borderBottom: '2px solid #fff',
    color: '#fff'
  },
  accordionExpanded: {
    // any advice on who to appropriately override the accordion mui expanded state styles without !important
    marginTop: '0px !important',
    marginBottom: '0px !important'
  },
  accordionSummary: {
    paddingLeft: '0px'
  },
  accordionDetails: {
    display: 'block',
    paddingLeft: '0px'
  },
  accordionIcon: {
    color: '#fff'
  },
  sessionBlock: {
    width: '100%',
    fontWeight: 'bold',
    paddingBottom: '20px'
  },
  scheduleTabs: {
    marginBottom: '20px',
    borderBottom: '1px solid #D8DADA'
  },
  scheduleTabIndicator: {
    backgroundColor: '#D52B1E'
  },
  scheduleTab: {
    minWidth: '6vw',
    textTransform: 'none',
    fontSize: '.8rem',
    padding: '.25rem'
  }
}))

export default withRouter(Landing)
