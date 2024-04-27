import React from 'react'
import Pet from '../components/Pet'
import useLoadPets from '../hooks/useLoadPets'
import useCreatePet from '../hooks/useCreatePet'
import {
  getAllMatchingPokemon,
  getAllPokemon,
  getPokemonImages,
  getPokemonSprites,
} from '../pokemonPics'

const PetListHome = () => {
  const [newPetName, setNewPetName] = React.useState('')
  const [newPetImage, setNewPetImage] = React.useState('')
  const [newPetSprite, setNewPetSprite] = React.useState('')
  const [petImageForPet, setPetImageForPet] = React.useState('')

  const [pokemonNames, setPokemonNames] = React.useState<string[]>([])

  const [submitted, setSubmitted] = React.useState(false)
  const [invalidUrl, setInvalidUrl] = React.useState(false)
  const [triggerEffect, setTriggerEffect] = React.useState(false)
  const [imageTouched, setImageTouched] = React.useState(false)

  const { pets } = useLoadPets()
  const createMutation = useCreatePet()
  const petImageRef = React.useRef<HTMLInputElement>(null)

  const [pokemonImages, setPokemonImages] = React.useState<
    { name: string; picture: string }[]
  >([])

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString))
    } catch (error) {
      return false
    }
  }

  //   images.find((image) => {
  //     if (newPetName.toLowerCase() === image.name) {
  //       setImage(image.picture)
  //     } else {
  //       setImage(newPetImage)
  //     }
  //   })
  //   setPokemonImages(pokemonImages)
  // } else if (newPetImage) {
  //   setImage(newPetImage)
  // }

  const fetchPokemonSpritesAndImages = async () => {
    if (pokemonNames.length > 0 && newPetName) {
      const images = await getPokemonImages(pokemonNames)
      const sprites = await getPokemonSprites(pokemonNames)

      let foundSprite = ''
      let foundImage = ''

      // Set Sprite
      sprites.find((pokemon) => {
        if (newPetName.toLowerCase() === pokemon.name) {
          foundSprite = pokemon.picture
          return true
        } else {
          return false
        }
      })
      setNewPetSprite(foundSprite)

      // Set Image
      images.find((pokemon) => {
        if (newPetName.toLowerCase() === pokemon.name) {
          foundImage = pokemon.picture
          return true
        } else {
          return false
        }
      })
      setNewPetImage(foundImage)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    const isPokemonName = pokemonNames.includes(newPetName.toLowerCase())
    const formattedName = isPokemonName
      ? newPetName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : newPetName
    fetchPokemonSpritesAndImages()
    // console.log(newPetImage)
    // if  this is a pokemon, hasImage is false
    const hasImage = !!newPetImage
    // console.log('Did you have to provide an image?', hasImage)
    console.log('isPokemonName', isPokemonName)
    // console.log('!isValidUrl', !isValidUrl)
    console.log(newPetSprite)
    if (isPokemonName || hasImage) {
      if (!isPokemonName && !isValidUrl(newPetImage)) {
        setInvalidUrl(true)
        petImageRef.current?.focus()
        return
      }
      if (isPokemonName && newPetSprite && newPetImage) {
        setNewPetName(formattedName)
      }
      // else if (isPokemonName && newPetSprite && newPetImage) {
      //   createMutation.mutate({
      //     newPetName: formattedName,
      //     spriteUrl: newPetSprite,
      //     imageUrl: newPetImage,
      //   })
      //   setPetImageForPet(newPetImage)
      //   setNewPetName('')
      //   setNewPetImage('')
      //   setSubmitted(false)
      //   setTriggerEffect(true)
      // }

      // createMutation.mutate({
      //   newPetName: formattedName,
      //   spriteUrl: newPetImage,
      //   imageUrl: newPetImage,
      // })
      // setPetImageForPet(newPetImage)
      // setNewPetName('')
      // setNewPetImage('')
      // setSubmitted(false)
      // setTriggerEffect(true)
    } else {
      petImageRef.current?.focus()
    }
  }

  const handleImageBlur = () => {
    setImageTouched(true)
    console.log(imageTouched)
  }

  const isPetsDbEmpty = () => {
    return pets.length === 0
  }

  React.useEffect(() => {
    if (isPetsDbEmpty()) {
      document.querySelector('.top-level')?.classList.add('emptyDb')
    }
  }, [pets])

  React.useEffect(() => {
    if (newPetName && newPetSprite && newPetImage) {
      createMutation.mutate({
        newPetName: newPetName,
        spriteUrl: newPetSprite,
        imageUrl: newPetImage,
      })
      setPetImageForPet(newPetImage)
      setNewPetName('')
      setNewPetImage('')
      setSubmitted(false)
      setTriggerEffect(true)
    }
  }, [newPetName, newPetSprite, newPetImage])

  React.useEffect(() => {
    const fetchPokemonNames = async () => {
      const tempPokemonNames = await getAllPokemon()
      setPokemonNames(tempPokemonNames)
    }
    fetchPokemonNames()
  }, [])

  React.useEffect(() => {
    if (pets.length === 0) {
      document.querySelector('.top-level')?.classList.add('emptyDb')
    }
  }, [])

  React.useEffect(() => {
    if (triggerEffect) {
      document.querySelector('.top-level')?.classList.remove('emptyDb')
    }
  }, [triggerEffect])

  // React.useEffect(() => {
  //   console.log(submitted)
  // }, [submitted])

  return (
    <section className="list-pets">
      <div className="pets">
        <ul className={'top-level'}>
          {pets.map(function (pet) {
            return <Pet key={pet.id} pet={pet} imageUrl={petImageForPet} />
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <ul>
            <li> Add a new pet to the database:</li>
            <li>
              <input
                type="text"
                placeholder="Pet Name"
                value={newPetName}
                onChange={(event) => {
                  setNewPetName(event.target.value)
                  setSubmitted(false)
                }}
              />
            </li>
            {submitted && !pokemonNames.includes(newPetName.toLowerCase()) && (
              <li>
                <input
                  type="text"
                  placeholder="Add an image from a url"
                  value={newPetImage}
                  onChange={(event) => {
                    setNewPetImage(event.target.value)
                    setInvalidUrl(false)
                  }}
                  onBlur={handleImageBlur}
                  ref={petImageRef}
                  autoFocus={
                    submitted &&
                    !pokemonNames.includes(newPetName.toLowerCase())
                  }
                />
                {invalidUrl && <p className="error-message">Not a valid URL</p>}
              </li>
            )}
            <li>
              <button type="submit">Add Pet</button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  )
}

export default PetListHome
