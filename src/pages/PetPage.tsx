import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePet, getPet } from '../api'
import { useMutation, useQuery } from 'react-query'
import { PetType } from '../types/PetsTypes'

const PetPage = () => {
  const { id } = useParams() as { id: string }
  console.log(id)

  const navigate = useNavigate()
  const PetTemplate: PetType = {
    id: undefined,
    name: '',
    birthday: undefined,
    hungerLevel: 0,
    happinessLevel: 0,
    lastInteractedWithDate: undefined,
    isDead: false,
    playtimes: [],
    feedings: [],
    scoldings: [],
  }
  const { data: pet = PetTemplate, isLoading } = useQuery(['pet', id], () =>
    getPet(id)
  )

  const deleteMutation = useMutation((id: string) => deletePet(id), {
    onSuccess: function () {
      navigate('/')
    },
  })

  // const deleteMutation = use

  if (isLoading) {
    return null
  }

  return (
    <div>
      <div className="breadcrumb">
        <Link to={'/'}>Home</Link>
      </div>

      <div className="pet">{pet.name}</div>

      <button
        onClick={function () {
          deleteMutation.mutate(id)
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default PetPage
