import axios from 'axios'
import { getPets } from './api'

// 151
export async function getAllPokemon() {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=1302'
  )
  return response.data.results.map((pokemon: { name: string }) =>
    pokemon.name.toLowerCase()
  )
}

export async function returnNameIfPokemonName(name?: string) {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=1302'
  )
  const pokemonNames = response.data.results.map(
    (pokemon: { name: string }) => pokemon.name.toLowerCase() //added toLowerCase()
  )
  if (name) {
    // console.log(pokemonNames.includes(name.toLowerCase()))
    // console.log([name.toLowerCase()])
    // console.log([])
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
): Promise<{ name: string; picture: string }[]> {
  const pics = names.map(async (name: string) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      )
      const { data } = response
      if (data.sprites.other['official-artwork'].front_default) {
        return {
          name,
          picture: data.sprites.other['official-artwork'].front_default,
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
  const pictures = await Promise.all(pics)
  const filteredPictures = pictures.filter((picture) => picture !== null) as {
    name: string
    picture: string
  }[]
  return filteredPictures
}

export async function getPokemonSprites(
  names: string[]
): Promise<{ name: string; picture: string }[]> {
  const pics = names.map(async (name: string) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      )
      const { data } = response
      // console.log(data.name)
      // console.log(data.sprites)
      if (data.sprites.other['showdown'].front_default) {
        return {
          name,
          picture:
            data.sprites.versions['generation-vi']['omegaruby-alphasapphire']
              .front_default,
          // data.sprites.versions['generation-vi']['x-y'].front_default,
          // data.sprites.other['official-artwork'].front_default
          // data.sprites.other.dream_world.front_default,
          // data.sprites.front_default,
        }
      } else if (data.sprites.other['showdown'].front_default === null) {
        // console.log('data.sprites.front_default', data.sprites.front_default)
        return {
          name,
          picture: data.sprites.front_default,
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
  const pictures = await Promise.all(pics)
  const filteredPictures = pictures.filter((picture) => picture !== null) as {
    name: string
    picture: string
  }[]
  return filteredPictures
}

export const isValidUrl = async (url: string) => {
  try {
    if (url === '') {
      return true
    }
    const response = await axios.head(url)

    if (response.status === 200) {
      const contentType = response.headers['content-type']
      if (contentType && contentType.startsWith('image')) {
        return true
      }
    }
    return false
  } catch (error) {
    return false
  }
}

// export const searchPets = () => {
//   const query: string = (
//     document.querySelector('.search-input') as HTMLInputElement
//   ).value

//   fetch(`/pets/search?query=${query}`)
//     .then((response) => response.json())
//     .then((data: PetType[]) => {
//       displaySearchResults(data)
//     })
//     .catch((error: Error) => console.error('Error searching pets:', error))
// }

// function displaySearchResults(results: PetType[]) {
//   const searchResultsDiv = document.querySelector('.search-results')
//   if (!searchResultsDiv) return

//   searchResultsDiv.innerHTML = ''

//   if (results.length === 0) {
//     searchResultsDiv.innerHTML = 'No pets found.'
//     return
//   }

//   results.forEach((pet) => {
//     searchResultsDiv.innerHTML += `<div>${pet.name}</div>`
//   })
// }
