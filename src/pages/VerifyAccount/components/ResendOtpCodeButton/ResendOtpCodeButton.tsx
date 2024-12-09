import moment from 'moment'
import { useEffect } from 'react'
import { cn } from 'src/lib/tailwind/utils'

interface ResendOtpCodeButtonProps {
  handleResendOtpCode: () => Promise<void>
  isShowResendOtpButton: boolean
  setIsShowResendOtpButton: React.Dispatch<React.SetStateAction<boolean>>
  lastCalledResendOtpTime: string
  setLastCalledResendOtpTime: React.Dispatch<React.SetStateAction<string>>
}

export default function ResendOtpCodeButton({
  handleResendOtpCode,
  isShowResendOtpButton,
  setIsShowResendOtpButton,
  lastCalledResendOtpTime,
  setLastCalledResendOtpTime
}: ResendOtpCodeButtonProps) {
  useEffect(() => {
    if (!lastCalledResendOtpTime) return

    const interval = setInterval(() => {
      const now = moment()
      const lastCalledMoment = moment(lastCalledResendOtpTime)
      const diffInSeconds = now.diff(lastCalledMoment, 'seconds')
      if (diffInSeconds >= 60) {
        setIsShowResendOtpButton(true)
        setLastCalledResendOtpTime('')
        clearInterval(interval)
      } else {
        setIsShowResendOtpButton(false)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lastCalledResendOtpTime])

  return (
    <div
      className={cn('text-sm font-normal', {
        'text-primary/80 hover:cursor-pointer hover:text-primary': isShowResendOtpButton,
        'text-neutral-4 hover:cursor-not-allowed': !isShowResendOtpButton
      })}
      onClick={isShowResendOtpButton ? handleResendOtpCode : undefined}
    >
      Gửi lại mã
    </div>
  )
}
