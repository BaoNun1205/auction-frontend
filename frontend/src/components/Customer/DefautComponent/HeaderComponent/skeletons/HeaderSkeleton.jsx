import React from 'react'
import { Toolbar, Box, useMediaQuery, useTheme, IconButton, Skeleton } from '@mui/material'
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material'
import { StyledAppBar, Search, SearchIconWrapper, StyledInputBase, LogoContainer } from '../style'

const HeaderSkeleton = ({ isAuth = false }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {/* Logo Skeleton */}
          <LogoContainer
            elevation={3}
            sx={{
              width: { xs: 50, md: 60, lg: 80 },
              height: { xs: 50, md: 60, lg: 80 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Skeleton variant="circular" width="80%" height="80%" />
          </LogoContainer>

          {/* Navigation Links Skeleton - Desktop Only */}
          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 4, gap: 2 }}>
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} variant="text" width={80} height={24} sx={{ borderRadius: 1 }} />
              ))}
            </Box>
          )}
        </Box>

        {/* Search Bar Skeleton */}
        {!isMobile && (
          <Box sx={{ display: 'flex', flexGrow: 0, ml: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                disabled
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
              />
            </Search>
          </Box>
        )}

        {/* Right Side Actions Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Mobile Search Icon */}
          {isMobile && (
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          )}

          {/* Chat Button Skeleton - Only when authenticated */}
          {isAuth && (
            <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
          )}

          {/* Notification Button Skeleton - Only when authenticated */}
          {isAuth && (
            <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
          )}

          {/* Profile Avatar Skeleton - Always shown (login button or user avatar) */}
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              ml: 1
            }}
          />
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default HeaderSkeleton
