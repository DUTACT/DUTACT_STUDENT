import { SnackbarKey, useSnackbar } from 'notistack'
import { forwardRef } from 'react'
import CloseIcon from 'src/assets/icons/i-close.svg?react'

interface CustomSnackbarProps {
  message: React.ReactNode
  snackbarKey: SnackbarKey
}

export const CustomSnackbar = forwardRef<HTMLDivElement, CustomSnackbarProps>((props, ref) => {
  const { message, snackbarKey } = props
  const { closeSnackbar } = useSnackbar()

  return (
    <div
      ref={ref}
      className='flex max-w-[400px] items-start rounded-2xl border border-neutral-3 bg-neutral-1 p-4 shadow-custom'
    >
      <div className='flex-1 hover:cursor-pointer' onClick={() => closeSnackbar(snackbarKey)}>
        {message}
      </div>
      <CloseIcon
        className='h-[20px] w-[20px] opacity-50 hover:cursor-pointer hover:opacity-100'
        onClick={() => closeSnackbar(snackbarKey)}
      />
    </div>
  )
})
