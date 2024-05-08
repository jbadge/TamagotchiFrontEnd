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
  })
}

export default usePlaytime
