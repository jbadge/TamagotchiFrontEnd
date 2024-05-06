import React from 'react'
import { PetProps } from '../types/PetsTypes'
import { Link } from 'react-router-dom'
import { returnNameIfPokemonName, getPokemonSprites } from '../otherApi'

const Pet = ({
  pet: { id, name, birthday, hungerLevel, happinessLevel, isDead, spriteUrl },
}: PetProps) => {
  const [sprite, setSprite] = React.useState('')
  const bannerRef = React.useRef<HTMLDivElement>(null)
  const date = new Date(birthday)

  // HANDLES SPRITES
  React.useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonNames = await returnNameIfPokemonName()
      if (pokemonNames.length > 0 && name) {
        // console.log('1')
        const images = await getPokemonSprites(pokemonNames)
        // console.log('fetchPokemon, pokemonNames', pokemonNames)
        // console.log('2')

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

  // Banner Stuff
  React.useEffect(() => {
    if (isDead && bannerRef.current?.parentElement) {
      const parentElement = bannerRef.current.parentElement.parentElement

      if (parentElement) {
        const parentWidth = parentElement.offsetWidth || 0
        const bannerWidth = bannerRef.current.offsetWidth
        const rotationAngle = -10 + Math.random() * 20 // Random rotation angle between -10deg and 10deg

        // Get the top position of the pet-details-block
        const petDetailsBlock = document.querySelector(
          '.image-container'
        ) as HTMLElement | null
        const petDetailsBlockTop = petDetailsBlock
          ? petDetailsBlock.getBoundingClientRect().top
          : 0

        // Get the top position of the banner relative to the pet-details-block
        const bannerTopRelativeToBlock =
          bannerRef.current.getBoundingClientRect().top - petDetailsBlockTop

        // Calculate the translateY to ensure the top edge of the banner stays within the boundaries of the pet-details-block
        const translateY = -bannerTopRelativeToBlock

        // Calculate the translateX to center the banner
        const translateX = (parentWidth - bannerWidth) / 2

        bannerRef.current.style.transform = `rotate(${rotationAngle}deg) translate(${translateX}px, ${translateY}px)`
      }
    }
  }, [isDead, bannerRef])

  if (isDead) {
    console.log('This pet is dead:', { id, name, date })
  }

  return (
    <li key={id} className="pet">
      <div className="image-container">
        <Link to={`/pets/${id}`}>
          <img src={sprite} alt="1" />
          {isDead && (
            <div ref={bannerRef} className="deceased-banner-sprite">
              Deceased
            </div>
          )}
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
