import { useRoutes } from 'react-router-dom'
import { path } from './path'
import AuthenLayout from 'src/layouts/AuthenLayout'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'
import ForgotPassword from 'src/pages/ForgotPassword'

export default function useRouteElements() {
  return useRoutes([
    {
      path: '',
      element: <AuthenLayout />,
      children: [
        {
          path: path.login,
          index: true,
          element: <Login />
        },
        {
          path: path.register,
          element: <Register />
        },
        {
          path: path.forgotPassword,
          index: true,
          element: <ForgotPassword />
        }
      ]
    }
  ])
}
