import { useMutation } from 'react-query'
import { createPlaytime } from '../api'
import useLoadPet from './useLoadPet'

const usePlaytime = (id: string) => {
  const { refetchPet } = useLoadPet(id)

  return useMutation(() => createPlaytime(id), {
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

export default usePlaytime
