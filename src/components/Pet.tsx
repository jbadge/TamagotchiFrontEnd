import React from 'react'
import { PetProps } from '../types/PetsTypes'
import { Link } from 'react-router-dom'
import { returnNameIfPokemonName, getPokemonSprites } from '../otherApi'

const Pet = ({
  pet: { id, name, birthday, hungerLevel, happinessLevel, spriteUrl },
}: PetProps) => {
  const [sprite, setSprite] = React.useState('')
  const date = new Date(birthday)

  // HANDLES SPRITES
  React.useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonNames = await returnNameIfPokemonName()
      if (pokemonNames.length > 0 && name) {
        const images = await getPokemonSprites(pokemonNames)
        images.forEach((image) => {
          if (name.toLowerCase() === image.name) {
            setSprite(image.picture)
          } else {
            setSprite(spriteUrl)
          }
        })
      } else if (spriteUrl) {
        setSprite(spriteUrl)
      }
    }
    fetchPokemon()
  }, [])

  return (
    <li key={id} className="pet">
      <div className="image-container">
        <Link to={`/pets/${id}`}>
          <img src={sprite} alt="1" />
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
