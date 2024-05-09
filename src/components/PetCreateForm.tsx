import React from 'react'
import useCreatePet from '../hooks/useCreatePet'
import { usePokemonNamesContext } from '../context/PokemonNamesContext'
import { getPokemonImage, getPokemonSprite, isValidUrl } from '../otherApi'
import { EmptyPet, PetType } from '../types/PetsTypes'

const CreatePetForm = () => {
  const createMutation = useCreatePet()
  const { pokemonNames } = usePokemonNamesContext()

  const [newPet, setNewPet] = React.useState<PetType>(EmptyPet)

  const [submitted, setSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isValidSpriteUrl, setIsValidSpriteUrl] = React.useState(false)
  const [isValidImageUrl, setIsValidImageUrl] = React.useState(false)
  const [invalidName, setInvalidName] = React.useState(false)

  const [trySubmitSprite, setTrySubmitSprite] = React.useState(false)
  const [trySubmitImage, setTrySubmitImage] = React.useState(false)

  const [spriteTouched, setSpriteTouched] = React.useState(false)
  const [imageTouched, setImageTouched] = React.useState(false)

  const petNameRef = React.useRef<HTMLInputElement>(null)
  const petSpriteRef = React.useRef<HTMLInputElement>(null)
  const petImageRef = React.useRef<HTMLInputElement>(null)

  let isPokemonName = false
  let spriteCheck = false
  let imageCheck = false
  // setTimeout(() => {
  //   setIsSubmitting(false)
  // }, 1000)

  // debouncedHandleSubmit

  // React.useCallback(
  // [isSubmitting]
  // )

  // const debouncedHandleSubmit = React.useCallback(debounce(handleSubmit, 300), [
  //   handleSubmit,
  // ])

  // function debounce<T extends unknown[]>(
  //   func: (..._args: T) => void,
  //   delay: number
  // ): (..._args: T) => void {
  //   let timer: number | null = null
  //   return (...args: T) => {
  //     if (timer) clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       func.call(null, ...args)
  //     }, delay)
  //   }
  // }

  const fetchPokemonSpritesAndImages = async (newPetId?: string) => {
    const value = newPetId || newPet.name
    if (value) {
      // Set Sprite
      const foundSprite = (await getPokemonSprite(value)).picture

      // Set Image
      const foundImage = (await getPokemonImage(value)).picture

      // Validate Urls
      const isValidSprite = await isValidUrl(foundSprite)
      const isValidImage = await isValidUrl(foundImage)

      if (isValidSprite) {
        setIsValidSpriteUrl(true)
      }
      if (isValidImage) {
        setIsValidImageUrl(true)
      }
      newPetId
        ? setNewPet({
            ...newPet,
            name: newPet.name,
            spriteUrl: foundSprite,
            imageUrl: foundImage,
          })
        : setNewPet({
            ...newPet,
            name: newPet.name
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase()),
            spriteUrl: foundSprite,
            imageUrl: foundImage,
          })
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 100)

    if (submitted) {
      setSpriteTouched(true)
      spriteCheck = true
    }

    if (isValidSpriteUrl) {
      setImageTouched(true)
      imageCheck = true
    }

    if (!newPet.name.trim()) {
      setInvalidName(true)
      // setIsSubmitting(false)
      return
    }
    // else {
    //   setInvalidName(false)
    // }
    setSubmitted(true)
    isPokemonName = pokemonNames.includes(newPet.name.toLowerCase())

    // Get Sprites and Images for Pokemon Name
    if (isPokemonName) {
      isPokemonName = true
      fetchPokemonSpritesAndImages()
      spriteCheck = true
      imageCheck = true
    }

    if (!spriteCheck && !imageCheck) {
      // setIsSubmitting(false)
      return
    }

    if (!isPokemonName) {
      // Make sure sprite is valid, else try again
      if (spriteCheck) {
        const isValidSprite = await isValidUrl(newPet.spriteUrl)
        if (spriteTouched && !isValidSprite) {
          setIsValidSpriteUrl(false)
          setTrySubmitSprite(true)
          petSpriteRef.current?.focus()
          // setIsSubmitting(false)
          return
        }
        // setSpriteUrlValid(true)
        setIsValidSpriteUrl(true)
        setTrySubmitSprite(false)
      }

      // Make sure image is valid, else try again
      if (imageCheck) {
        const isValidImage = await isValidUrl(newPet.imageUrl)
        if (imageTouched && !isValidImage) {
          setTrySubmitImage(true)
          setIsValidImageUrl(false)
          petImageRef.current?.focus()
          // setIsSubmitting(false)
          return
        }

        // Grab random image and sprite pokemon for empty picture urls
        if (newPet.spriteUrl === '' && newPet.imageUrl === '') {
          const coinToss = Math.random() < 0.5
          const randomNumber = coinToss
            ? Math.floor(Math.random() * (1025 - 152 + 1)) + 152
            : Math.floor(Math.random() * (10277 - 10001 + 1)) + 10001
          fetchPokemonSpritesAndImages(String(randomNumber))
        } else {
          if (
            newPet.spriteUrl !== '' &&
            newPet.imageUrl !== '' &&
            isValidImage
          ) {
            setIsValidImageUrl(true)
          }
        }
      }
    }
    // setIsSubmitting(false)
  }

  React.useEffect(() => {
    if (isValidImageUrl && newPet.spriteUrl !== '' && newPet.imageUrl !== '') {
      createMutation.mutate({
        newPetName: newPet.name,
        spriteUrl: newPet.spriteUrl,
        imageUrl: newPet.imageUrl,
      })
      setNewPet(EmptyPet)
      setSubmitted(false)
      setInvalidName(false)
      setIsValidSpriteUrl(false)
      setIsValidImageUrl(false)
      setSpriteTouched(false)
      setImageTouched(false)
      petNameRef.current?.focus()
    }
  }, [isValidImageUrl])

  React.useEffect(() => {
    if (isValidSpriteUrl) {
      petImageRef.current?.focus()
    }
  }, [isValidSpriteUrl])

  return (
    <form id="create-pet-form" onSubmit={handleSubmit}>
      <ul>
        <li className="input-label">Add a new pet to the database:</li>
        <li>
          <ul className="input-container">
            <li>
              <input
                type="text"
                placeholder="Pet Name"
                value={newPet.name}
                onChange={(event) => {
                  setNewPet((prevPet) => ({
                    ...prevPet,
                    name: event.target.value,
                  }))
                  setInvalidName(false)
                  setSubmitted(false)
                }}
                ref={petNameRef}
              />
              {invalidName && (
                <p className="error-message">Your pet must have a name!</p>
              )}
            </li>
          </ul>
        </li>
        {submitted && !pokemonNames.includes(newPet.name.toLowerCase()) && (
          <li>
            <ul className="input-container">
              {!isValidSpriteUrl ? (
                <li>
                  <input
                    type="text"
                    placeholder="Add a sprite from a url"
                    value={newPet.spriteUrl}
                    onChange={(event) => {
                      setSpriteTouched(true)
                      setNewPet((prevPet) => ({
                        ...prevPet,
                        spriteUrl: event.target.value,
                      }))
                      setTrySubmitSprite(false)
                    }}
                    ref={petSpriteRef}
                    autoFocus={
                      !submitted ||
                      !pokemonNames.includes(newPet.name.toLowerCase())
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
                    value={newPet.imageUrl}
                    onChange={(event) => {
                      setNewPet((prevPet) => ({
                        ...prevPet,
                        imageUrl: event.target.value,
                      }))
                      setTrySubmitImage(false)
                      setIsValidImageUrl(false)
                      setImageTouched(true)
                    }}
                    ref={petImageRef}
                    autoFocus={!isValidSpriteUrl && submitted}
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
          <button type="submit" disabled={isSubmitting}>
            Add Pet
          </button>
        </li>
      </ul>
    </form>
  )
}

export default CreatePetForm
