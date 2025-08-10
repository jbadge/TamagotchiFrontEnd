import { deletePet } from '../api/petApi'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

const useDeletePetMutation = (id: string) => {
  const navigate = useNavigate()

  return useMutation(() => deletePet(id), {
    onSuccess: function () {
      navigate('/')
    },
  })
}

export default useDeletePetMutation
