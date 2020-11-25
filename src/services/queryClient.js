import { QueryClient, QueryCache, MutationCache } from 'react-query'
import qs from 'qs'

class CustomMutatinoCache extends MutationCache {
  build(client, options, state) {
    const customOptions = { ...(options || {}) }

    if (
      typeof options.mutationKey === 'string' &&
      options.mutationFn === mutationFn
    ) {
      customOptions.mutationFn = async params => {
        const url = `${process.env.REACT_APP_API_URL}/${options.mutationKey}`
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }

        const res = await fetch(url, {
          headers,
          method: 'POST',
          body: JSON.stringify(params)
        })

        if (!res.ok) {
          throw new Error('Oops')
        }

        return res.json()
      }
    }

    return super.build(client, customOptions, state)
  }
}

const queryFn = async query => {
  const { queryKey = [] } = query || {}
  const [endpoint, params] =
    typeof queryKey === 'string' ? [queryKey] : queryKey
  const { data = {} } = params || {}

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/${endpoint}?${qs.stringify(data)}`
  )

  if (!res.ok) {
    throw new Error('Oops')
  }

  return res.json()
}

const mutationFn = () => {}

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new CustomMutatinoCache(),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      queryFn
    },
    mutations: {
      mutationFn
    }
  }
})
