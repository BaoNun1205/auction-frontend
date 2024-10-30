import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useAppStore } from '~/store/appStore'
import { Home, FolderTree, ShoppingBag, Calendar, FileText } from 'lucide-react'
import MenuItemExpand from './MenuItemExpandComponent/MenuItemExpand'
import ItemExpand from './ItemExpandComponent/ItemExpand'
import MenuItem from './MenuItemComponent/MenuItem'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(12)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  bgcolor: 'primary.main',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme)
        }
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme)
        }
      }
    ]
  })
)

const HomeItem = {
  icon: <Home />,
  name: 'Home',
  path: '/'
}

const CategoryItem = {
  icon: <FolderTree />,
  name: 'Category',
  subItems: [
    { name: 'Category', path: '/category' },
    { name: 'Type', path: '/category/type' }
  ]
}

const AssetItem = {
  icon: <ShoppingBag />,
  name: 'Asset',
  subItems: [
    { name: 'List', path: '/asset' },
    { name: 'Create', path: '/asset/create' },
  ]
}

const RequirementItem = {
  icon: <FileText />,
  name: 'Requirement',
  subItems: [
    { name: 'List', path: '/requirement' },
    { name: 'Create', path: '/requirement/create' },
  ]
}

const SessionItem = {
  icon: <Calendar />,
  name: 'Session',
  subItems: [
    { name: 'List', path: '/session/list' },
    { name: 'Create', path: '/asset/create' },
  ]
}

const Sidenav = ({ children }) => {
  const theme = useTheme()
  const open = useAppStore((state) => state.dopen) // open side nav
  const categoryOpen = useAppStore((state) => state.categoryOpen) // open category menu
  const setCategoryOpen = useAppStore((state) => state.setCategoryOpen) // set category menu
  const assetOpen = useAppStore((state) => state.assetOpen) // open asset menu
  const setAssetOpen = useAppStore((state) => state.setAssetOpen) // set asset menu
  const requirementOpen = useAppStore((state) => state.requirementOpen) // open requirement menu
  const setRequirementOpen = useAppStore((state) => state.setRequirementOpen) // set requirement menu
  const sessionOpen = useAppStore((state) => state.sessionOpen) // open session menu
  const setSessionOpen = useAppStore((state) => state.setSessionOpen) // set session

  const handleCategoryClick = () => {
    setCategoryOpen(!categoryOpen)
  }

  const handleAssetClick = () => {
    setAssetOpen(!assetOpen)
  }

  const handleRequirementClick = () => {
    setRequirementOpen(!requirementOpen)
  }

  const handleSessionClick = () => {
    setSessionOpen(!sessionOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Box sx={(theme) => ({ bgcolor: theme.palette.primary.main, height: '100vh' })}>
          <List sx={(theme) => ({ bgcolor: theme.palette.primary.main })}>
            {open ? (
              <>
                <ItemExpand item={HomeItem} open={open} />
                {/* <ItemExpand item={CategoryItem} open={open} /> */}
                <MenuItemExpand
                  open={open}
                  itemOpen={categoryOpen}
                  item={CategoryItem}
                  handleClick={handleCategoryClick}
                />
                <MenuItemExpand
                  open={open}
                  itemOpen={assetOpen}
                  item={AssetItem}
                  handleClick={handleAssetClick}
                />
                <MenuItemExpand
                  open={open}
                  itemOpen={requirementOpen}
                  item={RequirementItem}
                  handleClick={handleRequirementClick}
                />
                <MenuItemExpand
                  open={open}
                  itemOpen={sessionOpen}
                  item={SessionItem}
                  handleClick={handleSessionClick}
                />
              </>
            ) : (
              <>
                <MenuItem item={HomeItem} />
                <MenuItem item={CategoryItem} />
                <MenuItem item={AssetItem} />
                <MenuItem item={RequirementItem} />
                <MenuItem item={SessionItem} />
              </>
            )}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ bgcolor: 'primary.main' }}>
        {children}
      </Box>
    </Box>
  )
}

export default Sidenav