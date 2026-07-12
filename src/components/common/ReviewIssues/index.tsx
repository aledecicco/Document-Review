import { usePaginationContext } from '@react-pdf-kit/viewer'
import type { ComponentProps, RefObject } from 'react'
import type { Issue, Review } from '@/api/queries/reviews'
import { BadgeWithDot } from '@/components/base/Badge'
import { splitBy } from '@/utils/array'
import { cx } from '@/utils/cx'

interface ReviewIssuesProps {
  /**
   * The review being displayed.
   */
  review: Review

  /**
   * A ref to the component rendering the file.
   */
  docRef: RefObject<HTMLDivElement | null>
}

/**
 * Displays a list of issues present in a PDF file.
 * Must be used inside a PDF provider to keep track of the page.
 */
const ReviewIssues = (props: ReviewIssuesProps) => {
  const { review, docRef } = props
  const { focusedPage, goToPage } = usePaginationContext()

  const issues = review.issues.toSorted((issueA, issueB) => {
    const cmpA =
      issueA.severity === 'critical' ? -1 : issueA.severity === 'major' ? 0 : 1
    const cmpB =
      issueB.severity === 'critical' ? -1 : issueB.severity === 'major' ? 0 : 1

    if (cmpA === cmpB) {
      return issueA.page - issueB.page
    }

    return cmpA - cmpB
  })

  const [current, others] = splitBy(
    issues,
    (issue) => issue.page === focusedPage,
  )

  return (
    <div className={cx('size-full overflow-auto')}>
      <div>
        <h5 className={cx('font-semibold text-secondary mb-2')}>
          In Current Page (#{focusedPage})
        </h5>
        {current.length > 0 ? (
          <div className={cx('flex flex-col')}>
            {current.map((issue) => (
              <IssueItem key={issue.id} issue={issue} isCurrent />
            ))}
          </div>
        ) : (
          <p className={cx('text-sm text-fg-quaternary italic')}>No issues</p>
        )}
      </div>

      <div className={cx('mt-8')}>
        <h5 className={cx('font-semibold text-secondary mb-2')}>
          All Other Issues
        </h5>
        {others.length > 0 ? (
          <div className={cx('flex flex-col')}>
            {others.map((issue) => (
              <button
                type="button"
                aria-label={`page ${issue.page}: ${issue.title}. click to view.`}
                key={issue.id}
                className={cx(
                  'cursor-pointer rounded-r-md hover:bg-secondary focus:bg-secondary text-start',
                )}
                onClick={() => {
                  goToPage(issue.page)
                  docRef.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                <IssueItem issue={issue} />
              </button>
            ))}
          </div>
        ) : (
          <p className={cx('text-sm text-fg-quaternary italic')}>
            No more issues
          </p>
        )}
      </div>
    </div>
  )
}

interface IssueItemProps extends ComponentProps<'div'> {
  issue: Issue
  isCurrent?: boolean
}

const IssueItem = (props: IssueItemProps) => {
  const { issue, isCurrent, ...divProps } = props

  return (
    <div
      {...divProps}
      className={cx(
        divProps.className,
        'p-2 pl-3 border-l-2',
        issue.severity === 'critical' && 'border-l-fg-error-secondary',
        issue.severity === 'major' && 'border-l-fg-warning-secondary',
        issue.severity === 'minor' && 'border-l-utility-neutral-300',
      )}
    >
      <div className={cx('flex flex-row items-center gap-2')}>
        <BadgeWithDot
          color={
            issue.severity === 'critical'
              ? 'error'
              : issue.severity === 'major'
                ? 'warning'
                : 'gray'
          }
        >
          {issue.severity === 'critical'
            ? 'Critical'
            : issue.severity === 'major'
              ? 'Major'
              : 'Minor'}
        </BadgeWithDot>

        <p
          className={cx(
            'font-medium text-start',
            issue.severity === 'critical' && 'text-error-primary',
            issue.severity === 'major' && 'text-warning-primary',
            issue.severity === 'minor' && 'text-secondary',
          )}
        >
          {issue.title}
          {!isCurrent && (
            <span className={cx('text-sm text-gray-500')}>
              {' '}
              - page {issue.page}
            </span>
          )}
        </p>
      </div>

      {isCurrent && (
        <p className={cx('text-sm text-fg-secondary')}>{issue.description}</p>
      )}
    </div>
  )
}

export { ReviewIssues, type ReviewIssuesProps }
