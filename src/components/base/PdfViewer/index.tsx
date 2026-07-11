import { RPLayout, type RPLayoutProps, RPPages } from '@react-pdf-kit/viewer'
import { useBreakpoint } from '@/utils/breakpoints'

interface PdfViewerProps extends RPLayoutProps {}

const PdfViewer = (props: PdfViewerProps) => {
  const isLarge = useBreakpoint('lg')

  return (
    <RPLayout
      toolbar={false}
      {...props}
      style={{ height: isLarge ? '100%' : undefined, ...props.style }}
    >
      <RPPages />
    </RPLayout>
  )
}

export { PdfViewer, type PdfViewerProps }
