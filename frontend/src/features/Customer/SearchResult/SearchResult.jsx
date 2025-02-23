import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Breadcrumbs,
  Link,
  Fade,
  Select,
  MenuItem,
  Pagination,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Stack
} from '@mui/material'
import {
  NavigateNext as NavigateNextIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material'
import { StyledCard, StyledCardMedia, AnimatedButton } from './style'
import { useFilterCategories } from '~/hooks/categoryHook'
import { useFilterSessions } from '~/hooks/sessionHook'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SearchResults() {
  const [filters, setFilters] = useState({
    all: true,
    upcoming: false,
    ongoing: false,
    auction_success: false
  })
  const [sortOrder, setSortOrder] = useState('new')
  const [expandedCategory, setExpandedCategory] = useState('')
  const [status, setStatus] = useState('')
  const [keyword, setKeyword] = useState('')
  const [typeId, setTypeId] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [priceFilter, setPriceFilter] = useState('all')

  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const searchKeyword = searchParams.get('keyword') || ''

  useEffect(() => {
    setKeyword(searchKeyword)
  }, [searchKeyword])

  const payload = useMemo(() => ({
    status,
    typeId,
    keyword,
    page,
    size: rowsPerPage,
    isInCrease: sortOrder === 'new' || sortOrder === 'price_high',
    minPrice: priceFilter === 'all' ? 0 : parseInt(priceFilter.split('-')[0]),
    maxPrice: priceFilter === 'all' ? Number.MAX_SAFE_INTEGER : parseInt(priceFilter.split('-')[1])
  }), [status, typeId, keyword, page, rowsPerPage, sortOrder, priceFilter])

  const { data: sessionData, isLoading: isLoadingSessions, isError: isErrorSessions } = useFilterSessions(payload)
  const { data: categoryData, isLoading: isLoadingCategories, isError: isErrorCategories } = useFilterCategories()

  if (isLoadingCategories || isLoadingSessions) {
    return <Typography>Loading...</Typography>
  }

  if (isErrorCategories || isErrorSessions) {
    return <Typography>Error loading data</Typography>
  }

  const categories = categoryData.data
  const sessions = sessionData.data.filter(session => session.status !== 'AUCTION_FAILED')
  const totalResults = sessionData.total

  const handleFilterChange = (event) => {
    const { name, checked } = event.target
    if (name === 'all') {
      setFilters({
        all: true,
        upcoming: false,
        ongoing: false,
        auction_success: false
      })
      setStatus('')
    } else {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [name]: checked }
        if (checked) {
          newFilters.all = false
          setStatus(name.toUpperCase())
        } else if (!newFilters.upcoming && !newFilters.ongoing && !newFilters.auction_success) {
          newFilters.all = true
          setStatus('')
        }
        return newFilters
      })
    }
  }

  const handleSortChange = (event) => {
    setSortOrder(event.target.value)
  }

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value)
  }

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? '' : category)
  }

  const handleTypeClick = (typeId, category) => {
    setTypeId(typeId)
    setExpandedCategory(category)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1)
  }

  const filteredSessions = sessions.filter((session) => {
    if (filters.all) return true
    if (filters.upcoming && session.status === 'UPCOMING') return true
    if (filters.ongoing && session.status === 'ONGOING') return true
    if (filters.auction_success && session.status === 'AUCTION_SUCCESS') return true
    return false
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '')
  }

  const handleCardClick = (session) => {
    if (session.status === 'UPCOMING') {
      navigate(`/session/register/${session.auctionSessionId}`)
    } else {
      navigate(`/session/${session.auctionSessionId}`)
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
    case 'UPCOMING':
      return 'Sắp diễn ra'
    case 'ONGOING':
      return 'Đang diễn ra'
    case 'AUCTION_SUCCESS':
      return 'Đấu giá thành công'
    default:
      return ''
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
    case 'UPCOMING':
      return 'info.main'
    case 'ONGOING':
      return 'warning.main'
    case 'AUCTION_SUCCESS':
      return 'success.main'
    default:
      return 'text.primary'
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          component="button"
          color="inherit"
          underline="hover"
          onClick={() => navigate('/')}
        >
          Trang chủ
        </Link>
        <Link
          component="button"
          color="inherit"
          underline="hover"
          onClick={() => navigate('/search')}
        >
          Kết quả tìm kiếm
        </Link>
        <Typography color="text.primary">{totalResults} kết quả</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h5" component="h1" sx={{
            mb: 3,
            borderBottom: '2px solid #c41e3a',
            pb: 1,
            width: 'fit-content'
          }}>
            Danh mục
          </Typography>

          <List>
            {categories.map((category) => (
              <React.Fragment key={category.categoryName}>
                <ListItem button onClick={() => handleCategoryClick(category.categoryName)}>
                  <ListItemText primary={category.categoryName} />
                  {expandedCategory === category.categoryName ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={expandedCategory === category.categoryName} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {category.types.map((subcategory) => (
                      <ListItem
                        button
                        key={subcategory.typeId}
                        sx={{
                          pl: 4,
                          borderLeft: typeId === subcategory.typeId ? '4px solid #b41712' : 'none'
                        }}
                        onClick={() => handleTypeClick(subcategory.typeId, category.categoryName)}
                        selected={typeId === subcategory.typeId}
                      >
                        <ListItemText primary={subcategory.typeName} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Trạng thái
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.all}
                  onChange={handleFilterChange}
                  name="all"
                  sx={{
                    '&.Mui-checked': {
                      color: '#b41712'
                    }
                  }}
                />
              }
              label="Tất cả"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.upcoming}
                  onChange={handleFilterChange}
                  name="upcoming"
                  sx={{
                    '&.Mui-checked': {
                      color: '#b41712'
                    }
                  }}
                />
              }
              label="Sắp diễn ra"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.ongoing}
                  onChange={handleFilterChange}
                  name="ongoing"
                  sx={{
                    '&.Mui-checked': {
                      color: '#b41712'
                    }
                  }}
                />
              }
              label="Đang diễn ra"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.auction_success}
                  onChange={handleFilterChange}
                  name="auction_success"
                  sx={{
                    '&.Mui-checked': {
                      color: '#b41712'
                    }
                  }}
                />
              }
              label="Đấu giá thành công"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} md={9}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ mb: 3 }}>
            <Select
              value={priceFilter}
              onChange={handlePriceFilterChange}
              displayEmpty
              variant="outlined"
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="all">Tất cả giá</MenuItem>
              <MenuItem value="0-5000000">Dưới 5 triệu</MenuItem>
              <MenuItem value="5000000-10000000">Dưới 10 triệu</MenuItem>
              <MenuItem value="10000000-20000000">Dưới 20 triệu</MenuItem>
              <MenuItem value="20000000-50000000">20 triệu - 50 triệu</MenuItem>
              <MenuItem value="50000000-100000000">50 triệu - 100 triệu</MenuItem>
              <MenuItem value="100000000-1000000000">Trên 100 triệu</MenuItem>
            </Select>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              displayEmpty
              variant="outlined"
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="new">Mới nhất</MenuItem>
              <MenuItem value="old">Cũ nhất</MenuItem>
              <MenuItem value="price_high">Giá: Thấp đến cao</MenuItem>
              <MenuItem value="price_low">Giá: Cao đến thấp</MenuItem>
            </Select>
          </Stack>

          {filteredSessions.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
              Không có phiên đấu giá nào
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredSessions.map((session, index) => (
                <Grid item xs={12} sm={6} md={4} key={session.auctionSessionId}>
                  <Fade in={true} timeout={500 + index * 100}>
                    <StyledCard
                      whileHover={{ y: -8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      onClick={() => handleCardClick(session)}
                    >
                      <StyledCardMedia
                        image={session.asset.mainImage}
                        title={session.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          component="h2"
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {session.name}
                        </Typography>
                        <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
                          Giá khởi điểm: {session.startingBids.toLocaleString('vi-VN')} ₫
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <AccessTimeIcon sx={{ fontSize: 'small', color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(session.startTime)} - {formatDate(session.endTime)}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color={getStatusColor(session.status)} sx={{ mt: 1 }}>
                          {getStatusLabel(session.status)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <AnimatedButton
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {session.status === 'UPCOMING' ? 'Đăng ký' : 'Xem chi tiết'}
                        </AnimatedButton>
                      </CardActions>
                    </StyledCard>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.max(1, Math.ceil(totalResults / rowsPerPage))}
              page={page + 1}
              onChange={handlePageChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}