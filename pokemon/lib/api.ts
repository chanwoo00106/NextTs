import axios from 'axios'
import BaseUrl from './baseUrl'

const api = axios.create({ baseURL: BaseUrl })

export default api
