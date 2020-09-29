import axios, { AxiosInstance } from 'axios'
import { SERVER_URL } from '../constants'
import { CustomError } from '../typings'

const configureAxios = (instance: AxiosInstance): AxiosInstance => {
  // Set header in interceptor instead of instance definition
  instance.interceptors.request.use(async config => {
    config.headers.Authorization = 'ocE1iT3HbvDcY6YKWuij'
    // console.log('config', config)
    return config
  }, error => {
    Promise.reject(error)
  })

  instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
    // console.log('response', response)
    return response
  }, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
    let message: string
    message = 'サーバエラー'
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data)
      // console.log(error.response.status)
      // console.log(error.response.headers)
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message
      }
    }

    const err = new Error(message) as CustomError
    err.error = error.response && error.response.data
    err.code = error.response && error.response.status

    return Promise.reject(err)
  })

  return instance
}

export const createApi = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 60 * 1000 // API request timeout set to 60s
  })

  return configureAxios(axiosInstance)
}

export const multipartHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}
