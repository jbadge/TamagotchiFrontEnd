import { deletePet } from '../api'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

const useDeletePetMutation = (id: string) => {
  const navigate = useNavigate()

  return useMutation(() => deletePet(id), {
    onSuccess: function () {
      navigate('/')
    },
    // onError: function (error) {
    //   console.error('An error occurred:', error)
    // },
  })
}

export default useDeletePetMutation
