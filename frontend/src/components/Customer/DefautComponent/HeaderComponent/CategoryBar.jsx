import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Menu, 
  MenuItem, 
  Container, 
  Box, 
  Typography, 
  useTheme, 
  alpha 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFilterCategories } from '~/hooks/categoryHook';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CategoryBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data, isLoading, isError } = useFilterCategories();
  const theme = useTheme();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading categories</Typography>;
  }

  const { data: categories } = data;

  const handleClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0} 
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box 
            display="flex" 
            justifyContent="space-between" 
            width="100%" 
            sx={{ overflowX: 'auto', flexWrap: 'nowrap' }}
          >
            {categories.map((category) => (
              <Box key={category.categoryId} sx={{ minWidth: 'max-content' }}>
                <Button
                  color="inherit"
                  onClick={(event) => handleClick(event, category)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    fontWeight: 'bold',
                    px: 2,
                    py: 1.5,
                    borderRadius: 0,
                    borderBottom: '3px solid transparent',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderBottom: `3px solid ${theme.palette.primary.main}`,
                    },
                    '&:focus': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  {category.categoryName}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedCategory === category}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      minWidth: 180,
                    },
                  }}
                >
                  {category.types.map((type) => (
                    <MenuItem
                      key={type.typeId}
                      component={Link}
                      to={`/customer-asset/${category.categoryId}/${type.typeId}`}
                      onClick={handleClose}
                      sx={{
                        py: 1,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                        '&:focus': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        },
                        transition: 'all 0.2s',
                      }}
                    >
                      <Typography variant="body2">{type.typeName}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CategoryBar;