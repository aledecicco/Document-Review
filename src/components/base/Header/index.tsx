'use client'

import { X as CloseIcon, Menu02 } from '@untitledui/icons'
import type { PropsWithChildren } from 'react'
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from 'react-aria-components'
import { cx } from '@/utils/cx'
import { Button } from '../Button'

export const MobileNavigationHeader = ({ children }: PropsWithChildren) => {
  return (
    <AriaDialogTrigger>
      <Button
        aria-label="Expand navigation menu"
        className="group flex items-center justify-center rounded-lg bg-brand-solid p-2 text-primary_on-brand outline-focus-ring hover:bg-brand-solid_hover focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
      >
        <Menu02 className="size-6 transition duration-200 ease-in-out group-aria-expanded:opacity-0" />
        <CloseIcon className="absolute size-6 opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100" />
      </Button>

      <AriaModalOverlay
        isDismissable
        className={({ isEntering, isExiting }) =>
          cx(
            'fixed inset-0 z-50 cursor-pointer bg-overlay/70 pr-16 backdrop-blur-md lg:hidden',
            isEntering && 'duration-300 ease-in-out animate-in fade-in',
            isExiting && 'duration-200 ease-in-out animate-out fade-out',
          )
        }
      >
        {({ state }) => (
          <>
            <Button
              aria-label="Close navigation menu"
              onPress={() => state.close()}
              className="fixed top-2.5 right-3 flex cursor-pointer items-center justify-center rounded-lg p-2 text-fg-white/70 outline-focus-ring hover:bg-white/10 hover:text-fg-white focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <CloseIcon className="size-6" />
            </Button>

            <AriaModal className="w-full max-w-74 cursor-auto will-change-transform">
              <AriaDialog className="h-dvh outline-hidden focus:outline-hidden bg-quaternary">
                {children}
              </AriaDialog>
            </AriaModal>
          </>
        )}
      </AriaModalOverlay>
    </AriaDialogTrigger>
  )
}
