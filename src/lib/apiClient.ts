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
const VisitorId = getOrCreateVisitorId()

// Generate or load VisitorId
function getOrCreateVisitorId() {
  let VisitorId = localStorage.getItem('VisitorId')
  if (!VisitorId) {
    VisitorId = crypto.randomUUID()
    localStorage.setItem('VisitorId', VisitorId)
  }
  return VisitorId
}

// Create an axios instance with VisitorId header
const apiClient = axios.create({
  baseURL: `${BASE_URL}`,
})

apiClient.interceptors.request.use((config) => {
  config.headers['x-visitor-id'] = VisitorId
  return config
})

export default apiClient
