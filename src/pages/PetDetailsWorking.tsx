import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useDeletePet from '../hooks/useDeletePet'
import useLoadPet from '../hooks/useLoadPet'
import { getAllMatchingPokemon, getPokemonImages } from '../pokemonPics'

const PetDetails = () => {
  const { id } = useParams() as { id: string }
  const { pet, isPetLoading } = useLoadPet(id)
  const deleteMutation = useDeletePet(id)

  const [image, setImage] = React.useState('')
  const [pokemonImages, setPokemonImages] = React.useState<
    { name: string; picture: string }[]
  >([])

  React.useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonNames = await getAllMatchingPokemon()
      if (pokemonNames.length > 0 && pet.name) {
        const images = await getPokemonImages(pokemonNames)
        images.forEach((image) => {
          if (pet.name.toLowerCase() === image.name) {
            setImage(image.picture)
          }
        })
        setPokemonImages(pokemonImages)
      }
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
        {
          <div>
            <div className="pet-details-picture">
              <img src={image} alt={`Picture of ${pet.name}`} />
            </div>
          </div>
        }
        <button
          className="pet-details-delete-btn"
          onClick={function () {
            deleteMutation.mutate()
          }}
        >
          Delete
        </button>
      </div>
    </section>
  )
}

export default PetDetails
