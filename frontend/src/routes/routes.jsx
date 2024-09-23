import ProductListPage from '../pages/Product/ProductListPage'
import HomePage from '../pages/Home/HomePage'
import Authentication from '../pages/Authentication/Authentication'
import User from '../pages/Customer/User'
import ConfirmAccount from '../features/authentication/comfirm'

export const routes = [
  {
    path: '/product/list',
    page: ProductListPage
  },
  {
    path: '/',
    page: HomePage
  },
  {
    path: '/authentication',
    page: Authentication
  },
  {
    path: '/confirm-account',
    page: ConfirmAccount
  },
  {
    path: '/users',
    page: User
  }
]