import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from './path'
import AuthenLayout from 'src/layouts/AuthenLayout'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'
import ForgotPassword from 'src/pages/ForgotPassword'
import { useAppContext } from 'src/contexts/app.context'
import MainLayout from 'src/layouts/MainLayout'
import HomePage from 'src/pages/HomePage'
import PageNotFound from 'src/pages/PageNotFound'
import NewsFeed from 'src/pages/NewsFeed'
import SearchPage from 'src/pages/SearchPage'
import Profile from 'src/pages/Profile'
import DetailEvent from 'src/pages/DetailEvent'
import VerifyAccount from 'src/pages/VerifyAccount'
import Notification from 'src/pages/Notification/Notification'

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAppContext()
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute: React.FC = () => {
  const { isAuthenticated } = useAppContext()
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  return useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          index: true,
          element: (
            <MainLayout>
              <HomePage />
            </MainLayout>
          )
        },
        {
          path: path.detailEvent.pattern,
          element: (
            <MainLayout>
              <DetailEvent />
            </MainLayout>
          )
        },
        {
          path: path.newsFeed,
          element: (
            <MainLayout>
              <NewsFeed />
            </MainLayout>
          )
        },
        {
          path: path.search,
          element: (
            <MainLayout>
              <SearchPage />
            </MainLayout>
          )
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.notification,
          element: (
            <MainLayout>
              <Notification />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <AuthenLayout>
              <Login />
            </AuthenLayout>
          )
        },
        {
          path: path.register,
          element: (
            <AuthenLayout>
              <Register />
            </AuthenLayout>
          )
        },
        {
          path: path.forgotPassword,
          element: (
            <AuthenLayout>
              <ForgotPassword />
            </AuthenLayout>
          )
        },
        {
          path: path.verifyAccount,
          element: (
            <AuthenLayout>
              <VerifyAccount />
            </AuthenLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <AuthenLayout>
          <PageNotFound />
        </AuthenLayout>
      )
    }
  ])
}
