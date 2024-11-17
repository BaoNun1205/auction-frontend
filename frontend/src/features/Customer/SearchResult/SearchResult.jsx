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
  Paper,
  Fade,
  Select,
  MenuItem,
  Pagination,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  NavigateNext as NavigateNextIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { StyledCard, StyledCardMedia, StatusChip, AnimatedButton } from './style';

const categories = [
  {
    name: 'Paintings',
    subcategories: ['Oil', 'Acrylic', 'Watercolor', 'Mixed Media'],
  },
  {
    name: 'Sculptures',
    subcategories: ['Bronze', 'Marble', 'Wood', 'Clay'],
  },
  {
    name: 'Photography',
    subcategories: ['Black & White', 'Color', 'Digital', 'Analog'],
  },
];

export default function SearchResults() {
  const [filters, setFilters] = useState({
    all: true,
    upcoming: false,
    ongoing: false,
    ended: false,
  });
  const [sortOrder, setSortOrder] = useState('new');
  const [expandedCategory, setExpandedCategory] = useState('');

  const artworks = Array(9).fill({
    image: '/placeholder.svg?height=280&width=200',
    title: 'Oil on Canvas Portrait of a Lady Signed (Picasso) Not Painted',
    price: '$450',
    status: Math.random() > 0.5 ? '2 Days Left' : 'Not auctioned',
  });

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? '' : category);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link href="/" color="inherit" underline="hover">Home</Link>
        <Link href="/search" color="inherit" underline="hover">Search results</Link>
        <Typography color="text.primary">165 results</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h5" component="h1" sx={{ 
            mb: 3,
            borderBottom: '2px solid #c41e3a',
            pb: 1,
            width: 'fit-content'
          }}>
            Categories
          </Typography>

          <List>
            {categories.map((category) => (
              <React.Fragment key={category.name}>
                <ListItem button onClick={() => handleCategoryClick(category.name)}>
                  <ListItemText primary={category.name} />
                  {expandedCategory === category.name ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={expandedCategory === category.name} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {category.subcategories.map((subcategory) => (
                      <ListItem button key={subcategory} sx={{ pl: 4 }}>
                        <ListItemText primary={subcategory} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Product status
          </Typography>
          <FormGroup>
            {Object.entries(filters).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox 
                    checked={value}
                    onChange={handleFilterChange}
                    name={key}
                  />
                }
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
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
            {artworks.map((artwork, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in={true} timeout={500 + index * 100}>
                  <StyledCard
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <StatusChip 
                      label={artwork.status}
                      status={artwork.status}
                    />
                    <StyledCardMedia
                      component="img"
                      image={artwork.image}
                      title={artwork.title}
                    />
                    <CardContent>
                      <Typography 
                        gutterBottom 
                        variant="body2" 
                        component="div"
                        sx={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          height: '3em',
                          mb: 1
                        }}
                      >
                        {artwork.title}
                      </Typography>
                      <Typography variant="h6" color="error">
                        {artwork.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <AnimatedButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Details
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