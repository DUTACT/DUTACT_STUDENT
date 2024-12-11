import { useState, useRef, useEffect } from 'react'
import { TabProps } from '../Tab/Tab'
import { cn } from 'src/lib/tailwind/utils'

interface TabsProps {
  children: React.ReactElement<TabProps>[]
  defaultActiveIndex?: number
}

export default function Tabs({ children, defaultActiveIndex = 0 }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const tabsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const tabsContainer = tabsRef.current
    if (tabsContainer) {
      const activeTab = tabsContainer.children[activeIndex] as HTMLElement
      const offsetLeft = activeTab.offsetLeft
      const tabWidth = activeTab.offsetWidth
      const containerWidth = tabsContainer.offsetWidth

      const centerPosition = offsetLeft - (containerWidth - tabWidth) / 2

      tabsContainer.scrollTo({
        left: centerPosition,
        behavior: 'smooth'
      })
    }
  }, [activeIndex])

  return (
    <div>
      <div ref={tabsRef} className='scrollbar-none flex overflow-auto scroll-smooth border-b border-neutral-4'>
        {children.map((tab, index) => (
          <div
            key={index}
            className={cn(
              'min-w-fit cursor-pointer px-4 py-2 text-sm focus:outline-none',
              index === activeIndex
                ? 'border-b-2 border-semantic-secondary/80 font-medium text-semantic-secondary/80'
                : 'font-normal text-neutral-5 hover:text-neutral-6'
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
