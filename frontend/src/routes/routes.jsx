import AssetListPage from '~/pages/Asset/AssetListPage'
import CategoryListPage from '~/pages/Category/CategoryListPage'
import HomePage from '~/pages/Home/HomePage'
import TypeListPage from '~/pages/Type/TypeListPage'
import RequirementListPage from '~/pages/Requirement/RequirementListPage'
import AddRequirementPage from '~/pages/Requirement/AddRequirementPage'
import AddSessionPage from '~/pages/Session/AddSessionPage'
import TimedAuctionDetailPage from '~/pages/Customer/TimedAuctionDetailPage'
import SessionListPage from '~/pages/Session/SessionListPage'
import RegisterAuctionDetailPage from '~/pages/Customer/RegisterAuctionDetailPage'
import LoginPage from '~/pages/Authentication/LoginPage'
import SearchResultPage from '~/pages/Customer/SearchResultPage'
import ProfilePage from '~/pages/Customer/ProfilePage'
import VendorPage from '~/pages/Vendor/VendorPage'
import AddAssetPage from '~/pages/Asset/AddAssetPage'
import SellerPage from '~/pages/Customer/SellerPage'
import VNPayCallback from '~/features/Customer/Profile/MyWallet/VNPayCallback'
import IntroductionPage from '~/pages/Customer/IntroductionPage'
import NewsPage from '~/pages/Customer/NewsPage'
import ContactPage from '~/pages/Customer/ContactPage'
import CheckoutPage from '~/pages/Customer/CheckoutPage'
import PaymentSuccessPage from '~/pages/Customer/PaymentSuccessPage'
import PaymentHistoryPage from '~/pages/Customer/PaymentHistoryPage '
import InvoicePage from '~/pages/Customer/InvoicePage'
import CustomerHomePage from '~/pages/Customer/Home'
import UpcomingRedirect from '~/pages/Customer/Home/component/UpcomingRedirect'
import OngoingRedirect from '~/pages/Customer/Home/component/OngoingRedirect'
import ConfirmAccount from '~/pages/Authentication/comfirm'

export const BASE_PATHS = {
  HOME: '/',
  UPCOMING: '/upcoming',
  ONGOING: '/ongoing',
  CATEGORY: '/category',
  ASSET: '/asset',
  REQUIREMENT: '/requirement',
  CONFIRM_ACCOUNT: '/confirm-account',
  USERS: '/users',
  CUSTOMER: 'customer',
  SESSION: '/session',
  VENDOR: '/vendor',
  SELLER: '/store',
  INTRODUCTION: '/introduction',
  NEWS: '/news',
  CONTACT: '/contact',
  CHECKOUT: '/checkout',
  PAYMENT_SUCCESS: '/payment-success',
  PAYMENT_HISTORY: '/payment-history',
  INVOICE: '/invoice'
}

export const publicRoutes = [
  {
    path: '/login',
    page: LoginPage
  },
  {
    path: BASE_PATHS.CONFIRM_ACCOUNT,
    page: ConfirmAccount
  },
  {
    path: BASE_PATHS.HOME,
    page: CustomerHomePage
  },
  {
    path: BASE_PATHS.UPCOMING,
    page: UpcomingRedirect
  },
  {
    path: BASE_PATHS.ONGOING,
    page: OngoingRedirect
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
    path: '/search',
    page: SearchResultPage
  },
  {
    path: `${BASE_PATHS.VENDOR}`,
    page: VendorPage
  },
  {
    path: `${BASE_PATHS.SELLER}/:id`,
    page: SellerPage
  },
  {
    path: '/payment/vn-pay-callback',
    page: VNPayCallback
  },
  {
    path: `${BASE_PATHS.INTRODUCTION}`,
    page: IntroductionPage
  },
  {
    path: `${BASE_PATHS.NEWS}`,
    page: NewsPage
  },
  {
    path: `${BASE_PATHS.CONTACT}`,
    page: ContactPage
  }
]

export const privateRoutes = [
  {
    path: '/profile',
    page: ProfilePage
  },
  {
    path: `${BASE_PATHS.CHECKOUT}/:id`,
    page: CheckoutPage
  },
  {
    path: `${BASE_PATHS.PAYMENT_SUCCESS}/:id`,
    page: PaymentSuccessPage
  },
  {
    path: `${BASE_PATHS.PAYMENT_HISTORY}`,
    page: PaymentHistoryPage
  },
  {
    path: `${BASE_PATHS.INVOICE}/:id`,
    page: InvoicePage
  }
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
    path: `${BASE_PATHS.ASSET}/create/:id`,
    page: AddAssetPage
  },
]