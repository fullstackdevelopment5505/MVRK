import React, { useEffect, useMemo } from 'react'
import { I18n } from 'aws-amplify'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MeetingProvider, NotificationProvider, darkTheme } from 'amazon-chime-sdk-component-library-react'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
// Components
import { UserLookup, CodeRedirect, BaseRedirect } from 'components/auth'
import { UserAuthenticatedRoutes, Welcome } from 'components'
import { Notifications } from 'components/videochat'
import { Landing, PosterSubmission, Registration } from 'pages'
// Helpers
import { store } from 'configs'
import { Background } from 'components/shared'
import { dict } from 'i18n'
import { makeTheme } from 'helpers'
import { GameWrapper } from './UI'
// import { GameWrapper } from 'UI';
// Dummy Examples
//import Game from './3D/game';

I18n.putVocabularies(dict)

// Init
const App = () => {
  const theme = useMemo(() => makeTheme('dark'), [])

  useEffect(() => {
    I18n.setLanguage('en')
  }, [])

  return (
    <React.StrictMode>
      <Provider store={store}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={darkTheme}>
              <NotificationProvider>
                <Notifications />
                <MeetingProvider>
                  <Router>
                    <Switch>
                      {/*<Route exact path='/event'>*/}
                      {/*  <Background />*/}
                      {/*  <AuthWrapper />*/}
                      {/*</Route>*/}
                      <Route exact path='/' component={Landing} />
                      <Route exact path='/registration' component={Registration} />
                      <Route exact path='/postersubmission' component={PosterSubmission} />
                      <Route exact path='/auth'>
                        <UserLookup />
                      </Route>
                      <Route exact path='/auth/b2b_redir'>
                        <CodeRedirect />
                      </Route>
                      <Route exact path='/auth/register_redir'>
                        <BaseRedirect />
                      </Route>
                      <Route exact path='/auth/forgot_redir'>
                        <BaseRedirect />
                      </Route>
                      <UserAuthenticatedRoutes>
                        <Route exact path='/tbd'>
                          <Background />
                          <Welcome />
                        </Route>
                      </UserAuthenticatedRoutes>
                    </Switch>
                  </Router>
                </MeetingProvider>
              </NotificationProvider>
            </StyledThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App
