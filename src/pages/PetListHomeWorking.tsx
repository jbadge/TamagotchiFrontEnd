import React from 'react'
import Pet from '../components/Pet'
import useLoadPets from '../hooks/useLoadPets'
import useCreatePet from '../hooks/useCreatePet'
import {
  getAllMatchingPokemon,
  getAllPokemon,
  getPokemonSprites,
} from '../pokemonPics'

const PetListHome = () => {
  const [newPetName, setNewPetName] = React.useState('')
  const [newPetImage, setNewPetImage] = React.useState('')
  const [petImageForPet, setPetImageForPet] = React.useState('')
  const [image, setImage] = React.useState('')
  const [nameIsPokemon, setNameIsPokemon] = React.useState<string[]>([])
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

  const fetchPokemonPics = async () => {
    const pokemonNames = nameIsPokemon
    if (pokemonNames.length > 0 && newPetName) {
      const images = await getPokemonSprites(pokemonNames)
      images.find((image) => {
        if (newPetName.toLowerCase() === image.name) {
          console.log(image.picture)
          setImage(image.picture)
        } else {
          // Responsible for image showing on page
          console.log(newPetImage)
          setImage(newPetImage)
        }
      })
      setPokemonImages(pokemonImages)
    } else if (newPetImage) {
      // Responsible for image showing on page
      setImage(newPetImage)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    const isPokemonName = nameIsPokemon.includes(newPetName.toLowerCase())
    const formattedName = isPokemonName
      ? newPetName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : newPetName
    fetchPokemonPics()
    console.log(newPetImage)
    // if  this is a pokemon, hasImage is false
    const hasImage = !!newPetImage
    // console.log('Did you have to provide an image?', hasImage)
    // console.log('isPokemonName', isPokemonName)
    // console.log('!isValidUrl', !isValidUrl)
    if (isPokemonName || hasImage) {
      if (!isPokemonName && !isValidUrl(newPetImage)) {
        setInvalidUrl(true)
        petImageRef.current?.focus()
        return
      }
      createMutation.mutate({
        newPetName: formattedName,
        // spriteUrl: newPetImage,
        // imageUrl: newPetImage,
      })
      setPetImageForPet(newPetImage)
      setNewPetName('')
      setNewPetImage('')
      setSubmitted(false)
      setTriggerEffect(true)
    } else {
      petImageRef.current?.focus()
    }
  }

  const handleImageBlur = () => {
    setImageTouched(true)
  }

  const isPetsDbEmpty = () => {
    return pets.length === 0
  }

  React.useEffect(() => {
    if (isPetsDbEmpty()) {
      document.querySelector('.top-level')?.classList.add('emptyDb')
    }
  }, [pets])

  // React.useEffect(() => {
  //   console.log(nameIsPokemon)
  // }, [nameIsPokemon])

  React.useEffect(() => {
    const fetchPokemonNames = async () => {
      const pokemonNames = await getAllPokemon()
      setNameIsPokemon(pokemonNames)
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
  //   if (petImageRef.current) {
  //     petImageRef.current.focus()
  //   }
  // }, [])

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
            {submitted && !nameIsPokemon.includes(newPetName.toLowerCase()) && (
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
                    !nameIsPokemon.includes(newPetName.toLowerCase())
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
