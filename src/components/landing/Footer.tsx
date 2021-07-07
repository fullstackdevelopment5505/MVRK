import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, useMediaQuery, Link, useTheme } from '@material-ui/core'
// assets
import logo from 'assets/logo_vzm_light.png'
import logoDark from 'assets/logo_vzm_dark.png'
interface FooterProps {
  showLinks?: boolean
  variant?: 'light' | 'dark'
}
export const Footer: FC<FooterProps> = ({ showLinks = true, variant = 'dark' }) => {
  const classes = useStyles({ showLinks, variant })
  const isMobile = useMediaQuery('(max-width:960px)')
  const theme = useTheme()

  const footerLinksDisplay = (
    <Grid container item sm={12} md={10}>
      <div className={isMobile ? classes.footerLinksMobile : classes.footerLinks}>
        <Typography variant='body1'>
          <Link
            href='https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html'
            color='inherit'
            classes={{ root: classes.link }}
          >
            Privacy Policy
          </Link>
        </Typography>
        <Typography variant='body1'>
          <Link
            href='https://www.verizonmedia.com/policies/us/en/verizonmedia/terms/otos/index.html'
            color='inherit'
            classes={{ root: classes.link }}
          >
            Terms &amp; Conditions
          </Link>
        </Typography>
        <Typography variant='body1'>&copy; 2020 Verizon</Typography>
      </div>
    </Grid>
  )

  return (
    <footer className={showLinks ? classes.footer : classes.footerNoLinks}>
      <div
        className={
          showLinks
            ? classes.footerBottomSection
            : isMobile
            ? classes.footerBottomNoLinksMobile
            : classes.footerBottomNoLinks
        }
      >
        <Grid container>
          <Grid container item sm={12} md={1} />
          {showLinks ? footerLinksDisplay : null}
        </Grid>
      </div>
    </footer>
  )
}

const useStyles = makeStyles(theme => ({
  footer: (props: FooterProps) => ({
    backgroundColor: props.variant === 'light' ? '#fff' : '#000',
    color: props.variant === 'light' ? '#000' : '#FFF',
    minHeight: '100px',
    padding: '2rem 2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 4rem'
    }
  }),
  footerNoLinks: {
    backgroundColor: '#000',
    color: '#FFF',
    minHeight: '100px',
    padding: '2rem'
  },
  footerSection: {
    margin: '0 auto',
    paddingTop: '1rem'
  },
  section: {
    borderRight: '1px solid #747676',
    borderBottom: '1px solid #747676'
  },
  sectionLast: {
    borderBottom: '1px solid #747676'
  },
  mobileSection: {
    border: 'none'
  },
  mobileSectionLast: {
    borderBottom: 'none'
  },
  sectionHeader: {
    width: '85%',
    borderBottom: '1px solid #FFF',
    margin: '0 auto .5rem',
    paddingBottom: 8,
    fontSize: 14
  },
  list: {
    width: '85%',
    margin: '0 auto',
    paddingBottom: '4rem'
  },
  listItem: {
    paddingLeft: 0,
    cursor: 'pointer',
    fontSize: '14px'
  },
  footerBottomSection: {
    margin: '1rem auto',
    paddingTop: '1rem',
    display: 'flex'
  },
  footerBottomNoLinks: {
    margin: '1rem 0 1rem 40px',
    paddingTop: '1rem',
    display: 'flex'
  },
  footerBottomNoLinksMobile: {
    margin: '1rem 0',
    paddingTop: '1rem',
    display: 'flex'
  },
  smallLogoContainer: {
    marginLeft: '1rem',
    width: '25%'
  },
  smallLogoContainerMobile: {
    marginLeft: '-1rem',
    width: '25%'
  },
  smallLogo: {},
  footerLinks: (props: FooterProps) => ({
    display: 'flex',
    color: props.variant === 'light' ? '#000' : '#747676',
    fontSize: '14px',
    marginTop: '20px'
  }),
  footerLinksMobile: (props: FooterProps) => ({
    display: 'block',
    color: props.variant === 'light' ? '#000' : '#747676',
    fontSize: '14px',
    cursor: 'pointer'
  }),
  link: {
    display: 'block',
    marginRight: '1.5rem',
    marginBottom: '.5rem',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}))
