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
      onError: function (error) {
        console.error('An error occurred:', error)
      },
    }
  )
}

export default useCreatePet
