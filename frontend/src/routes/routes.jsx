import AssetListPage from '~/pages/Asset/AssetListPage'
import CategoryListPage from '~/pages/Category/CategoryListPage'
import HomePage from '~/pages/Home/HomePage'
import Authentication from '~/pages/Authentication/Authentication'
import User from '~/pages/Customer/User'
import ConfirmAccount from '~/features/Authentication/comfirm'
import AddAssetPage from '~/pages/Asset/AddAssetPage'
import TypeListPage from '~/pages/Type/TypeListPage'

const BASE_PATHS = {
  HOME: '/',
  CATEGORY: '/category',
  ASSET: '/asset',
  AUTHENTICATION: '/authentication',
  CONFIRM_ACCOUNT: '/confirm-account',
  USERS: '/users'
}

export const routes = [
  {
    path: `${BASE_PATHS.CATEGORY}`,
    page: CategoryListPage
  },
  {
    path: `${BASE_PATHS.CATEGORY}/type`,
    page: TypeListPage
  },
  {
    path: `${BASE_PATHS.ASSET}`,
    page: AssetListPage
  },
  {
    path: `${BASE_PATHS.ASSET}/create`,
    page: AddAssetPage
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