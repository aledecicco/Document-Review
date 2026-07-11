import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      retry: false,
      networkMode: 'always',
    },
  },
})

const ApiProvider = (props: PropsWithChildren) => {
  return <QueryClientProvider client={client} {...props} />
}

export { ApiProvider }
