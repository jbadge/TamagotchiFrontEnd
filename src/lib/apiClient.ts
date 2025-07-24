import axios from 'axios'
// URLS
const URLs = {
  // production
  0: 'https://tamagotchiapi.onrender.com',
  // local network
  1: 'http://192.168.0.241:5000',
  // local dev
  2: 'http://localhost:5001',
}

const ENV = 0

const BASE_URL = URLs[ENV]

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
