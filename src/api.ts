import apiClient from './lib/apiClient'
// import axios from 'axios'
// import pets from '../src/pet.json'
import { PetType } from './types/PetsTypes'

// Get all pets
export async function getPets() {
  // For use with API
  const response = await apiClient.get<PetType[]>(`/api/Pets/`)

  return response.data

  // For use with pets.json
  // return pets
}

// Get one pet
export async function getPet(id: string) {
  // For use with API
  const response = await apiClient.get<PetType>(`/api/Pets/${id}`)

  return response.data

  // For use with pets.json
  // return pets.find((pet) => pet.id === Number(id))
}

// Create a pet
export async function createPet(
  newPetName: string,
  spriteUrl: string,
  imageUrl: string
) {
  const response = await apiClient.post<PetType>(`/api/Pets/`, {
    name: newPetName,
    spriteUrl: spriteUrl,
    imageUrl: imageUrl,
  })

  return response
}

// Delete a pet
export async function deletePet(id: string) {
  const response = await apiClient.delete<PetType>(`/api/Pets/${id}`)

  return response
}

// Update a pet
export async function updatePet(id: string, isDead: boolean) {
  const petDetails = await getPet(id)
  const currentPet = { ...petDetails, isDead }
  const response = await apiClient.put<PetType>(`/api/Pets/${id}`, currentPet)

  return response.data
}

// Add playtime for a pet
export async function createPlaytime(id: string) {
  const response = await apiClient.post<PetType>(`/api/Pets/${id}/Playtimes`)

  return response.data
}

// Add a feeding for a pet
export async function createFeeding(id: string) {
  const response = await apiClient.post<PetType>(`/api/Pets/${id}/Feedings`)

  return response.data
}

// Add a scolding for a pet
export async function createScolding(id: string) {
  const response = await apiClient.post<PetType>(`/api/Pets/${id}/Scoldings`)

  return response.data
}

// Toggle showing dead pets
export async function toggleItemComplete(id: string, isDead: boolean) {
  const response = await apiClient.put(`/api/Pets/${id}`, {
    pet: { complete: !isDead },
  })

  return response.data
}
