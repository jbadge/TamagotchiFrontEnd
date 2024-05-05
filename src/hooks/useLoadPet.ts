import { getPet } from '../api'
import { useQuery } from 'react-query'
import { EmptyPet } from '../types/PetsTypes'

const useLoadPet = (id: string) => {
  const {
    data: pet = EmptyPet,
    isLoading: isPetLoading,
    refetch: refetchPet,
  } = useQuery(['pet', id], () => getPet(id), {
    // onError: (error) => {
    //   console.error('An error occurred while loading pet:', error)
    // },
  })

  return { pet, isPetLoading, refetchPet }
}

export default useLoadPet
