import axios from 'axios'

// 151 && 1302 (range 152-1025, 10001-10277)
export async function getAllPokemon() {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=1302'
  )
  return response.data.results.map((pokemon: { name: string }) =>
    pokemon.name.toLowerCase()
  )
}

// Get Pokemon Sprites
export async function getPokemonSprite(
  name: string
): Promise<{ name: string; picture: string }> {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    )
    const { data } = response
    if (
      data.sprites.versions['generation-vi']['omegaruby-alphasapphire']
        .front_default
    ) {
      return {
        name,
        picture:
          data.sprites.versions['generation-vi']['omegaruby-alphasapphire']
            .front_default,
      }
    } else if (
      !data.sprites.versions['generation-vi']['omegaruby-alphasapphire']
        .front_default
    ) {
      return {
        name,
        picture: data.sprites.front_default,
      }
    } else {
      console.error(`Required data not found for ${name.toLowerCase()}`)
      return { name, picture: '' }
    }
  } catch (error) {
    console.error(`Error fetching picture for ${name.toLowerCase()}`)
    return { name, picture: '' }
  }
}

// Get Pokemon Images
export async function getPokemonImage(
  name: string
): Promise<{ name: string; picture: string }> {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    )
    const { data } = response
    if (data.sprites.other['official-artwork'].front_default) {
      return {
        name,
        picture: data.sprites.other['official-artwork'].front_default,
      }
    } else {
      console.error(`Required data not found for ${name.toLowerCase()}`)
      return { name, picture: '' }
    }
  } catch (error) {
    console.error(`Error fetching picture for ${name.toLowerCase()}`)
    return { name, picture: '' }
  }
}

// Check if URL contains image file
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
