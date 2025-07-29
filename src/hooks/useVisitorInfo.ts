import { getVisitorInfo } from '../api'
import { useQuery } from 'react-query'

const useVisitorInfo = () => {
  const { data } = useQuery('visitorInfo', getVisitorInfo)

  return {
    visitorId: data?.visitorId ?? '',
    isAdmin: data?.isAdmin ?? false,
  }
}

export default useVisitorInfo
