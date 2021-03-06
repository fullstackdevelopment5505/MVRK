import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'

// Components
import App from './App'

// Helpers
import awsExports from './aws-exports'
import * as serviceWorker from './serviceWorker'
import './styles/main.scss'

// Initialize Amplify
Amplify.configure(awsExports)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
