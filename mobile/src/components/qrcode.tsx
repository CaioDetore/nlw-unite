import { colors } from '@/styles/colors'
import QRCodeSvg from 'react-native-qrcode-svg'

type Props = {
  size: number
  value: string
}
export function QRCode({value, size}: Props) {
  return (
    <QRCodeSvg value={value} size={size} color={colors.white} backgroundColor='transparent' />
  )
}