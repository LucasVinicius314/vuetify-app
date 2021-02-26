import Axios from 'axios'

const url = process.env.VUE_APP_API_URL

const axios = Axios.create({
  baseURL: `${url}/api/`,
})

export { axios }
