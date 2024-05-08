import { updatePet } from '../api'
import useLoadPet from './useLoadPet'
import { useMutation } from 'react-query'

const useUpdatePet = (id: string) => {
  const { refetchPet } = useLoadPet(id)

  return useMutation((isDead: boolean) => updatePet(id, isDead), {
    onSuccess: function () {
      refetchPet()
    },
    onSettled: function () {
      refetchPet()
    },
  })
}

export default useUpdatePet
