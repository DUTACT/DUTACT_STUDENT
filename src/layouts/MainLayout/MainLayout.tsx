import Sidebar from 'src/components/Sidebar'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='relative h-[100vh] w-[100vw] overflow-auto bg-neutral-1'>
      <Sidebar />
      <div className='ml-sidebar flex min-h-[100vh] justify-center overflow-auto bg-neutral-1 pr-sidebar'>
        {children}
      </div>
    </div>
  )
}
