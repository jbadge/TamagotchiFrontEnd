import axios from 'axios'
import { PetsType } from './types/PetsTypes'

const BASE_URL = 'http://localhost:5000'

// Get all pets
export async function getPets() {
  const response = await axios.get<PetsType[]>(`${BASE_URL}/api/Pets/`)

  return response
}

// Get one pet
export async function getPet(id: number) {
  const response = await axios.get<PetsType>(`${BASE_URL}/api/Pets/${id}`)

  return response.data
}

// Create a pet
export async function createPet(newPetName: string) {
  const response = await axios.post<PetsType>(`${BASE_URL}/api/Pets/`, {
    name: newPetName,
  })

  return response
}

// Delete a pet
export async function deletePet(id: number) {
  const response = await axios.delete<PetsType>(`${BASE_URL}/api/Pets/${id}`)

  return response
}

// Update a pet
export async function updatePet(id: number) {
  const response = await axios.put<PetsType>(`${BASE_URL}/api/Pets/${id}`)

  return response.data
}

// Add playtime for a pet
export async function createPlaytime(id: number) {
  const response = await axios.post<PetsType>(
    `${BASE_URL}/api/Pets/${id}/Playtimes`
  )

  return response.data
}

// Add a feeding for a pet
export async function createFeeding(id: number) {
  const response = await axios.post<PetsType>(
    `${BASE_URL}/api/Pets/${id}/Feedings`
  )

  return response.data
}

// Add a scolding for a pet
export async function createScolding(id: number) {
  const response = await axios.post<PetsType>(
    `${BASE_URL}/api/Pets/${id}/Scoldings`
  )

  return response.data
}
