import Sidebar from 'src/components/Sidebar'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='relative h-[100vh] w-[100vw] bg-neutral-1'>
      <Sidebar />
      <div className='pr-sidebar ml-sidebar'>{children}</div>
    </div>
  )
}
