import React from 'react'
import { getPets } from '../api'
import { useQuery } from 'react-query'

const useLoadPets = () => {
  const { data: pets = [], refetch: refetchPets } = useQuery(
    'pets',
    () => getPets(),
    {
      // onError: (error) => {
      //   console.error('An error occurred while loading pet:', error)
      // },
    }
  )
  return React.useMemo(() => ({ pets, refetchPets }), [pets, refetchPets])
}

export default useLoadPets
