import React, { FC, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Container, Slide } from '@material-ui/core'

export interface ICarouselSlide {
  title: string
  date: string
  datePadded?: boolean
  imgSrc: string
}

interface CarouselProps {
  slides: ICarouselSlide[]
  msPerSlide: number
  isMobile?: boolean
}

export const Carousel: FC<CarouselProps> = ({ msPerSlide, slides, isMobile }) => {
  const classes = useStyles()
  const [carouselState, setCarouselState] = useState({ activeIndex: 0, desiredIndex: 0 })

  var carouselAutoRotateTimer: number
  var carouselPendingPageTimer: number

  // hooks
  useEffect(() => {
    // if we're in between transitions, dont make any changes
    // only set the auto rotate timer if we're at the desired slide
    if (carouselState.activeIndex === carouselState.desiredIndex) {
      if (carouselAutoRotateTimer) {
        clearTimeout(carouselAutoRotateTimer)
      }
      // advance the carousel one slide after some set period of time
      // SLIDE OUT
      carouselAutoRotateTimer = setTimeout(() => {
        const nextSlideIndex = (carouselState.desiredIndex + 1) % slides.length
        setCarouselState({ activeIndex: -1, desiredIndex: nextSlideIndex })
      }, msPerSlide)
    }
  }, [carouselState.activeIndex])

  useEffect(() => {
    if (carouselPendingPageTimer) {
      clearTimeout(carouselPendingPageTimer)
    }
    // after the current slide transitions out, pick the new slide to transition in
    // SLIDE IN
    carouselPendingPageTimer = setTimeout(() => {
      setCarouselState({ activeIndex: carouselState.desiredIndex, desiredIndex: carouselState.desiredIndex })
    }, 300)
  }, [carouselState.desiredIndex])

  // manual slide selection
  const userChangedDesiredCarouselSlide = (desired: number) => {
    // only process the change if it is for a different slide
    // only process the change if the slide is not in transition
    // only allow manual slide changes on non-mobile displays to prevent buggy behavior
    if (
      !isMobile &&
      desired !== carouselState.desiredIndex &&
      carouselState.desiredIndex === carouselState.activeIndex
    ) {
      // clear all timers
      if (carouselAutoRotateTimer) {
        clearTimeout(carouselAutoRotateTimer)
      }
      if (carouselPendingPageTimer) {
        clearTimeout(carouselPendingPageTimer)
      }
      // SLIDE OUT
      setCarouselState({ activeIndex: -1, desiredIndex: desired })
    }
  }

  useEffect(() => {
    // cleanup carouselTimers on "unmount"
    return () => {
      if (carouselPendingPageTimer) {
        clearTimeout(carouselPendingPageTimer)
      }
      if (carouselAutoRotateTimer) {
        clearTimeout(carouselAutoRotateTimer)
      }
    }
  }, [])

  return (
    <div className={isMobile ? classes.carouselContainerMobile : classes.carouselContainer}>
      {slides.map((cSlide: ICarouselSlide, index: number) => {
        return (
          <Slide key={index} direction='left' in={carouselState.activeIndex === index} mountOnEnter unmountOnExit>
            <Grid container alignContent='space-between' justify='space-between' classes={{ root: classes.height100 }}>
              <Grid item xs={8} sm={6} md={5} lg={4} xl={3} classes={{ root: classes.height100 }}>
                <section className={isMobile ? classes.carouselTextMobile : classes.carouselText}>
                  <Typography
                    variant='h2'
                    classes={{ root: isMobile ? classes.carouselHeadingMobile : classes.carouselHeading }}
                    dangerouslySetInnerHTML={{ __html: cSlide.title }}
                  />
                  <Typography
                    variant='h5'
                    classes={{
                      root: cSlide.datePadded ? classes.carouselSubHeadingPadded : classes.carouselSubHeading
                    }}
                  >
                    {cSlide.date}
                  </Typography>
                </section>
              </Grid>
              <Grid item xs={4} sm={6} md={7} lg={8} xl={9} classes={{ root: classes.height100 }}>
                <div
                  className={isMobile ? classes.carouselImgMobile : classes.carouselImg}
                  style={{ backgroundImage: `url(${cSlide.imgSrc})` }}
                />
              </Grid>
            </Grid>
          </Slide>
        )
      })}
      {/* carousel buttons */}
      <div className={isMobile ? classes.carouselButtonGroupMobile : classes.carouselButtonGroup}>
        {slides.map((cSlide: ICarouselSlide, index: number) => {
          return (
            <div
              key={index}
              className={
                classes[
                  `${
                    (index === carouselState.desiredIndex ? 'carouselButtonActive' : 'carouselButton') +
                    (isMobile ? 'Mobile' : '')
                  }`
                ]
              }
              onClick={() => userChangedDesiredCarouselSlide(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

// TODO: figure out how to not use :any here
const baseStyles: any = {
  carouselContainer: {
    overflow: 'hidden',
    height: '600px'
  },
  carouselText: {
    position: 'relative',
    paddingTop: '220px',
    paddingBottom: '80px',
    paddingLeft: '3rem',
    paddingRight: '1rem'
  },
  carouselHeading: {
    fontSize: '3rem'
  },
  carouselSubHeading: {
    fontSize: '1rem'
  },
  carouselSubHeadingPadded: {
    fontSize: '1rem',
    paddingLeft: 3
  },
  carouselButtonGroup: {
    position: 'absolute',
    display: 'inline-flex',
    top: '600px',
    left: '3rem'
  },
  carouselButton: {
    width: '28px',
    height: '28px',
    marginRight: '4px',
    backgroundColor: 'transparent',
    borderBottom: '2px solid #444',
    transition: '200ms',
    cursor: 'pointer',
    '&:hover': {
      borderBottom: '5px solid #333'
    }
  },
  carouselButtonActive: {
    width: '28px',
    height: '28px',
    borderBottom: '5px solid #000',
    marginRight: '4px',
    transition: '200ms',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      borderBottom: '5px solid #333'
    }
  },
  carouselGridContainer: {
    maxWidth: '100% !important'
  },
  carouselImg: {
    // position: 'absolute',
    width: 'auto',
    height: '100%',
    maxWidth: '1260px',
    maxHeight: '600px !important',
    // marginRight: 0,
    backgroundPosition: 'center right',
    backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'right'
  },
  height100: {
    height: '100%'
  }
}
// TODO: figure out how to not use :any here
const useStyles: any = makeStyles(() => ({
  ...baseStyles,
  carouselContainerMobile: {
    ...baseStyles.carouselContainer,
    height: '200px'
  },
  carouselTextMobile: {
    ...baseStyles.carouselText,
    paddingTop: '40px',
    paddingBottom: '80px',
    paddingRight: '1rem'
  },
  carouselHeadingMobile: {
    ...baseStyles.carouselHeading,
    fontSize: '2rem'
  },
  carouselButtonGroupMobile: {
    ...baseStyles.carouselButtonGroup,
    top: '250px'
  },
  carouselButtonMobile: {
    ...baseStyles.carouselButton,
    cursor: 'pointer',
    '&:hover': {
      // disable the hover effect on mobile
      ...baseStyles.carouselButton.borderBottom
    }
  },
  carouselButtonActiveMobile: {
    ...baseStyles.carouselButtonActive,
    cursor: 'pointer',
    '&:hover': {
      // disable the hover effect on mobile
      ...baseStyles.carouselButtonActive.borderBottom
    }
  },
  carouselImgMobile: {
    ...baseStyles.carouselImg,
    backgroundSize: 'contain',
    backgroundPosition: 'top right',
    height: '100%'
  }
}))
