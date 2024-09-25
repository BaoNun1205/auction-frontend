import ProductListPage from '~/pages/Product/ProductListPage'
import HomePage from '~/pages/Home/HomePage'
import Authentication from '~/pages/Authentication/Authentication'
import User from '~/pages/Customer/User'
import ConfirmAccount from '~/features/authentication/comfirm'

const BASE_PATHS = {
  PRODUCT: '/product',
  HOME: '/',
  AUTHENTICATION: '/authentication',
  CONFIRM_ACCOUNT: '/confirm-account',
  USERS: '/users'
}

export const routes = [
  {
    path: `${BASE_PATHS.PRODUCT}/list`,
    page: ProductListPage
  },
  {
    path: BASE_PATHS.HOME,
    page: HomePage
  },
  {
    path: BASE_PATHS.AUTHENTICATION,
    page: Authentication
  },
  {
    path: BASE_PATHS.CONFIRM_ACCOUNT,
    page: ConfirmAccount
  },
  {
    path: BASE_PATHS.USERS,
    page: User
  }
]