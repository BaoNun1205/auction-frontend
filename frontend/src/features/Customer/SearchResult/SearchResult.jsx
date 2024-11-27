import React, { useState } from 'react';
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
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { StyledCard, StyledCardMedia, StatusChip, AnimatedButton } from './style';
import { useFilterCategories } from '~/hooks/categoryHook';
import { useFilterSessions } from '~/hooks/sessionHook';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SearchResults() {
  const [filters, setFilters] = useState({
    all: true,
    upcoming: false,
    ongoing: false,
    notAuctioned: false,
  });
  const [sortOrder, setSortOrder] = useState('new');
  const [expandedCategory, setExpandedCategory] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';

  const { data: sessionData, isLoading: isLoadingSessions, isError: isErrorSessions } = useFilterSessions({ keyword });
  const { data: categoryData, isLoading: isLoadingCategories, isError: isErrorCategories } = useFilterCategories();

  if (isLoadingCategories || isLoadingSessions) {
    return <Typography>Loading...</Typography>;
  }

  if (isErrorCategories || isErrorSessions) {
    return <Typography>Error loading data</Typography>;
  }

  const categories = categoryData.data;
  const sessions = sessionData.data;
  const totalResults = sessionData.total;

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'all') {
      setFilters({
        all: true,
        upcoming: false,
        ongoing: false,
        notAuctioned: false,
      });
    } else {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [name]: checked };
        if (checked) {
          newFilters.all = false;
        } else if (!newFilters.upcoming && !newFilters.ongoing && !newFilters.notAuctioned) {
          newFilters.all = true;
        }
        return newFilters;
      });
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? '' : category);
  };

  const filteredSessions = sessions.filter((session) => {
    if (filters.all) return true;
    if (filters.upcoming && session.status === 'UPCOMING') return true;
    if (filters.ongoing && session.status === 'ONGOING') return true;
    if (filters.notAuctioned && session.status === 'NOT_AUCTIONED') return true;
    return false;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(',', '');
  };

  const handleCardClick = (session) => {
    if (session.status === 'UPCOMING') {
      navigate(`/session/register/${session.auctionSessionId}`);
    } else {
      navigate(`/session/${session.auctionSessionId}`);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link href="/" color="inherit" underline="hover">Home</Link>
        <Link href="/search" color="inherit" underline="hover">Search results</Link>
        <Typography color="text.primary">{totalResults} results</Typography>
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
                      <ListItem button key={subcategory.typeId} sx={{ pl: 4 }}>
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
                />
              }
              label="Đang diễn ra"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.notAuctioned}
                  onChange={handleFilterChange}
                  name="notAuctioned"
                />
              }
              label="Chưa được đấu giá"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              displayEmpty
              variant="outlined"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="new">Newest</MenuItem>
              <MenuItem value="old">Oldest</MenuItem>
              <MenuItem value="price_high">Price: High to Low</MenuItem>
              <MenuItem value="price_low">Price: Low to High</MenuItem>
            </Select>
          </Box>

          <Grid container spacing={3}>
            {filteredSessions.map((session, index) => (
              <Grid item xs={12} sm={6} md={4} key={session.auctionSessionId}>
                <Fade in={true} timeout={500 + index * 100}>
                  <StyledCard
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => handleCardClick(session)}
                  >
                    <StatusChip 
                      label={session.status === 'UPCOMING' ? 'Sắp diễn ra' : 'Đang diễn ra'}
                      status={session.status}
                    />
                    <StyledCardMedia
                      image={session.asset.mainImage}
                      title={session.asset.assetName}
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
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {session.asset.assetName}
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={10} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

