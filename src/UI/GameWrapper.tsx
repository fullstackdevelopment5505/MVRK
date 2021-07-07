import React, { useRef, useEffect, useState } from 'react'
import { Scene } from 'babylonjs/scene'
import { useWindowSize } from 'react-use'
import { Step } from 'react-joyride'

// Components
import { Chat, LiveStream, MapMarker, ProfileMenu, Video } from 'components'
import Receiver from '../Receiver'
import { Modal } from '../components/modal'
import { PillButton, Toast, Tutorial } from 'components/shared'

// Helpers
import { IUser, ITeleportLocation, AnchorType } from 'types'
import { tutorialSteps } from '../helpers'

interface IModalConfig {
  videoSrc?: string
  trackSrc?: string
  streamSrc?: string
  imgSource?: string
}

interface GameWrapperProps {
  user?: IUser
  users?: IUser[]
  setGameLoading: (val: boolean) => void
  setLoaderOptions: (val: object) => void
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ user, users, setGameLoading, setLoaderOptions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { width } = useWindowSize()

  const localStorage = window.localStorage
  const localStorageTutorialEnabled = localStorage.getItem('tutorialEnabled')
  const [showTutorial, setShowTutorial] = useState<boolean>(
    localStorageTutorialEnabled ? localStorageTutorialEnabled === 'true' : true
  )
  const [stepsEnabled, setStepsEnabled] = useState<boolean>(false)
  const [scene, setScene] = useState<Scene>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalConfig, setmodalConfig] = useState<IModalConfig>({})
  const [mapLocation, setMapLocation] = useState<ITeleportLocation>({
    babylonParam: 'Hall',
    name: 'Hall'
  })
  const [anchorFlags, setAnchorFlags] = useState({ right: false })
  const [steps, setSteps] = useState<Step[]>(tutorialSteps)

  const teleportLocations: ITeleportLocation[] = [
    {
      babylonParam: 'Entryway',
      name: 'Entryway'
    },
    {
      babylonParam: 'Lounge',
      name: 'Lounge'
    },
    {
      babylonParam: 'Gallery',
      name: 'Gallery'
    },
    {
      babylonParam: 'Roundtable',
      name: 'Roundtable'
    },
    {
      babylonParam: 'Concert Hall',
      name: 'Concert Hall'
    }
  ]

  const toggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent,
    anchor: AnchorType,
    open: boolean,
    location: string = 'drawer'
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    if (location === 'drawer') {
      setAnchorFlags({ ...anchorFlags, [anchor]: open })
    } else {
      setAnchorFlags({ ...anchorFlags, [anchor]: open })
      goto3Dlocation(location)
    }
  }

  const goto3Dlocation = location => {
    const ifx: HTMLIFrameElement = document.getElementById('ifx') as HTMLIFrameElement
    if (ifx && ifx.contentWindow != null) {
      try {
        // TODO: Set up teleport code
      } catch (e) {
        console.log(e)
      }
    }
  }

  const onSceneSetup = () => {
    setScene((window as any)['scene'])
    // setShowLoading(false);
  }

  const toggleTutorial = bool => {
    if (anchorFlags.right) {
      setAnchorFlags({ right: false })
    }
    setShowTutorial(bool)
    setStepsEnabled(false)
    localStorage.setItem('tutorialEnabled', bool.toString())
  }

  const dismissWelcomeModal = () => {
    setShowTutorial(false)
    setStepsEnabled(true)
  }

  ///////////////////////////////////////////////////////////
  // Babylon Scene Loader Window Hooks
  ///////////////////////////////////////////////////////////
  window['loadScene'] = (sceneFile: string, queryString?: string) => {
    if (window.state != null && window.state.showSceneLoader != null) {
      window.state.showSceneLoader(true)
    } else {
      setGameLoading(true)
      setLoaderOptions({ indeterminate: false, percentLoaded: 0 })
    }
    let url: string = `${process.env.PUBLIC_URL}/babylon/engine.html?scene=${sceneFile}`
    if (queryString != null) url += queryString
    const ifx: HTMLIFrameElement = document.getElementById('ifx') as HTMLIFrameElement
    if (ifx != null) {
      if (ifx.contentWindow != null) {
        ifx.contentWindow.location.replace(url)
      } else ifx.src = url
    }
  }
  window['updateStatus'] = (status: string, details: string, state: number) => {
    if (window.state != null && window.state.updateSceneLoader != null) {
      window.state.updateSceneLoader(status, details, state)
    } else {
      setLoaderOptions({ indeterminate: true, loadingStatus: status, loadingDetails: details, loadingState: state })
    }
  }
  window['updateProgress'] = (progress: number) => {
    if (window.state != null && window.state.tickSceneLoader != null) {
      window.state.tickSceneLoader(progress)
    } else {
      setLoaderOptions({ indeterminate: false, percentLoaded: progress })
    }
  }
  window['showGameLoading'] = (show: boolean) => {
    setGameLoading(show)
  }
  window['loadSceneComplete'] = () => {
    if (!window.scene) {
      window.scene = true
      window.postMessage('{"command":"initialised"}', '*') // Tell React part that the scene is set up
    }
    if (window.state != null && window.state.showSceneLoader != null) {
      window.state.showSceneLoader(false)
    } else {
      setGameLoading(false)
    }
  }
  ///////////////////////////////////////////////////////////
  // Babylon Web Socket Window Hook
  ///////////////////////////////////////////////////////////
  window['socketConnect'] = connection => {
    if (window['io'] != null) {
      if (window.state == null) window.state = {}
      window.state['socket'] = window['io'].connect(connection, { transports: ['websocket'] })
      if (window.state['socket'] != null) {
        window.state['socket'].on('connect', () => {
          if (window.state.onSocketConnect) {
            window.state.onSocketConnect()
          }
          window.state['socket'].on('disconnect', () => {
            if (window.state.onSocketDisconnect) {
              window.state.onSocketDisconnect()
            }
          })
        })
      }
    }
    return window.state != null && window.state['socket'] != null ? window.state['socket'] : null
  }
  ///////////////////////////////////////////////////////////

  useEffect(() => {
    setLoaderOptions({ indeterminate: false, percentLoaded: 0 })

    const defaultSceneFile = 'Lobby.gltf'

    Receiver.init(onSceneSetup, setmodalConfig, setShowModal, setMapLocation, teleportLocations)

    window.loadScene(defaultSceneFile)

    // eslint-disable-next-line
  }, [])

  // Updates the tutorial steps on window size change
  useEffect(() => {
    if (width > 766) {
      setSteps(tutorialSteps)
    } else {
      // Filter out the map step on mobile and update the placement of the menu and chat steps
      const steps = tutorialSteps
        .filter(step => step.target !== '.map-marker')
        .map(step => {
          if (step.target === '#menu-icon' || step.target === '#chat-icon') {
            step.placement = 'bottom-start'
          }
          return step
        })

      setSteps(steps)
    }
  }, [width])

  return (
    <div id='game'>
      <iframe id='ifx' width='100%' height='100%' scrolling='no' frameBorder='0' title='ifx' />      
      {(
        <>
          <Tutorial run={stepsEnabled} steps={steps} onClose={() => toggleTutorial(false)} />
          <Modal open={showTutorial} onClose={dismissWelcomeModal}>
            <div id='welcome-modal' className='welcome-modal'>
              <div className='text'>
                <h2 className='heading'>Welcome to Vx360, {user && user.firstName}!</h2>
                <div className='body'>
                  Immersive, web-based, device agnostic, and optimized for desktop and mobile, the Vx360 platform boasts
                  360 degree exploration of a virtual event space that can be completely customized for your next event.
                </div>
                <div className='actions'>
                  <PillButton type='button' className='button' variant='outlined' onClick={dismissWelcomeModal}>
                    Continue
                  </PillButton>
                </div>
              </div>
              <div className='image'></div>
            </div>
          </Modal>
          <Video
            visible={Boolean(showModal && modalConfig && modalConfig.videoSrc)}
            setVisibility={setShowModal}
            videoSrc={modalConfig.videoSrc}
            trackSrc={modalConfig.trackSrc}
          />
          <LiveStream
            visible={Boolean(showModal && modalConfig && modalConfig.streamSrc)}
            setVisibility={setShowModal}
            streamSrc={modalConfig.streamSrc}
            user={user}
            users={users}
          />
          <Modal
            open={Boolean(showModal && modalConfig && modalConfig.imgSource)}
            onClose={setShowModal}
            className='responsive-modal modal-video-only'
          >
            <img src={modalConfig.imgSource} style={{ height: '100%', width: '100%' }} alt='Modal' />
          </Modal>
          <MapMarker teleportLocations={teleportLocations} mapLocation={mapLocation} />
          <Chat user={user} users={users} />
          <ProfileMenu
            anchorFlags={anchorFlags}
            toggleTutorial={() => toggleTutorial(true)}
            toggleDrawer={toggleDrawer}
            teleportLocations={teleportLocations}
            mapLocation={mapLocation}
            user={user}
            users={users}
          />
          <Toast />
        </>
      )}
    </div>
  )
}
