import Popover from 'src/components/Popover'
import { usePopper } from 'react-popper'
import { ReactNode, useState } from 'react'
import FilterIcon from 'src/assets/icons/i-filter.svg?react'

interface Props {
  // eslint-disable-next-line no-unused-vars
  content: (onClosePopover: () => void) => ReactNode
}

export default function FilterPopover({ content }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
          padding: 8
        }
      }
    ]
  })

  const onClosePopover = () => {
    setIsPopoverOpen(false)
    setReferenceElement(null)
    setPopperElement(null)
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      content={
        <div
          ref={setPopperElement}
          style={{ ...styles.popper, zIndex: 9999 }}
          {...attributes.popper}
          className='rounded-md border border-neutral-3 bg-white p-4 shadow-lg'
        >
          {content(onClosePopover)}
        </div>
      }
    >
      <div
        ref={setReferenceElement}
        className='flex cursor-pointer items-center gap-2 rounded-md p-2 pr-0'
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <FilterIcon className='h-[20px] w-[20px]' />
      </div>
    </Popover>
  )
}
