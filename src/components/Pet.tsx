import React from 'react'
import { PetProps } from '../types/PetsTypes'
import { Link } from 'react-router-dom'
// import { returnMatchingPokemonNames, getPokemonSprite } from '../otherApi'
// import { usePokemonNamesContext } from '../context/PokemonNamesContext'
// import { getPets } from '../api'

const Pet = ({
  pet: { id, name, birthday, hungerLevel, happinessLevel, isDead, spriteUrl },
}: PetProps) => {
  // const [sprite, setSprite] = React.useState('')
  const bannerRef = React.useRef<HTMLDivElement>(null)
  const spriteRef = React.useRef<HTMLImageElement>(null)
  const date = new Date(birthday)
  const [bannerLeft, setBannerLeft] = React.useState<string>('50%')
  const [bannerTop, setBannerTop] = React.useState<string>('0')
  const [rotation, setRotation] = React.useState<number>(0)

  // HANDLES SPRITES
  // React.useEffect(() => {
  //   console.log(sprite)
  //   const fetchPokemon = async () => {
  //     const petIsPokemon = await returnMatchingPokemonNames()

  //     // const dbNames = (await getPets()).map((pet) => pet.name)
  //     // const petIsPokemon: string[] = dbNames
  //     //   .filter((name) =>
  //     //     pokemonNamesContext.pokemonNames
  //     //       .map((pokemonName: string) => pokemonName.toLowerCase())
  //     //       .includes(name.toLowerCase())
  //     //   )
  //     //   .map((name) => name.toLowerCase())

  //     if (petIsPokemon && name) {
  //       // console.log('1')
  //       const images = await getPokemonSprite(name)
  //       // console.log('fetchPokemon, pokemonNames', pokemonNames)
  //       console.log(images)

  //       // images.forEach((image) => {
  //       //   if (name.toLowerCase() === image.name) {
  //       setSprite(images.picture)
  //       // } else {
  //       // setSprite(spriteUrl)
  //       // }
  //       // })
  //       // } else if (spriteUrl) {
  //       setSprite(spriteUrl)
  //       return
  //     }
  //   }
  //   fetchPokemon()
  // }, [])

  // Banner Stuff
  React.useEffect(() => {
    if (isDead && bannerRef.current?.parentElement) {
      const parentElement = bannerRef.current.parentElement
      if (parentElement && spriteRef.current) {
        const parentRect = parentElement.getBoundingClientRect()
        const parentWidth = parentRect.width || 0
        const parentTop = parentRect.top || 0
        const rotationAngle = -20 + Math.random() * 40

        const bannerRect = bannerRef.current.getBoundingClientRect()
        const bannerWidth = bannerRect.width
        const bannerHeight = bannerRect.height

        const petDetailsBlock = bannerRef.current.closest(
          '.pet-list-pet-details'
        )
        if (petDetailsBlock) {
          const petDetailsRect = petDetailsBlock.getBoundingClientRect()

          const translateX = (parentWidth - bannerWidth) / 2
          const translateY = petDetailsRect.top - parentTop + bannerHeight

          bannerRef.current.style.transform = `rotate(${rotationAngle}deg) translate(${translateX}px, ${translateY}px)`
        }
      }
    }
  }, [isDead, bannerRef])

  return (
    <li key={id} className="pet">
      <div className="image-container">
        <Link to={`/pets/${id}`}>
          {/* <p style={!loaded ? { display: 'block' } : { display: 'none' }}></p> */}
          <img
            ref={spriteRef}
            src={spriteUrl}
            alt={`Sprite of ${name}`}
            // style={loaded ? { display: 'inline-block' } : { display: 'none' }}
          />
          {/* {isDead && (
            <div ref={bannerRef} className="deceased-banner-sprite">
              Deceased
            </div>
          )} */}
        </Link>
      </div>
      <ul className="pet-list-pet-details">
        <li>
          <Link to={`/pets/${id}`}>{name}</Link>
        </li>
        <li>
          Birthday:
          {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
        </li>
        <li>Hunger Level: {hungerLevel}</li>
        <li>Happiness Level: {happinessLevel}</li>
        {isDead && (
          <div
            ref={bannerRef}
            className="deceased-banner-sprite"
            style={{
              transform: `rotate(${rotation}deg)`,
              // Adjust the positioning based on rotation
              left: `${bannerLeft}px`,
              top: `${bannerTop}px`,
            }}
          >
            Deceased
          </div>
        )}
      </ul>
    </li>
  )
}

export default Pet
