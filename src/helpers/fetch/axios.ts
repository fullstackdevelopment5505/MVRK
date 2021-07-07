import { Cache } from 'aws-amplify'
import axios from 'axios'

// GraphQL Axios Instance
export const slsAxios = axios.create({
  baseURL: 'https://uyuvbc8vi6.execute-api.us-east-1.amazonaws.com/dev/'
})

slsAxios.interceptors.request.use(
  config => {
    const access = Cache.getItem('vx360-access')
    if (access?.id_token) {
      config.headers['Authorization'] = 'Bearer ' + access.id_token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
