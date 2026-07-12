import { File02 } from '@untitledui/icons'
import { NavLink } from 'react-router-dom'
import { type Review, useQueryReviews } from '@/api/queries/reviews'
import { BadgeWithDot } from '@/components/base/Badge'
import { QueryLoader } from '@/components/lib/QueryLoader'
import { cx } from '@/utils/cx'
import { dateToString } from '@/utils/string'

/**
 * Displays the list of available documents.
 */
const DocumentsContent = () => {
  const reviewsQuery = useQueryReviews()

  return (
    <div
      className={cx(
        'size-full grid grid-cols-1 grid-rows-[max-content_1fr] gap-4',
        'overflow-auto',
      )}
    >
      <div>
        <h2 className={cx('text-lg font-semibold')}>Documents</h2>
      </div>

      <QueryLoader name="documents" query={reviewsQuery}>
        {(documents) => (
          <div
            className={cx(
              'size-full grid auto-rows-max gap-8',
              'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
            )}
          >
            {documents.map((document) =>
              document.status === 'on_review' ? (
                <NavLink key={document.id} to={document.id}>
                  <DocumentItem document={document} />
                </NavLink>
              ) : (
                <DocumentItem key={document.id} document={document} />
              ),
            )}
          </div>
        )}
      </QueryLoader>
    </div>
  )
}

interface DocumentItemProps {
  document: Review
}

const statusBadgeColor = {
  created: 'gray',
  processing: 'gray',
  on_review: 'brand',
  submitted: 'success',
} as const

const statusLabel = {
  created: 'Created',
  processing: 'Processing',
  on_review: 'Ready for review',
  submitted: 'Submitted',
} as const

const DocumentItem = (props: DocumentItemProps) => {
  const { document } = props

  return (
    <div
      key={document.id}
      className={cx(
        'border border-border-secondary size-full rounded-lg p-4',
        'shadow-xs transition duration-150 ease-linear',
        'hover:shadow-md hover:border-border-brand',
        'flex flex-col gap-3',
      )}
    >
      <div className={cx('flex items-start justify-between gap-3')}>
        <div
          className={cx(
            'flex items-center justify-center size-10 rounded-lg shrink-0',
            'bg-brand-50 text-brand-600',
          )}
        >
          <File02 className={cx('size-5')} aria-hidden="true" />
        </div>

        <BadgeWithDot color={statusBadgeColor[document.status]}>
          {statusLabel[document.status]}
        </BadgeWithDot>
      </div>

      <div>
        <h5 className={cx('text-md text-primary font-semibold truncate')}>
          {document.name}
        </h5>
        <p className={cx('text-sm text-tertiary')}>
          Uploaded {dateToString(document.uploaded_at)}
        </p>
      </div>
    </div>
  )
}

export { DocumentsContent }
