import { File01, HomeLine } from '@untitledui/icons'
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
          'w-full p-4 bg-bg-brand-solid flex items-center justify-between',
        )}
      >
        <h1
          className={cx(
            'text-xl lg:text-2xl text-text-primary_on-brand font-bold',
          )}
        >
          Document Review
        </h1>

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
            <Route path="documents" element={<DocumentsContent />} />
            <Route path="documents/:id" element={<ReviewContent />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export { App }
