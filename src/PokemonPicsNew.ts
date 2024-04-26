import axios from 'axios'
import { getPets } from './api'

export async function getAllPokemon() {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )
  return response.data.results.map((pokemon: { name: string }) =>
    pokemon.name.toLowerCase()
  )
}

export async function getAllMatchingPokemon(name?: string) {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )
  const pokemonNames = response.data.results.map((pokemon: { name: string }) =>
    pokemon.name.toLowerCase()
  )
  if (name) {
    return pokemonNames.includes(name.toLowerCase()) ? [name.toLowerCase()] : []
  } else {
    const dbNames = (await getPets()).map((pet) => pet.name)
    const matchingNames: string[] = dbNames
      .filter((name) =>
        pokemonNames
          .map((pokemonName: string) => pokemonName.toLowerCase())
          .includes(name.toLowerCase())
      )
      .map((name) => name.toLowerCase())
    return matchingNames
  }
}

export async function getPokemonImages(
  names: string[]
): Promise<{ name: string; image: string }[]> {
  const imagePictures = names.map(async (name: string) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      )
      const { data } = response
      if (data.sprites.other['official-artwork'].front_default) {
        return {
          name,
          image: data.sprites.other['official-artwork'].front_default,
        }
      } else {
        console.error(`Required data not found for ${name}`)
        return null
      }
    } catch (error) {
      console.error(`Error fetching pictures for ${name}`, error)
      return null
    }
  })
  const images = await Promise.all(imagePictures)
  const filteredImages = images.filter((image) => image !== null) as {
    name: string
    image: string
  }[]
  return filteredImages
}

export async function getPokemonSprites(
  names: string[]
): Promise<{ name: string; sprite: string }[]> {
  const spritePictures = names.map(async (name: string) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      )
      const { data } = response
      // console.log(data.sprites)
      if (data.sprites.other['showdown'].front_default) {
        return {
          name,
          sprite: data.sprites.versions['generation-vi']['x-y'].front_default,
          // data.sprites.other['official-artwork'].front_default
          // data.sprites.other.dream_world.front_default,
          // data.sprites.front_default,
        }
      } else {
        console.error(`Required data not found for ${name}`)
        return null
      }
    } catch (error) {
      console.error(`Error fetching pictures for ${name}`, error)
      return null
    }
  })
  const sprites = await Promise.all(spritePictures)
  const filteredSprites = sprites.filter((sprite) => sprite !== null) as {
    name: string
    sprite: string
  }[]
  return filteredSprites
}
