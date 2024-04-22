import React from 'react'
import Pet from '../components/Pet'
import { useMutation, useQuery } from 'react-query'
import { createPet, getPets } from '../api'

const PetListHome = () => {
  const [newPetName, setNewPetName] = React.useState('')
  const { data: pets = [], refetch: refetchPets } = useQuery('pets', () =>
    getPets()
  )

  const createMutation = useMutation(
    (newPetName: string) => createPet(newPetName),
    {
      onSuccess: function () {
        refetchPets()
        setNewPetName('')
      },
    }
  )

  return (
    <section className="list-pets">
      <div className="pets">
        <ul className="top-level">
          {pets.map(function (pet) {
            return (
              <Pet key={pet.id} pet={pet} reloadPets={() => refetchPets()} />
            )
          })}
        </ul>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            createMutation.mutate(newPetName)
          }}
        >
          {' '}
          Add a new pet to the database:
          <input
            type="text"
            placeholder="Pet Name"
            value={newPetName}
            onChange={(event) => {
              setNewPetName(event.target.value)
            }}
          />
          <button type="submit">Add Pet</button>
        </form>
      </div>
    </section>
  )
}

export default PetListHome
