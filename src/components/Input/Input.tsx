import { InputHTMLAttributes } from 'react'
import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { cn } from 'src/lib/utils'

interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameLabel?: string
  classNameInput?: string
  classNameError?: string
  classNameRequired?: string
  labelName?: string
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<TFieldValues>
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
  name: FieldPath<TFieldValues>
  showIsRequired?: boolean
}

export default function Input<TFieldValues extends FieldValues = FieldValues>({
  className = '',
  classNameLabel = '',
  classNameInput = '',
  classNameError = '',
  classNameRequired = '',
  name,
  register,
  rules,
  labelName,
  errorMessage,
  showIsRequired = false,
  ...rest
}: Props<TFieldValues>) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className='mt-2'>
      <div className={cn('text-sm font-semibold tracking-wide text-neutral-8', classNameLabel)}>
        {labelName}
        <span
          className={cn('ml-1 text-semantic-cancelled', classNameRequired, {
            hidden: !showIsRequired
          })}
        >
          *
        </span>
      </div>
      <input
        className={cn(
          'mt-1 w-full rounded-md border-[1px] border-neutral-3 bg-neutral-1 px-4 py-2 focus:outline-primary',
          classNameInput
        )}
        {...registerResult}
        {...rest}
      />
      <div className={cn('mt-1 min-h-[18px] text-xs font-semibold text-semantic-cancelled', classNameError)}>
        {errorMessage}
      </div>
    </div>
  )
}
