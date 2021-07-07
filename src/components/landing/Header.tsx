import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, IconButton, Link, Grid } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { PillButton } from 'components'
// assets
import Logo from '../../assets/vmg.svg'

export interface IHeaderSubMenuItem {
  displayName: string
  href?: string
  handleClick?: () => void
}

export interface IHeaderMenuItem extends IHeaderSubMenuItem {
  subMenu?: IHeaderSubMenuItem[]
}

interface HeaderProps {
  showNav: boolean
  menuItems?: IHeaderSubMenuItem[]
  isMobile?: boolean
  navPills?: boolean
}

export const Header: FC<HeaderProps> = ({ showNav, menuItems, isMobile, navPills = false }) => {
  const classes = useStyles()

  const [mobileNavState, setMobileNavState] = useState({ open: false })

  const mobileMenuDisplay = (
    <>
      <section className={classes.mobileLeftNavContainerOpen} onClick={() => setMobileNavState({ open: false })}>
        {menuItems?.map((currMenuItem: IHeaderMenuItem, index: number) => (
          <Typography key={index} variant='h5' className={classes.linkMobile}>
            <Link href={currMenuItem.href} classes={{ root: classes.linkMobile }}>
              {currMenuItem.displayName}
            </Link>
          </Typography>
        ))}

        <IconButton disableRipple className={classes.closeMobileMenuButton}>
          <ChevronRightIcon fontSize='large' />
        </IconButton>
      </section>
    </>
  )

  const mobileMenuToggleButton = (
    <IconButton color='inherit' disableRipple onClick={() => setMobileNavState({ open: !mobileNavState.open })}>
      <MenuIcon color='inherit' fontSize='large' />
    </IconButton>
  )

  const headerNavLinks = (
    <>
      {menuItems?.map((currMenuItem: IHeaderMenuItem, index: number) => (
        <Typography key={index} variant='body1'>
          {navPills ? (
            <PillButton href={currMenuItem.href} color='inherit' classes={{ root: classes.link }} solid>
              {currMenuItem.displayName}
            </PillButton>
          ) : (
            <Link href={currMenuItem.href} color='inherit' classes={{ root: classes.link }}>
              {currMenuItem.displayName}
            </Link>
          )}
        </Typography>
      ))}
    </>
  )

  return (
    <header className={classes.header}>
      <Grid container style={{ height: '100%' }}>
        <Grid container item sm={12} md={1} />
        <Grid container item sm={12} md={10} className={classes.mainContainer}>
          <div className={classes.logoContainer}>
            <Link href='https://www.verizonmedia.com/' color='inherit' classes={{ root: classes.link }}>
              <img src={Logo} className={classes.logo} alt='logo' />
            </Link>
          </div>
          <div className={classes.linksContainer}>{isMobile ? mobileMenuToggleButton : headerNavLinks}</div>
          {isMobile && mobileNavState.open ? mobileMenuDisplay : null}
        </Grid>
        <Grid container item sm={12} md={1} />
      </Grid>
    </header>
  )
}

// TODO: figure out how to not use :any here
const baseStyles: any = {
  mobileLeftNavContainer: {
    position: 'fixed',
    height: '100vh',
    width: '60vw',
    top: 0,
    right: 0,
    marginRight: '-60vh',
    padding: '3rem',
    backgroundColor: '#000',
    transition: '200ms',
    zIndex: 100
  },
  link: {
    padding: '.5rem',
    cursor: 'pointer',
    width: 165,
    '&:hover': {
      textDecoration: 'none'
    }
  }
}
// TODO: figure out how to not use :any here
const useStyles: any = makeStyles(theme => ({
  header: {
    height: 120,
    width: '100%',
    padding: '0 1rem',
    display: 'flex',
    boxShadow: 'inset 0px -1px 0px #D8DADA',
    alignItems: 'center',
    background: '#fff'
  },
  mainContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoContainer: {
    height: '100%',
    padding: '26px 1rem',
    [theme.breakpoints.down('sm')]: {
      padding: '26px 2.5rem'
    }
  },
  logo: {
    position: 'relative',
    height: '100%'
  },
  linksContainer: {
    display: 'flex',
    paddingRight: '20px',
    flexDirection: 'row-reverse',
    color: '#000'
  },
  linkMobile: {
    ...baseStyles.link,
    display: 'tableCaption',
    color: '#fff',
    fontWeight: 'bold'
  },
  mobileLeftNavContainerOpen: {
    ...baseStyles.mobileLeftNavContainer,
    marginRight: '0vw'
  },
  closeMobileMenuButton: {
    position: 'absolute',
    bottom: '2rem',
    left: 0,
    margin: '2rem'
  },
  ...baseStyles
}))
