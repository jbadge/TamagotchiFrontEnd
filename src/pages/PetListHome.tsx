import React from 'react'
import Pet from '../components/Pet'
import useLoadPets from '../hooks/useLoadPets'
import CreatePetForm from '../components/PetCreateForm'

const PetListHome = () => {
  const { pets } = useLoadPets()

  // Search

  // Sort

  return (
    <section className="list-pets">
      <div className="pets">
        <ul className={'top-level'}>
          {pets.map(function (pet) {
            return <Pet key={pet.id} pet={pet} />
          })}
        </ul>
        <CreatePetForm />
      </div>
    </section>
  )
}

export default PetListHome
