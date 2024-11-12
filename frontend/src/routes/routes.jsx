import AssetListPage from '~/pages/Asset/AssetListPage'
import CategoryListPage from '~/pages/Category/CategoryListPage'
import HomePage from '~/pages/Home/HomePage'
import User from '~/pages/Customer/User'
import ConfirmAccount from '~/pages/Authentication/comfirm'
import AddAssetPage from '~/pages/Asset/AddAssetPage'
import TypeListPage from '~/pages/Type/TypeListPage'
import RequirementListPage from '~/pages/Requirement/RequirementListPage'
import AddRequirementPage from '~/pages/Requirement/AddRequirementPage'
import Login from '~/pages/Authentication/Login'
import Register from '~/pages/Authentication/Register'
import AddSessionPage from '~/pages/Session/AddSessionPage'
import SessionListPage from '~/pages/Session/SessionListPage'

export const BASE_PATHS = {
  HOME: '/',
  CATEGORY: '/category',
  ASSET: '/asset',
  REQUIREMENT: '/requirement',
  CONFIRM_ACCOUNT: '/confirm-account',
  USERS: '/users',
  SESSION: '/session'
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
    path: `${BASE_PATHS.ASSET}/create/:id`,
    page: AddAssetPage
  },
  {
    path: `${BASE_PATHS.REQUIREMENT}`,
    page: RequirementListPage
  },
  {
    path: `${BASE_PATHS.REQUIREMENT}/create`,
    page: AddRequirementPage
  },
  {
    path: `${BASE_PATHS.SESSION}`,
    page: SessionListPage
  },
  {
    path: `${BASE_PATHS.SESSION}/create/:id`,
    page: AddSessionPage
  },
  {
    path: BASE_PATHS.HOME,
    page: HomePage
  },
  {
    path: BASE_PATHS.CONFIRM_ACCOUNT,
    page: ConfirmAccount
  },
  {
    path: BASE_PATHS.USERS,
    page: User
  },
  {
    path: '/login',
    page: Login
  },
  {
    path: '/register',
    page: Register
  }
]