import axios from 'axios'

const BASE_URL = 'https://tamagotchiapi.onrender.com'
// 'http://192.168.0.241:5000'
// For Local Use
// 'http://localhost:5001'

// Generate or load visitorId (example using localStorage)
function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem('visitorId')
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem('visitorId', visitorId)
  }
  return visitorId
}

const visitorId = getOrCreateVisitorId()

// Create an axios instance with visitorId header
const apiClient = axios.create({
  baseURL: `${BASE_URL}`,
})

apiClient.interceptors.request.use((config) => {
  config.headers['x-visitor-id'] = visitorId
  return config
})

export default apiClient
