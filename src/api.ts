import axios from 'axios'
import { PetType as PetType } from './types/PetsTypes'

const BASE_URL = 'http://localhost:5000'

// Get all pets
export async function getPets() {
  const response = await axios.get<PetType[]>(`${BASE_URL}/api/Pets/`)
  // console.log(response.data)
  return response.data
}

// Get one pet
export async function getPet(id: string) {
  const response = await axios.get<PetType>(`${BASE_URL}/api/Pets/${id}`)

  return response.data
}

// Create a pet
export async function createPet(
  newPetName: string,
  spriteUrl: string,
  imageUrl: string
) {
  const response = await axios.post<PetType>(`${BASE_URL}/api/Pets/`, {
    name: newPetName,
    spriteUrl: spriteUrl,
    imageUrl: imageUrl,
  })

  return response
}

// Delete a pet
export async function deletePet(id: string) {
  const response = await axios.delete<PetType>(`${BASE_URL}/api/Pets/${id}`)

  return response
}

// Update a pet
export async function updatePet(id: string, isDead: boolean) {
  const petDetails = await getPet(id)
  const currentPet = { ...petDetails, isDead }
  const response = await axios.put<PetType>(
    `${BASE_URL}/api/Pets/${id}`,
    currentPet
  )

  return response.data
}

// Add playtime for a pet
export async function createPlaytime(id: string) {
  const response = await axios.post<PetType>(
    `${BASE_URL}/api/Pets/${id}/Playtimes`
  )

  return response.data
}

// Add a feeding for a pet
export async function createFeeding(id: string) {
  // const petDetails = await getPet(id)
  // if (petDetails.hungerLevel! < 5) {
  //   throw new Error(`${petDetails.name} is not hungry enough to eat!`)
  // }
  const response = await axios.post<PetType>(
    `${BASE_URL}/api/Pets/${id}/Feedings`
  )

  return response.data
}

// Add a scolding for a pet
export async function createScolding(id: string) {
  // const petDetails = await getPet(id)
  // if (petDetails.happinessLevel! < 0) {
  //   throw new Error(`${petDetails.name} has died from depression`)
  // }
  const response = await axios.post<PetType>(
    `${BASE_URL}/api/Pets/${id}/Scoldings`
  )

  return response.data
}

// Toggle showing dead pets
export async function toggleItemComplete(id: string, isDead: boolean) {
  const response = await axios.put(`${BASE_URL}/api/Pets/${id}`, {
    pet: { complete: !isDead },
  })
  return response.data
}
