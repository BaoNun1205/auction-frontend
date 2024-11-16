import AssetListPage from '~/pages/Asset/AssetListPage'
import CategoryListPage from '~/pages/Category/CategoryListPage'
import HomePage from '~/pages/Home/HomePage'
import ConfirmAccount from '~/pages/Authentication/comfirm'
import AddAssetPage from '~/pages/Asset/AddAssetPage'
import TypeListPage from '~/pages/Type/TypeListPage'
import RequirementListPage from '~/pages/Requirement/RequirementListPage'
import AddRequirementPage from '~/pages/Requirement/AddRequirementPage'
import Register from '~/pages/Authentication/Register'
import CustomerHomePage from '~/pages/Customer/Home'
import AddSessionPage from '~/pages/Session/AddSessionPage'
import TimedAuctionDetailPage from '~/pages/Customer/TimedAuctionDetailPage'
import SessionListPage from '~/pages/Session/SessionListPage'
import CustomerProfilePage from '~/pages/Customer/PersonalInformationPage'
import RegisterAuctionDetailPage from '~/pages/Customer/RegisterAuctionDetailPage'
import LoginPage from '~/pages/Authentication/LoginPage'

export const BASE_PATHS = {
  HOME: '/',
  CATEGORY: '/category',
  ASSET: '/asset',
  REQUIREMENT: '/requirement',
  CONFIRM_ACCOUNT: '/confirm-account',
  USERS: '/users',
  CUSTOMER: 'customer',
  SESSION: '/session'
}

export const publicRoutes = [
  {
    path: '/login',
    page: LoginPage
  },
  {
    path: '/register',
    page: Register
  },
  {
    path: BASE_PATHS.CONFIRM_ACCOUNT,
    page: ConfirmAccount
  },
  {
    path: `${BASE_PATHS.SESSION}/create/:id`,
    page: AddSessionPage
  },
  {
    path: BASE_PATHS.HOME,
    page: CustomerHomePage
  },
  {
    path: `${BASE_PATHS.SESSION}/:id`,
    page: TimedAuctionDetailPage
  },
  {
    path: `${BASE_PATHS.SESSION}/register/:id`,
    page: RegisterAuctionDetailPage
  },
  {
    path: '/profile',
    page: CustomerProfilePage
  },
]

export const adminRoutes = [
  {
    path: BASE_PATHS.HOME,
    page: HomePage
  },
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
]

export const customerRoutes = [
  {
    path: `${BASE_PATHS.SESSION}/create/:id`,
    page: AddSessionPage
  },
  {
    path: BASE_PATHS.HOME,
    page: CustomerHomePage
  },
  {
    path: `${BASE_PATHS.SESSION}/:id`,
    page: TimedAuctionDetailPage
  }
]