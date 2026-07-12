import { File01, HomeLine, Tool01 } from '@untitledui/icons'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BadgeWithDot } from '@/components/base/Badge'
import { NavList } from '@/components/base/NavList'
import { DocumentsContent } from '@/components/pages/documents'
import { ReviewContent } from '@/components/pages/review'
import { cx } from '@/utils/cx'
import { MobileNavigationHeader } from './components/base/Header'

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: HomeLine,
  },
  {
    label: 'Documents',
    icon: File01,
    href: '/documents',
    badge: <BadgeWithDot color="success">New</BadgeWithDot>,
  },
]

const App = () => {
  const { pathname } = useLocation()

  return (
    <div
      className={cx(
        'size-full max-h-full overflow-hidden',
        'grid grid-cols-1 grid-rows-[max-content_1fr]',
      )}
    >
      <div
        className={cx(
          'w-full px-4 py-3.5 lg:px-6 bg-bg-brand-solid flex items-center justify-between shadow-sm relative z-10',
        )}
      >
        <div className={cx('flex items-center gap-3')}>
          <div
            className={cx(
              'p-2 rounded-lg bg-white/15 text-text-primary_on-brand',
            )}
          >
            <File01 className={cx('size-5')} aria-hidden="true" />
          </div>
          <h1
            className={cx(
              'text-lg lg:text-xl text-text-primary_on-brand font-bold tracking-tight',
            )}
          >
            Document Review
          </h1>
        </div>

        <MobileNavigationHeader>
          <NavList activeUrl={pathname} items={navItems} />
        </MobileNavigationHeader>
      </div>
      <div
        className={cx(
          'size-full',
          'grid grid-rows-1 overflow-hidden',
          'grid-cols-1 lg:grid-cols-[250px_1fr]',
        )}
      >
        <div
          className={cx(
            'hidden lg:block size-full',
            'border-r border-r-secondary',
          )}
        >
          <NavList activeUrl={pathname} items={navItems} />
        </div>

        <div className={cx('p-4 size-full overflow-hidden')}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div>
                    <h2 className={cx('text-lg font-semibold')}>Home</h2>
                  </div>

                  <div
                    className={cx(
                      'size-full flex flex-col items-center justify-center gap-3 py-16 text-center',
                    )}
                  >
                    <Tool01
                      className={cx('size-6 text-fg-quaternary')}
                      aria-hidden="true"
                    />
                    <p className={cx('text-md text-secondary font-medium')}>
                      Under construction
                    </p>
                  </div>
                </>
              }
            />
            <Route path="documents" element={<DocumentsContent />} />
            <Route path="documents/:id" element={<ReviewContent />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export { App }
