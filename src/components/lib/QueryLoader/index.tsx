import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { cx } from '@/utils/cx'

interface QueryLoaderProps<T> {
  children: (data: T) => ReactNode

  /**
   * A label for what is being rendered.
   */
  name: string

  /**
   * The query being loaded.
   */
  query: UseQueryResult<T>
}

/**
 * Handles the loading states of a query and displays the children once the data is loaded.
 */
const QueryLoader = <T,>(props: QueryLoaderProps<T>) => {
  const { name, query, children } = props

  if (query.status === 'pending') {
    return <p className={cx('text-md text-secondary')}>Loading {name}...</p>
  }

  if (query.status === 'error') {
    return (
      <p className={cx('text-md text-error-primary')}>Failed to load {name}.</p>
    )
  }

  return children(query.data)
}

export { QueryLoader, type QueryLoaderProps }
