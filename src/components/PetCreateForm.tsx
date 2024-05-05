import React from 'react'
import useCreatePet from '../hooks/useCreatePet'
import { usePokemonNamesContext } from '../context/PokemonNamesContext'
import { getPokemonImages, getPokemonSprites, isValidUrl } from '../otherApi'

const CreatePetForm = () => {
  const createMutation = useCreatePet()
  const { pokemonNames } = usePokemonNamesContext()

  const [newPetName, setNewPetName] = React.useState('')
  const [newPetImage, setNewPetImage] = React.useState('')
  const [newPetSprite, setNewPetSprite] = React.useState('')

  const [submitted, setSubmitted] = React.useState(false)
  const [urlSubmitted, setUrlSubmitted] = React.useState(false)
  const [trySubmitSprite, setTrySubmitSprite] = React.useState(false)
  const [trySubmitImage, setTrySubmitImage] = React.useState(false)

  const [invalidName, setInvalidName] = React.useState(false)
  const [isValidSpriteUrl, setIsValidSpriteUrl] = React.useState(false)
  const [isValidImageUrl, setIsValidImageUrl] = React.useState(false)

  // const [nameTouched, setNameTouched] = React.useState(false)
  const [spriteTouched, setSpriteTouched] = React.useState(false)
  const [imageTouched, setImageTouched] = React.useState(false)

  const petNameRef = React.useRef<HTMLInputElement>(null)
  const petSpriteRef = React.useRef<HTMLInputElement>(null)
  const petImageRef = React.useRef<HTMLInputElement>(null)

  const fetchPokemonSpritesAndImages = async () => {
    if (newPetName) {
      const sprites = await getPokemonSprites(pokemonNames)
      const images = await getPokemonImages(pokemonNames)

      // Set Sprite
      const foundSprite =
        sprites.find((pokemon) => newPetName.toLowerCase() === pokemon.name)
          ?.picture || ''

      // Set Image
      const foundImage =
        images.find((pokemon) => newPetName.toLowerCase() === pokemon.name)
          ?.picture || ''

      // Validate Urls
      const isValidSprite = await isValidUrl(foundSprite)
      const isValidImage = await isValidUrl(foundImage)
      if (isValidSprite) {
        setIsValidSpriteUrl(true)
      }
      if (isValidImage) {
        setIsValidImageUrl(true)
      }

      setNewPetSprite(foundSprite)
      setNewPetImage(foundImage)
      setNewPetName(
        newPetName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      )
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log('!!newPetName.trim()', !!newPetName.trim())
    // console.log('!newPetName.trim()', !newPetName.trim())
    if (!newPetName.trim()) {
      setInvalidName(true)
      return
    } else {
      setInvalidName(false)
    }
    setSubmitted(true)

    // POKEMON CHECKING BLOCK
    const isPokemonName = pokemonNames.includes(newPetName.toLowerCase())

    // Get Sprites and Images for Pokemon Name
    if (isPokemonName) {
      fetchPokemonSpritesAndImages()
    }

    if (!spriteTouched && !imageTouched) {
      return
    }

    if (!isPokemonName) {
      const isValidSprite = await isValidUrl(newPetSprite)
      if (spriteTouched && !isValidSprite) {
        setIsValidSpriteUrl(false)
        setTrySubmitSprite(true)
        petSpriteRef.current?.focus()
        return
      }
      setUrlSubmitted(true)
      setIsValidSpriteUrl(true)
      setTrySubmitSprite(false)

      if (newPetImage.trim() !== '' || imageTouched) {
        const isValidImage = await isValidUrl(newPetImage)
        if (imageTouched && !isValidImage) {
          setTrySubmitImage(true)
          setIsValidImageUrl(false)
          petImageRef.current?.focus()
          return
        }
        if (isValidImage) {
          setIsValidImageUrl(true)
        }
      }
    }
  }

  React.useEffect(() => {
    if (isValidImageUrl) {
      createMutation.mutate({
        newPetName: newPetName,
        spriteUrl: newPetSprite,
        imageUrl: newPetImage,
      })
      setNewPetName('')
      setNewPetSprite('')
      setNewPetImage('')
      setSubmitted(false)
      setUrlSubmitted(false)
      setInvalidName(false)
      setIsValidSpriteUrl(false)
      setIsValidImageUrl(false)
      setSpriteTouched(false)
      setImageTouched(false)
      petNameRef.current?.focus()
    }
  }, [isValidImageUrl])

  // function checkStates() {
  //   console.log('submitted', submitted)
  //   console.log('urlSubmitted', urlSubmitted)
  //   console.log('isValidSpriteUrl', isValidSpriteUrl)
  //   console.log('isValidImageUrl', isValidImageUrl)
  //   console.log('newPetName', newPetName)
  //   console.log('newPetSprite', newPetSprite)
  //   console.log('newPetImage', newPetImage)
  //   console.log('spriteTouched', spriteTouched)
  //   console.log('imageTouched', imageTouched)
  // }

  return (
    // <div className="container">
    //   <div className="cross"></div>
    <form id="create-pet-form" onSubmit={handleSubmit}>
      <ul>
        <li className="input-label">Add a new pet to the database:</li>
        <li>
          <ul className="input-container">
            <li>
              <input
                type="text"
                placeholder="Pet Name"
                value={newPetName}
                onChange={(event) => {
                  setNewPetName(event.target.value)
                  setInvalidName(false)
                  setSubmitted(false)
                }}
                ref={petNameRef}
                // onFocus={() => setNameTouched(true)}
              />
              {invalidName && (
                <p className="error-message">Your pet must have a name!</p>
              )}
            </li>
          </ul>
        </li>
        {submitted && !pokemonNames.includes(newPetName.toLowerCase()) && (
          <li>
            <ul className="input-container">
              {!urlSubmitted ? (
                <li>
                  <input
                    type="text"
                    placeholder="Add a sprite from a url"
                    value={newPetSprite}
                    onChange={(event) => {
                      setNewPetSprite(event.target.value)
                      setTrySubmitSprite(false)
                      setSpriteTouched(true)
                    }}
                    ref={petSpriteRef}
                    autoFocus={
                      !submitted ||
                      !pokemonNames.includes(newPetName.toLowerCase())
                    }
                    onKeyDown={() => {
                      setSpriteTouched(true)
                    }}
                  />
                  {trySubmitSprite && !isValidSpriteUrl && (
                    <p className="error-message">Not a valid Sprite URL</p>
                  )}
                </li>
              ) : (
                <li>
                  <input
                    type="text"
                    placeholder="Add an image from a url"
                    value={newPetImage}
                    onChange={(event) => {
                      setNewPetImage(event.target.value)
                      setTrySubmitImage(false)
                      setIsValidImageUrl(false)
                      setImageTouched(true)
                    }}
                    ref={petImageRef}
                    autoFocus={!urlSubmitted && submitted}
                    onKeyDown={() => {
                      setImageTouched(true)
                    }}
                  />
                  {trySubmitImage && !isValidImageUrl && (
                    <p className="error-message">Not a valid Image URL</p>
                  )}
                </li>
              )}
            </ul>
          </li>
        )}
        <li>
          {/* <div className="btn-container"> */}
          <button type="submit">Add Pet</button>
          {/* </div> */}
        </li>
        {/* <li>
          <button onClick={checkStates} type="submit">
            Check States
          </button>
        </li> */}
      </ul>
    </form>
    // </div>
  )
}

export default CreatePetForm
