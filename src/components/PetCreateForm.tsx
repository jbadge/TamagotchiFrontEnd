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

  const [isValidSpriteUrl, setIsValidSpriteUrl] = React.useState(false)
  const [isValidImageUrl, setIsValidImageUrl] = React.useState(false)

  const [imageTouched, setImageTouched] = React.useState(false)

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
    setSubmitted(true)

    // POKEMON CHECKING BLOCK
    const isPokemonName = pokemonNames.includes(newPetName.toLowerCase())

    // Get Sprites and Images for Pokemon Name
    if (isPokemonName) {
      fetchPokemonSpritesAndImages()
    }

    // hasSprite will be true IF a valid URL for sprite is given.
    if (isPokemonName || !!newPetSprite) {
      if (!isPokemonName) {
        const isValidSprite = await isValidUrl(newPetSprite)
        console.log(isValidSprite)
        if (!isValidSprite) {
          setIsValidSpriteUrl(false)
          setTrySubmitSprite(true)
          petSpriteRef.current?.focus()
          return
        }
        setUrlSubmitted(true)
        setIsValidSpriteUrl(true)
        setTrySubmitSprite(false)

        const isValidImage = await isValidUrl(newPetImage)
        if (imageTouched && !isValidImage) {
          setTrySubmitImage(true)
          setIsValidImageUrl(false)
          petImageRef.current?.focus()
          return
        }

        if (await isValidUrl(newPetImage)) {
          setIsValidImageUrl(true)
        }
      }
      // petImageRef.current?.focus()
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
      setIsValidSpriteUrl(false)
      setIsValidImageUrl(false)
    }
  }, [isValidImageUrl])

  // function checkStates() {
  //   console.log('submitted', submitted)
  //   console.log('urlSubmitted', urlSubmitted)
  //   console.log('invalidSpriteUrl', isValidSpriteUrl)
  //   console.log('invalidImageUrl', isValidImageUrl)
  //   console.log('newPetName', newPetName)
  //   console.log('newPetSprite', newPetSprite)
  //   console.log('newPetImage', newPetImage)
  //   console.log('isValidSpriteUrl', isValidSpriteUrl)
  //   console.log('isValidImageUrl', isValidImageUrl)
  // }

  return (
    <form id="create-pet-form" onSubmit={handleSubmit}>
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
            {!urlSubmitted ? (
              <li>
                <input
                  type="text"
                  placeholder="Add an sprite from a url"
                  value={newPetSprite}
                  onChange={(event) => {
                    setNewPetSprite(event.target.value)
                    setTrySubmitSprite(false)
                  }}
                  ref={petSpriteRef}
                  autoFocus={
                    !submitted ||
                    !pokemonNames.includes(newPetName.toLowerCase())
                  }
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
                />
                {trySubmitImage && !isValidImageUrl && (
                  <p className="error-message">Not a valid Image URL</p>
                )}
              </li>
            )}
          </>
        )}
        <li>
          <button type="submit">Add Pet</button>
        </li>
        {/* <li>
          <button onClick={checkStates} type="submit">
            Check States
          </button>
        </li> */}
      </ul>
    </form>
  )
}

export default CreatePetForm
