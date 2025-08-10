import { getPets } from '../api/petApi'
import { useQuery } from 'react-query'

const useLoadPets = () => {
  const {
    data: pets = [],
    isLoading: isPetsLoading,
    refetch: refetchPets,
  } = useQuery('pets', () => getPets(), {
    onError: (error) => {
      console.error('An error occurred while loading pet:', error)
    },
  })

  return { pets, isPetsLoading, refetchPets }
}

export default useLoadPets
