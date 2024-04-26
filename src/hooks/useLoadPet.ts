import { getPet } from '../api'
import { useQuery } from 'react-query'
import { EmptyPet } from '../types/PetsTypes'

const useLoadPet = (id: string) => {
  const { data: pet = EmptyPet, isLoading: isPetLoading } = useQuery(
    ['pet', id],
    () => getPet(id)
  )

  return { pet, isPetLoading }
}

export default useLoadPet
