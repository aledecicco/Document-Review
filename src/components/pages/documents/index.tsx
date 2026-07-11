import { NavLink } from 'react-router-dom'
import { type Review, useQueryReviews } from '@/api/queries/reviews'
import { QueryLoader } from '@/components/lib/QueryLoader'
import { cx } from '@/utils/cx'

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

const DocumentItem = (props: DocumentItemProps) => {
  const { document } = props

  return (
    <div
      key={document.id}
      className={cx(
        'border border-border-secondary size-full rounded-md p-4',
        'hover:bg-tertiary',
      )}
    >
      <h5 className={cx('text-md text-secondary font-semibold')}>
        {document.name}
      </h5>
      <p
        className={cx(
          'text-sm text-secondary',
          document.status === 'submitted' && 'text-success-primary',
          document.status === 'on_review' && 'text-brand-primary',
        )}
      >
        {document.status === 'created' && 'Created'}
        {document.status === 'processing' && 'Processing'}
        {document.status === 'on_review' && 'Ready for review'}
        {document.status === 'submitted' && 'Submitted'}
      </p>
    </div>
  )
}

export { DocumentsContent }
