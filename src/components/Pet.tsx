import React from 'react'
import { PetProps } from '../types/PetsTypes'
import { Link } from 'react-router-dom'
import { getAllMatchingPokemon, getPokemonSprites } from '../pokemonPics'

const Pet = ({
  pet: { id, name, birthday, hungerLevel, happinessLevel },
  imageUrl,
}: PetProps) => {
  const date = new Date(birthday)

  const [image, setImage] = React.useState('')
  const [pokemonImages, setPokemonImages] = React.useState<
    { name: string; picture: string }[]
  >([])

  if (imageUrl) {
    console.log(imageUrl)
  }

  React.useEffect(() => {
    // HANDLES SPRITES
    const fetchPokemon = async () => {
      // console.log('running fetchPokemon')
      const pokemonNames = await getAllMatchingPokemon()
      // console.log('length', pokemonNames.length)
      // console.log('name', name)
      if (pokemonNames.length > 0 && name) {
        // console.log('1')
        const images = await getPokemonSprites(pokemonNames)
        images.forEach((image) => {
          if (name.toLowerCase() === image.name) {
            // Responsible for SPRITE showing on page
            // console.log(image.picture)
            setImage(image.picture)
          } else {
            // Responsible for SPRITE showing on page
            // console.log(imageUrl)
            setImage(imageUrl)
          }
        })
        setPokemonImages(pokemonImages)
      } else if (imageUrl) {
        // Responsible for SPRITE showing on page
        // console.log(imageUrl)
        setImage(imageUrl)
      }
    }
    fetchPokemon()
  }, [])

  return (
    <li key={id} className="pet">
      <div className="image-container">
        <Link to={`/pets/${id}`}>
          <img src={image} alt="1" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to={`/pets/${id}`}>{name}</Link>
        </li>
        <li>
          Birthday:
          {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
        </li>
        <li>Hunger Level: {hungerLevel}</li>
        <li>Happiness Level: {happinessLevel}</li>
      </ul>
    </li>
  )
}

export default Pet
