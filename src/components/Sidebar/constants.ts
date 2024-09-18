import { path } from 'src/routes/path'
import HomeIcon from 'src/assets/icons/i-home.svg?react'
import HomeActiveIcon from 'src/assets/icons/i-home-active.svg?react'
import NewsIcon from 'src/assets/icons/i-news.svg?react'
import NewsActiveIcon from 'src/assets/icons/i-news-active.svg?react'
import SearchIcon from 'src/assets/icons/i-search.svg?react'
import SearchActiveIcon from 'src/assets/icons/i-search-active.svg?react'
import UserIcon from 'src/assets/icons/i-user.svg?react'
import UserActiveIcon from 'src/assets/icons/i-user-active.svg?react'

export const SIDEBAR_ROUTES = [
  {
    path: path.home,
    name: 'Trang chính',
    icon: HomeIcon,
    iconActive: HomeActiveIcon
  },
  {
    path: path.newsFeed,
    name: 'News Feed',
    icon: NewsIcon,
    iconActive: NewsActiveIcon
  },
  {
    path: path.search,
    name: 'Tìm kiếm',
    icon: SearchIcon,
    iconActive: SearchActiveIcon
  },
  {
    path: path.profile,
    name: 'Thông tin cá nhân',
    icon: UserIcon,
    iconActive: UserActiveIcon
  }
]
