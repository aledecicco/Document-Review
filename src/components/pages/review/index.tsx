import { AlertTriangle, ChevronRight, Clock, FileX02 } from '@untitledui/icons'
import { useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { type Review, useQueryReviews } from '@/api/queries/reviews'
import { BadgeWithDot } from '@/components/base/Badge'
import { Button } from '@/components/base/Button'
import { PdfViewer } from '@/components/base/PdfViewer'
import { PdfProvider } from '@/components/base/PdfViewer/provider'
import { ReviewIssues } from '@/components/common/ReviewIssues'
import { QueryLoader } from '@/components/lib/QueryLoader'
import { cx } from '@/utils/cx'
import { dateToString, pluralize } from '@/utils/string'

/**
 * Displays details about a file in review.
 */
const ReviewContent = () => {
  const reviewsQuery = useQueryReviews()
  const { id } = useParams()

  return (
    <QueryLoader name="document" query={reviewsQuery}>
      {(reviews) => {
        const review = reviews.find((review) => review.id === id)

        if (!review) {
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
                <FileX02 className={cx('size-5')} aria-hidden="true" />
              </div>
              <div>
                <p className={cx('text-md text-primary font-semibold')}>
                  Document #{id} not found
                </p>
                <p className={cx('text-sm text-tertiary')}>
                  It may have been moved or removed.
                </p>
              </div>
            </div>
          )
        }

        return <ReviewContentInner review={review} />
      }}
    </QueryLoader>
  )
}

interface ReviewContentInnerProps {
  review: Review
}

const ReviewContentInner = (props: ReviewContentInnerProps) => {
  const { review } = props

  const requiredFixes = review.issues.filter(
    (issue) => issue.severity !== 'minor',
  )

  const criticalCount = review.issues.filter(
    (issue) => issue.severity === 'critical',
  ).length
  const majorCount = review.issues.filter(
    (issue) => issue.severity === 'major',
  ).length
  const minorCount = review.issues.filter(
    (issue) => issue.severity === 'minor',
  ).length

  const docRef = useRef<HTMLDivElement>(null)

  return (
    <div className={cx('size-full overflow-auto lg:overflow-hidden')}>
      <div
        className={cx(
          'grid w-full h-max lg:h-full',
          'grid-cols-1 gap-6',
          'lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_500px] lg:grid-rows-[max-content_1fr] lg:gap-16',
        )}
      >
        <div
          className={cx(
            'flex flex-col gap-3 pb-4 border-b border-border-secondary',
          )}
        >
          <nav
            aria-label="Breadcrumb"
            className={cx(
              'flex items-center gap-1 text-sm text-tertiary',
            )}
          >
            <NavLink
              to="/documents"
              className={cx('hover:text-secondary transition-inherit-all')}
            >
              Documents
            </NavLink>
            <ChevronRight className={cx('size-3.5 text-fg-quaternary')} />
            <span className={cx('text-secondary font-medium truncate')}>
              {review.name}
            </span>
          </nav>

          <div className={cx('flex flex-wrap items-center gap-3')}>
            <h2 className={cx('text-xl font-semibold text-primary')}>
              {review.name}
            </h2>
            <BadgeWithDot color="gray">Version {review.version}</BadgeWithDot>
          </div>

          <div
            className={cx(
              'flex items-center gap-1.5 text-sm text-fg-secondary',
            )}
          >
            <Clock className={cx('size-4 text-fg-quaternary')} />
            Uploaded by {review.user.first_name} {review.user.last_name},{' '}
            {dateToString(review.uploaded_at)}
          </div>

          {review.issues.length > 0 && (
            <div className={cx('flex flex-wrap items-center gap-2')}>
              {criticalCount > 0 && (
                <BadgeWithDot color="error">
                  {pluralize(criticalCount, 'critical issue')}
                </BadgeWithDot>
              )}
              {majorCount > 0 && (
                <BadgeWithDot color="warning">
                  {pluralize(majorCount, 'major issue')}
                </BadgeWithDot>
              )}
              {minorCount > 0 && (
                <BadgeWithDot color="gray">
                  {pluralize(minorCount, 'minor issue')}
                </BadgeWithDot>
              )}
            </div>
          )}
        </div>

        <div
          className={cx(
            'flex flex-col items-center gap-2 rounded-lg border border-border-secondary p-4 shadow-xs h-max',
          )}
        >
          {requiredFixes.length > 0 ? (
            <>
              <Button
                size="xl"
                color="tertiary"
                className={cx('w-full border')}
                onClick={() => {
                  // TODO: plug in real action
                }}
              >
                Re-Upload
              </Button>
              <div
                className={cx(
                  'flex items-center gap-1.5 text-sm text-fg-secondary text-center',
                )}
              >
                <AlertTriangle
                  className={cx('size-4 text-fg-warning-primary shrink-0')}
                />
                This file has {pluralize(requiredFixes.length, 'issue')} that
                need your attention.
              </div>
            </>
          ) : (
            <>
              <Button
                size="xl"
                color="primary"
                className={cx('w-full')}
                onClick={() => {
                  // TODO: plug in real action
                }}
              >
                Submit
              </Button>
              {review.issues.length > 0 && (
                <p className={cx('text-sm font-semibold text-center')}>
                  This file still has{' '}
                  {pluralize(review.issues.length, 'minor issue')} that could
                  be fixed.
                </p>
              )}
            </>
          )}
        </div>

        <PdfProvider src={review.document.pdf_url}>
          <div ref={docRef}>
            <PdfViewer />
          </div>

          <ReviewIssues review={review} docRef={docRef} />
        </PdfProvider>
      </div>
    </div>
  )
}

export { ReviewContent }
