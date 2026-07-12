import type { UseQueryResult } from '@tanstack/react-query'
import { AlertCircle, RefreshCw05 } from '@untitledui/icons'
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
    return (
      <div
        className={cx(
          'size-full flex flex-col items-center justify-center gap-3 py-16 text-center',
        )}
      >
        <RefreshCw05
          className={cx('size-6 text-fg-quaternary animate-spin')}
          aria-hidden="true"
        />
        <p className={cx('text-md text-secondary font-medium')}>
          Loading {name}...
        </p>
      </div>
    )
  }

  if (query.status === 'error') {
    return (
      <div
        className={cx(
          'size-full flex flex-col items-center justify-center gap-3 py-16 text-center',
        )}
      >
        <div
          className={cx(
            'flex items-center justify-center size-11 rounded-full bg-error-primary text-fg-error-primary',
          )}
        >
          <AlertCircle className={cx('size-5')} aria-hidden="true" />
        </div>
        <div>
          <p className={cx('text-md text-primary font-semibold')}>
            Failed to load {name}
          </p>
          <p className={cx('text-sm text-tertiary')}>
            Something went wrong. Try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  return children(query.data)
}

export { QueryLoader, type QueryLoaderProps }
