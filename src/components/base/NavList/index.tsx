'use client'

import { cx } from '@/utils/cx'
import type { NavItemDividerType, NavItemType } from './config'
import { NavItemBase } from './Item'

interface NavListProps {
  /** URL of the currently active item. */
  activeUrl?: string
  /** Additional CSS classes to apply to the list. */
  className?: string
  /** List of items to display. */
  items: (NavItemType | NavItemDividerType)[]
}

const NavList = ({ activeUrl, items, className }: NavListProps) => {
  return (
    <ul className={cx('flex flex-col px-4 pt-5', className)}>
      {items.map((item) => {
        if (item.divider) {
          return (
            <li key={item.href} className="w-full px-0.5 py-2">
              <hr className="h-px w-full border-none bg-border-secondary" />
            </li>
          )
        }

        return (
          <li key={item.label} className="py-px">
            <NavItemBase
              badge={item.badge}
              icon={item.icon}
              href={item.href}
              current={activeUrl === item.href}
            >
              {item.label}
            </NavItemBase>
          </li>
        )
      })}
    </ul>
  )
}

export { NavList, type NavListProps }
