import React from 'react'
import { AppBar, Toolbar, Container, Box, Skeleton, styled } from '@mui/material'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0'
}))

const ButtonSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 0,
  height: 48,
  margin: theme.spacing(0, 0.5),
  minWidth: 80
}))

const CategoryBarSkeleton = ({ itemCount = 6 }) => {
  // Generate random widths for more natural look
  const generateRandomWidth = () => {
    const widths = [80, 100, 120, 140, 90, 110, 130]
    return widths[Math.floor(Math.random() * widths.length)]
  }

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            sx={{
              overflowX: 'auto',
              flexWrap: 'nowrap',
              gap: 1
            }}
          >
            {Array.from({ length: itemCount }).map((_, index) => (
              <Box key={index} sx={{ minWidth: 'max-content' }}>
                <ButtonSkeleton
                  variant="rectangular"
                  width={generateRandomWidth()}
                  animation="wave"
                  sx={{
                    borderBottom: '3px solid transparent',
                    '&:hover': {
                      borderBottom: '3px solid rgba(180, 23, 18, 0.1)'
                    },
                    transition: 'all 0.3s'
                  }}
                />
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}

export default CategoryBarSkeleton
