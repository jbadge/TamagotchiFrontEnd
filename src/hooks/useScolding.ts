import { useMutation } from 'react-query'
import { createScolding } from '../api'
import useLoadPet from './useLoadPet'

const useScolding = (id: string) => {
  const { refetchPet } = useLoadPet(id)

  return useMutation(() => createScolding(id), {
    onSuccess: function () {
      refetchPet()
    },
    onSettled: function () {
      refetchPet()
    },
  })
}

export default useScolding
