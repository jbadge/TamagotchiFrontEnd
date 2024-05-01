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
    onError: function (error) {
      console.error('An error occurred:', error)
    },
  })
}

export default useFeeding
