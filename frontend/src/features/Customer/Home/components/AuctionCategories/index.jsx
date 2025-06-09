import React from 'react'
import { useRef } from 'react'
import { Box, Container, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useFilterCategories } from '~/hooks/categoryHook'
import AuctionCategoriesSkeleton from '../Skeletons/AuctionCategoriesSkeleton'

function AuctionCategories() {
  const categoriesScrollRef = useRef(null)
  const navigate = useNavigate()
  const { data, isLoading, isError } = useFilterCategories()

  // Show skeleton while loading
  if (isLoading) {
    return <AuctionCategoriesSkeleton />
  }

  // Show error state
  if (isError) {
    return (
      <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
            Có lỗi xảy ra khi tải danh mục. Vui lòng thử lại sau.
          </Typography>
        </Container>
      </Box>
    )
  }

  const { data: categoriesData } = data

  const scrollCategories = (direction) => {
    if (categoriesScrollRef.current) {
      const scrollAmount = 300
      categoriesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/search?categoryId=${categoryId}`)
  }

  // Map the JSON data to the format expected by the component
  const categories =
    categoriesData?.map((category) => ({
      id: category.categoryId,
      name: category.categoryName,
      image: category.image,
      count: category.types?.length || 0 // Default to 0 if count is not provided
    })) || []

  return (
    <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Danh mục đấu giá
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => scrollCategories('left')}
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => scrollCategories('right')}
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        {categories.length > 0 ? (
          <Box
            ref={categoriesScrollRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {categories.map((category) => (
              <Card
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                sx={{
                  minWidth: 180,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={category.image}
                  alt={category.name}
                  sx={{
                    objectFit: 'cover'
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} loại vật phẩm
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Không có danh mục nào.
          </Typography>
        )}
      </Container>
    </Box>
  )
}

export default AuctionCategories
