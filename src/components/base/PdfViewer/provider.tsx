import { RPProvider, type RPProviderProps } from '@react-pdf-kit/viewer'

interface PdfProviderProps extends RPProviderProps {}

const PdfProvider = (props: PdfProviderProps) => {
  return <RPProvider {...props} />
}

export { PdfProvider, type PdfProviderProps }
