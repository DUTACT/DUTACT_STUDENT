import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

interface CountdownTimerProps {
  duration: number
  onComplete?: () => void
  className?: string
}

export const CountdownTimer = forwardRef(
  ({ duration, onComplete, className = 'text-center text-2xl font-bold' }: CountdownTimerProps, ref) => {
    const [timeLeft, setTimeLeft] = useState<number>(duration)

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            onComplete?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }, [onComplete])

    useEffect(() => {
      setTimeLeft(duration)
    }, [duration])

    useImperativeHandle(ref, () => ({
      getTimeLeft: () => timeLeft
    }))

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60)
      const seconds = time % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return <div className={className}>{formatTime(timeLeft)}</div>
  }
)
