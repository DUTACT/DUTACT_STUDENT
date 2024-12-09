import { useEffect, useRef, useState } from 'react'
import OtpInput from 'react-otp-input'
import 'src/assets/css/inputNumber.css'
import Button from 'src/components/Button'
import { CountdownTimer } from 'src/components/CountDownTimer/CountDownTimer'
import { OTP_LENGTH } from 'src/constants/common'
import { cn } from 'src/lib/tailwind/utils'
import DotIcon from 'src/assets/icons/i-dot.svg?react'
import useLocalStorage from 'src/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { path } from 'src/routes/path'
import { confirmRegistration } from 'src/apis/auth'
import { toast } from 'react-toastify'
import { resendOtp } from 'src/apis/auth/auth.query'
import { ERROR_MESSAGE } from 'src/constants/message'
import ResendOtpCodeButton from './components/ResendOtpCodeButton/ResendOtpCodeButton'
import { maskEmail } from 'src/utils/common'

export default function VerifyAccount() {
  const [expiredTimeForAccountVerification, setExpiredTimeForAccountVerification] = useLocalStorage<string>(
    'expired_time_for_account_verification',
    ''
  )
  const [email, setEmail] = useLocalStorage<string>('email', '')
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(0)
  const [otp, setOtp] = useState<string>('')
  const [isShowResendOtpButton, setIsShowResendOtpButton] = useState<boolean>(false)
  const [lastCalledTime, setLastCalledTime] = useLocalStorage<string>('lastCalledTime', '')
  const [lastCalledResendOtpTime, setLastCalledResendOtpTime] = useState<string>('')
  const timerRef = useRef<{ getTimeLeft: () => number }>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const now = moment()
    const expiredTime = expiredTimeForAccountVerification ? moment(expiredTimeForAccountVerification) : null

    if (!expiredTime || now.isAfter(expiredTime)) {
      setTimeLeftInSeconds(0)
      setTimeout(() => navigate(path.register), 0)
    } else {
      setTimeLeftInSeconds(Math.abs(expiredTime.diff(now, 'seconds')))
    }
  }, [expiredTimeForAccountVerification, navigate])

  const { mutate: mutateSubmitOtpCode, isPending: isSubmitOtpCodePending } = confirmRegistration({
    onSuccess: () => {
      setExpiredTimeForAccountVerification('')
      setEmail('')
      navigate(path.login)
    },
    onError: (error) => {
      toast.error(error.message)
      setEmail('')
    }
  })

  const handleSubmitOtpCode = () => {
    mutateSubmitOtpCode({
      email,
      otp: parseInt(otp, 10)
    })
  }

  const handleResendOtpCode = async () => {
    let savedLastCalledTime = lastCalledResendOtpTime
    setIsShowResendOtpButton(false)
    try {
      setLastCalledTime(moment().toISOString())
      await resendOtp(email)
      const now = moment()
      setLastCalledTime(now.toISOString())
      setLastCalledResendOtpTime(now.toISOString())
      setExpiredTimeForAccountVerification(moment().add(10, 'minutes').toISOString())
      const newExpiredTime = now.add(10, 'minutes').toISOString()
      setExpiredTimeForAccountVerification(newExpiredTime)
      setTimeLeftInSeconds(moment().diff(newExpiredTime, 'seconds'))
      setOtp('')
    } catch (error) {
      toast.error(ERROR_MESSAGE.RESEND_OTP)
      setLastCalledTime(savedLastCalledTime)
      setLastCalledResendOtpTime(savedLastCalledTime)
    }
  }

  useEffect(() => {
    setLastCalledResendOtpTime(lastCalledTime)
    const now = moment()
    const diffInSeconds = now.diff(moment(lastCalledTime), 'seconds')
    if (diffInSeconds >= 60) {
      setIsShowResendOtpButton(true)
    } else {
      setIsShowResendOtpButton(false)
    }
  }, [])

  return (
    <div className='flex w-full min-w-[400px] flex-col items-center'>
      <h1 className='mb-4 text-3xl font-semibold uppercase tracking-wide text-primary'>Xác thực tài khoản</h1>
      <p className='text-center text-base text-neutral-6'>
        Vui lòng kiểm tra email <span className='font-semibold text-primary'>{maskEmail(email)}</span> để lấy mã xác
        thực. Nếu không tìm thấy email, hãy kiểm tra trong thư rác.
      </p>
      <p className='text-base text-neutral-6'></p>
      <form className='mt-4'>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={OTP_LENGTH}
          inputType='number'
          renderInput={(props) => (
            <input
              {...props}
              className='mx-1 h-16 w-12 appearance-none border-b-2 border-neutral-4 text-center text-4xl font-bold text-neutral-6 focus:border-primary focus:outline-none'
            />
          )}
          containerStyle='flex justify-center gap-2'
        />
        <Button
          title='Xác thực'
          type='button'
          classButton={cn('w-full mt-6 border-none', {
            'bg-primary/90 hover:bg-primary hover:cursor-pointer': otp.length === OTP_LENGTH,
            'bg-neutral-4 hover:bg-neutral-5/50 hover:cursor-not-allowed': otp.length !== OTP_LENGTH
          })}
          classTitle='uppercase font-semibold text-neutral-0 test-base tracking-wide'
          classWrapperLoading={cn('', {
            block: isSubmitOtpCodePending
          })}
          disabled={otp.length !== OTP_LENGTH || isSubmitOtpCodePending}
          onClick={otp.length === OTP_LENGTH && !isSubmitOtpCodePending ? handleSubmitOtpCode : undefined}
        />
      </form>
      <div className='mt-4 flex items-center'>
        <CountdownTimer
          ref={timerRef}
          duration={timeLeftInSeconds}
          className='text-base font-medium tracking-wider text-neutral-6'
        />
        <DotIcon className='h-[20px] w-[20px]' />
        <ResendOtpCodeButton
          handleResendOtpCode={handleResendOtpCode}
          isShowResendOtpButton={isShowResendOtpButton}
          setIsShowResendOtpButton={setIsShowResendOtpButton}
          lastCalledResendOtpTime={lastCalledResendOtpTime}
          setLastCalledResendOtpTime={setLastCalledResendOtpTime}
        />
      </div>
    </div>
  )
}
