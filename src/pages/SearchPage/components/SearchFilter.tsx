import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import type { EventTimeFilter } from 'src/types/event.type'

interface Props {
  // eslint-disable-next-line no-unused-vars
  onSendFilterOptions: (data: EventTimeFilter) => void
  onClosePopover: () => void
  filterValue: EventTimeFilter
}

export default function SearchFilter({ onSendFilterOptions, onClosePopover, filterValue }: Props) {
  const { control, handleSubmit } = useForm<EventTimeFilter>({
    defaultValues: {
      timeCreatedFrom: filterValue.timeCreatedFrom,
      timeCreatedTo: filterValue.timeCreatedTo
    }
  })

  const onSubmitFilter = handleSubmit((data: EventTimeFilter) => {
    onSendFilterOptions(data)
    onClosePopover()
  })

  return (
    <form className='flex w-full flex-col gap-4'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <div className='text-sm font-medium tracking-wide text-neutral-8'>Thời gian đăng</div>
          <div className='flex items-center'>
            <div className='min-w-[50px] text-sm font-medium text-neutral-7'>Từ: </div>
            <Input
              type='datetime-local'
              showIsRequired={true}
              showError={false}
              classNameWrapper='text-sm w-full flex-1 mt-0'
              classNameInput='px-3 mt-0'
              name='timeCreatedFrom'
              control={control}
            />
          </div>
          <div className='flex items-center'>
            <div className='min-w-[50px] text-sm font-medium text-neutral-7'>Đến: </div>
            <Input
              type='datetime-local'
              showIsRequired={true}
              showError={false}
              classNameWrapper='text-sm w-full flex-1 mt-0'
              classNameInput='px-3 mt-0'
              name='timeCreatedTo'
              control={control}
            />
          </div>
        </div>
      </div>
      <div className='flex-end flex items-center gap-2'>
        <Button
          type='button'
          title='Quay lại'
          classButton='text-sm w-[150px] hover:bg-neutral-3 min-w-fit border-none'
          onClick={onClosePopover}
        />
        <Button
          title='Áp dụng bộ lọc'
          type='submit'
          onClick={onSubmitFilter}
          classButton='text-sm w-[150px] min-w-fit bg-semantic-secondary/80 hover:bg-semantic-secondary text-white border-none'
        />
      </div>
    </form>
  )
}
