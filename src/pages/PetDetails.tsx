import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useDeletePet from '../hooks/useDeletePet'
import useLoadPet from '../hooks/useLoadPet'
import { returnNameIfPokemonName, getPokemonImages } from '../otherApi'
import usePlaytime from '../hooks/usePlaytime'
import useFeeding from '../hooks/useFeeding'
import useScolding from '../hooks/useScolding'

const PetDetails = () => {
  const { id } = useParams() as { id: string }

  const { pet, isPetLoading, refetchPet } = useLoadPet(id)
  const deleteMutation = useDeletePet(id)
  const playtimeMutation = usePlaytime(id)
  const feedingMutation = useFeeding(id)
  const scoldingMutation = useScolding(id)

  const date = new Date(pet.birthday)
  const [image, setImage] = React.useState('')
  const [attemptAction, setAttemptAction] = React.useState(false)

  const handleFeedClick = async () => {
    try {
      if (pet!.hungerLevel! <= 5) {
        setAttemptAction(true)
      }
    } catch (error) {
      console.error('Error feeding pet:', error)
    }
    await feedingMutation.mutateAsync()
    refetchPet()
  }

  React.useEffect(() => {
    if (pet.hungerLevel !== undefined && pet.hungerLevel > 5) {
      setAttemptAction(false)
    }
  }, [pet])

  React.useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonName = await returnNameIfPokemonName()

      if (pokemonName.length > 0 && pet.name) {
        const images = await getPokemonImages(pokemonName)
        images.forEach((image) => {
          if (pet.name.toLowerCase() === image.name) {
            setImage(image.picture)
          }
        })
        setImage(pet.imageUrl)
      }
      setImage(pet.imageUrl)
    }
    fetchPokemon()
  }, [pet])

  if (isPetLoading) {
    return null
  }

  return (
    <section>
      <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link to="/">
                <span className="icon">
                  <i className="fa fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </Link>
            </li>
            {/* <li className="is-active">
              <Link to={`/${params.category}`}>{categoryItem.title}</Link>
            </li> */}
          </ul>
        </nav>
        <div className="pet-details-name">{pet.name}</div>
        <h3>{`${pet.isDead}`}</h3>
        <div className="pet-details-block">
          <div className="pet-details-picture">
            <img src={image} alt={`Picture of ${pet.name}`} />
          </div>
          <div className="pet-details-info">
            <ul>
              <li>
                Birthday:{' '}
                {`${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
              </li>
              {pet.hungerLevel !== undefined && (
                <li className="hunger-level">
                  <div>Hunger Level: {pet.hungerLevel}</div>
                  {attemptAction && (
                    <div className="hunger-message">
                      {pet.name} is not hungry enough to eat!
                    </div>
                  )}
                </li>
              )}
              <li>Happiness Level: {pet.happinessLevel}</li>
            </ul>
          </div>
        </div>
        <div className="actions">
          <div className="btn-group">
            <button
              className="play-btn"
              onClick={() => {
                playtimeMutation.mutate()
                // refetchPet()
              }}
            >
              Play
            </button>
            <button className="feed-btn" onClick={handleFeedClick}>
              Feed
            </button>
            <button
              className="scold-btn"
              onClick={() => {
                scoldingMutation.mutate()
                // refetchPet()
              }}
            >
              Scold
            </button>
          </div>
          <div className="delete-btn">
            <button
              className="delete-btn"
              onClick={function () {
                deleteMutation.mutate()
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PetDetails
