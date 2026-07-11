import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { type Review, useQueryReviews } from '@/api/queries/reviews'
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
            <p className={cx('text-md text-error-primary')}>
              Document #{id} not found
            </p>
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
        <div>
          <h2 className={cx('text-lg font-semibold')}>
            {review.name} - Version {review.version}
          </h2>
          <h4 className={cx('text-md')}>
            Uploaded by {review.user.first_name} {review.user.last_name},{' '}
            {dateToString(review.uploaded_at)}
          </h4>
        </div>

        <div className={cx('flex flex-col items-center gap-2')}>
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
              <p className={cx('font-light text-fg-secondary')}>
                This file has {pluralize(requiredFixes.length, 'issue')} that
                need your attention.
              </p>
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
                <p className={cx('font-semibold')}>
                  This file still has
                  {pluralize(review.issues.length, 'minor issue')} that could be
                  fixed.
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
