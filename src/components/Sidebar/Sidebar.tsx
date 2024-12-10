import { NavLink } from 'react-router-dom'
import { SIDEBAR_ROUTES } from './constants'
import { cn } from 'src/lib/tailwind/utils'
import PinIcon from 'src/assets/icons/i-pin.svg?react'
import PinActiveIcon from 'src/assets/icons/i-pin-active.svg?react'
import LogOutIcon from 'src/assets/icons/i-log-out.svg?react'
import LogOutActiveIcon from 'src/assets/icons/i-log-out-active.svg?react'
import { useAppContext } from 'src/contexts/app.context'
import { setupToken } from 'src/config/queryClient'
import DutactLogo from 'src/assets/img/dutact-logo.png'
import { disconnectWebSocket } from 'src/services/websocket'

export default function Sidebar() {
  const { setIsAuthenticated } = useAppContext()

  const handleLogOut = () => {
    disconnectWebSocket()
    localStorage.removeItem('access_token')
    localStorage.removeItem('subscription-token')
    localStorage.removeItem('device-id')
    setIsAuthenticated(false)
    setupToken('')
  }

  return (
    <div className='fixed bottom-0 left-0 top-0 flex h-full w-sidebar flex-col items-center bg-neutral-1'>
      <div className='py-2'>
        <img src={DutactLogo} alt='dutact-logo' className='h-logo w-logo' />
      </div>
      <div className='flex flex-1 flex-col items-center justify-center gap-4'>
        {SIDEBAR_ROUTES.map(({ path, icon: Icon, iconActive: IconActive }) => (
          <NavLink
            key={path}
            to={path}
            className={cn('flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 hover:bg-neutral-3')}
          >
            {({ isActive }) =>
              isActive ? <IconActive className='h-[28px] w-[28px]' /> : <Icon className='h-[28px] w-[28px]' />
            }
          </NavLink>
        ))}
      </div>
      <div className='flex flex-col gap-4 py-[22px]'>
        <div className='group flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 hover:bg-neutral-3'>
          <PinIcon className='block h-[28px] w-[28px] group-hover:hidden' />
          <PinActiveIcon className='hidden h-[28px] w-[28px] group-hover:block' />
        </div>
        <div
          className='group flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 hover:bg-neutral-3'
          onClick={handleLogOut}
        >
          <LogOutIcon className='block h-[28px] w-[28px] group-hover:hidden' />
          <LogOutActiveIcon className='hidden h-[28px] w-[28px] group-hover:block' />
        </div>
      </div>
    </div>
  )
}
