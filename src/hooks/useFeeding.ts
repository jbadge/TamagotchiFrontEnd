import { useMutation } from 'react-query'
import { createFeeding } from '../api'
import useLoadPet from './useLoadPet'

const useFeeding = (id: string) => {
  const { refetchPet } = useLoadPet(id)

  return useMutation(() => createFeeding(id), {
    onSuccess: function () {
      refetchPet()
    },
    onSettled: function () {
      refetchPet()
    },
  })
}

export default useFeeding
