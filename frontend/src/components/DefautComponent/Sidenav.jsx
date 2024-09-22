import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useAppStore } from '../../store/appStore'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import EventIcon from '@mui/icons-material/Event'
import MenuItem from './SidenavComponent/MenuItem'
import Item from './SidenavComponent/Item'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  borderRight: '0.5px solid #ffffff'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  },
  borderRight: '0.5px solid #ffffff'
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
  icon: <HomeIcon />,
  name: 'Home',
  path: '/'
}

const productItem = {
  icon: <ShoppingBasketIcon />,
  name: 'Product',
  subItems: [
    { name: 'List', path: '/product/list' },
    { name: 'Details', path: '/product/details' },
    { name: 'Create', path: '/product/create' },
    { name: 'Edit', path: '/product/edit' }
  ]
}

const sessionItem = {
  icon: <EventIcon />,
  name: 'Session',
  subItems: [
    { name: 'List', path: '/session/list' },
    { name: 'Details', path: '/product/details' },
    { name: 'Create', path: '/product/create' },
    { name: 'Edit', path: '/product/edit' }
  ]
}

const Sidenav = ({ children }) => {
  const theme = useTheme()
  const open = useAppStore((state) => state.dopen) // open side nav
  const productOpen = useAppStore((state) => state.productOpen) // open product menu
  const setProductOpen = useAppStore((state) => state.setProductOpen) // set product menu
  const sessionOpen = useAppStore((state) => state.sessionOpen) // open session menu
  const setSessionOpen = useAppStore((state) => state.setSessionOpen) // set session

  const handleProductClick = () => {
    setProductOpen(!productOpen)
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
        <Box sx={{ bgcolor: 'primary.main', height: '100vh' }}>
          <List sx={{ bgcolor: 'primary.main' }}>
            <Item item={HomeItem} open={open} />
            <MenuItem
              open={open}
              itemOpen={productOpen}
              item={productItem}
              handleClick={handleProductClick} />
            <MenuItem
              open={open}
              itemOpen={sessionOpen}
              item={sessionItem}
              handleClick={handleSessionClick} />
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