import { updatePet } from '../api'
import useLoadPet from './useLoadPet'
import { useMutation } from 'react-query'

const useUpdatePet = (id: string) => {
  const { refetchPet } = useLoadPet(id)

  return useMutation((isDead: boolean) => updatePet(id, isDead), {
    onSuccess: function () {
      refetchPet()
    },
    // onError: function (error) {
    //   console.error('An error occurred:', error)
    // },
  })
}

export default useUpdatePet
