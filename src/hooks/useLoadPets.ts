import React from 'react'
import { getPets } from '../api'
import { useQuery } from 'react-query'

const useLoadPets = () => {
  // console.log('Running useLoadPets')

  const { data: pets = [], refetch: refetchPets } = useQuery('pets', () =>
    getPets()
  )
  return React.useMemo(() => ({ pets, refetchPets }), [pets, refetchPets])
}

export default useLoadPets
