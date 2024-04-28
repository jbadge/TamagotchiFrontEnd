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
  const [urlSubmitted, setUrlSubmitted] = React.useState(false)
  const [invalidSpriteUrl, setInvalidSpriteUrl] = React.useState(false)
  const [invalidImageUrl, setInvalidImageUrl] = React.useState(false)
  const [triggerEffect, setTriggerEffect] = React.useState(false)
  const [imageTouched, setImageTouched] = React.useState(false)
  const [spriteTouched, setSpriteTouched] = React.useState(false)

  const { pets } = useLoadPets()
  const createMutation = useCreatePet()
  const petSpriteRef = React.useRef<HTMLInputElement>(null)
  const petImageRef = React.useRef<HTMLInputElement>(null)

  const [pokemonImages, setPokemonImages] = React.useState<
    { name: string; picture: string }[]
  >([])

  const isValidUrl = (urlString: string) => {
    if (urlString !== '') {
      try {
        // setUrlSubmitted(true)
        const isValid = Boolean(new URL(urlString))
        console.log(`URL: ${urlString} - Valid: ${isValid}`)
        // setUrlSubmitted(true)
        return isValid
        // Boolean(new URL(urlString))
      } catch (error) {
        console.log(`URL: ${urlString} - Invalid`)
        return false
      }
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

  // const fetchPokemonSpritesAndImages = async () => {
  //   if (pokemonNames.length > 0 && newPetName) {
  //     const images = await getPokemonImages(pokemonNames)
  //     const sprites = await getPokemonSprites(pokemonNames)

  //     let foundSprite = ''
  //     let foundImage = ''

  //     // Set Sprite
  //     sprites.find((pokemon) => {
  //       if (newPetName.toLowerCase() === pokemon.name) {
  //         foundSprite = pokemon.picture
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //     setNewPetSprite(foundSprite)

  //     // Set Image
  //     images.find((pokemon) => {
  //       if (newPetName.toLowerCase() === pokemon.name) {
  //         foundImage = pokemon.picture
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //     setNewPetImage(foundImage)
  //   }
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    const isPokemonName = pokemonNames.includes(newPetName.toLowerCase())
    const formattedName = isPokemonName
      ? newPetName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : newPetName
    // fetchPokemonSpritesAndImages()
    // console.log(newPetImage)
    // if  this is a pokemon, hasImage is false
    const hasSprite = !!newPetSprite
    const hasImage = !!newPetImage
    console.log('Did you have to provide an sprite?', hasSprite)
    console.log('Did you have to provide an image?', hasImage)

    // console.log('isPokemonName', isPokemonName)
    // console.log('!isValidUrl', !isValidUrl)
    // console.log(newPetSprite)
    if (isPokemonName || hasSprite) {
      if (!isPokemonName) {
        if (!isValidUrl(newPetSprite)) {
          console.log('?')
          setInvalidSpriteUrl(true)
          petSpriteRef.current?.focus()
          return
        }
        setNewPetSprite(newPetSprite)
        setUrlSubmitted(true)
        console.log(!isPokemonName, !imageTouched, !isValidUrl(newPetImage))
        if (!isPokemonName && !imageTouched && !isValidUrl(newPetImage)) {
          console.log('!')
          setInvalidImageUrl(true)
          petImageRef.current?.focus()
          return
        }
        setNewPetImage(newPetImage)
        if (isPokemonName) {
          setNewPetName(formattedName)
          return
        }
        console.log('here')
      }
      if (isPokemonName || (newPetName && newPetSprite && newPetImage))
        createMutation.mutate({
          newPetName: formattedName,
          spriteUrl: newPetSprite,
          imageUrl: newPetImage,
        })
      setPetImageForPet(newPetImage)
      setNewPetName('')
      setNewPetImage('')
      setSubmitted(false)
      setTriggerEffect(true)

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

  // const handleSpriteBlur = () => {
  //   setImageTouched(true)
  //   setUrlSubmitted(true)
  //   // console.log(imageTouched)
  // }

  // const handleImageBlur = () => {
  //   setImageTouched(true)
  //   // console.log(imageTouched)
  // }

  const isPetsDbEmpty = () => {
    return pets.length === 0
  }

  React.useEffect(() => {
    if (isPetsDbEmpty()) {
      document.querySelector('.top-level')?.classList.add('emptyDb')
    }
  }, [pets])

  // React.useEffect(() => {
  //   if (newPetName && newPetSprite && newPetImage) {
  //     console.log('yo')
  //     createMutation.mutate({
  //       newPetName: newPetName,
  //       spriteUrl: newPetSprite,
  //       imageUrl: newPetImage,
  //     })
  //     setPetImageForPet(newPetImage)
  //     setNewPetName('')
  //     setNewPetImage('')
  //     setSubmitted(false)
  //     setTriggerEffect(true)
  //   }
  // }, [newPetName, newPetSprite, newPetImage])

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
  //   console.log(urlSubmitted)
  // }, [urlSubmitted])

  function checkStates() {
    console.log('submitted', submitted)
    console.log('urlSubmitted', urlSubmitted)
    console.log('invalidSpriteUrl', invalidSpriteUrl)
    console.log('imageTouched', imageTouched)
    console.log('invalidImageUrl', invalidImageUrl)
    console.log('newPetName', newPetName)
    console.log('newPetSprite', newPetSprite)
    console.log('newPetImage', newPetImage)
  }

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
              <>
                {urlSubmitted ? (
                  <li>
                    <input
                      type="text"
                      placeholder="Add an image from a url"
                      value={newPetImage}
                      onChange={(event) => {
                        setNewPetImage(event.target.value)
                        setImageTouched(event.target.value.trim() !== '') // Check if input value is not empty
                        setInvalidImageUrl(false)
                      }}
                      ref={petImageRef}
                    />
                    {imageTouched && invalidImageUrl && (
                      <p className="error-message">Not a valid Image URL</p>
                    )}
                  </li>
                ) : (
                  <li>
                    <input
                      type="text"
                      placeholder="Add an sprite from a url"
                      value={newPetSprite}
                      onChange={(event) => {
                        setNewPetSprite(event.target.value)
                        setInvalidSpriteUrl(false)
                      }}
                      ref={petSpriteRef}
                      autoFocus={
                        !submitted ||
                        !pokemonNames.includes(newPetName.toLowerCase())
                      }
                    />
                    {invalidSpriteUrl && (
                      <p className="error-message">Not a valid Sprite URL</p>
                    )}
                  </li>
                )}
              </>
            )}
            <li>
              <button type="submit">Add Pet</button>
            </li>
          </ul>
        </form>
        <button onClick={checkStates} type="submit">
          Check States
        </button>
      </div>
    </section>
  )
}

export default PetListHome
