import Axios from 'axios'

export const base_url = "https://veoapi.cogai.uk";

export const publicAPI = Axios.create({ baseURL: base_url })

export const privateAPI = Axios.create({ baseURL: base_url })

export const attachToken = async () => {
  const jwt = localStorage.getItem('token')
  privateAPI.defaults.headers.common.Authorization = `Bearer ${jwt}`
}