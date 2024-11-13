import { useState } from 'react'
import { TabProps } from '../Tab/Tab'
import { cn } from 'src/lib/tailwind/utils'

interface TabsProps {
  children: React.ReactElement<TabProps>[]
}

export default function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <div className='flex border-b border-neutral-4'>
        {children.map((tab, index) => (
          <div
            key={index}
            className={cn(
              'cursor-pointer px-4 py-2 font-medium focus:outline-none',
              index === activeIndex
                ? 'border-b-2 border-semantic-secondary/80 text-semantic-secondary/80'
                : 'text-neutral-5 hover:text-neutral-6'
            )}
            onClick={() => setActiveIndex(index)}
          >
            {tab.props.label}
          </div>
        ))}
      </div>
      <div className='py-4'>{children[activeIndex]}</div>
    </div>
  )
}
