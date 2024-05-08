import { createPet } from '../api'
import useLoadPets from './useLoadPets'
import { useMutation } from 'react-query'

const useCreatePet = () => {
  const { refetchPets } = useLoadPets()
  return useMutation(
    ({
      newPetName,
      spriteUrl,
      imageUrl,
    }: {
      newPetName: string
      spriteUrl: string
      imageUrl: string
    }) => createPet(newPetName, spriteUrl, imageUrl),
    {
      onSuccess: function () {
        refetchPets()
      },
    }
  )
}

export default useCreatePet
