import React from 'react'
import { PetProps } from '../types/PetsTypes'
import { Link } from 'react-router-dom'

const Pet = ({
  pet: {
    id,
    name,
    birthday,
    hungerLevel,
    happinessLevel,
    lastInteractedWithDate,
    isDead,
    playtimes,
    feedings,
    scoldings,
  },
  reloadPets,
}: PetProps) => {
  return (
    <li key={id} className="pet">
      {/* <span>{name}</span> */}
      <Link to={`/pets/${id}`}>{name}</Link>
    </li>
  )
}

export default Pet
