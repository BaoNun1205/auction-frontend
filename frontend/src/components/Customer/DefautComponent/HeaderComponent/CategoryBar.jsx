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
  styled
} from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useFilterCategories } from '~/hooks/categoryHook';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#000000',
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 2),
  borderRadius: 0,
  borderBottom: '3px solid transparent',
  '&:hover': {
    backgroundColor: 'transparent',
    borderBottom: `3px solid #b41712`,
  },
  '&:focus': {
    backgroundColor: 'rgba(180, 23, 18, 0.1)',
  },
  transition: 'all 0.3s',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: 'rgba(180, 23, 18, 0.1)',
  },
  '&:focus': {
    backgroundColor: 'rgba(180, 23, 18, 0.2)',
  },
  transition: 'all 0.2s',
}));

const CategoryBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data, isLoading, isError } = useFilterCategories();

  if (isLoading) {
    return <Typography align="center" py={2}>Loading...</Typography>;
  }

  if (isError) {
    return <Typography align="center" py={2} color="error">Error loading categories</Typography>;
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
    <StyledAppBar position="static">
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
                <StyledButton
                  onClick={(event) => handleClick(event, category)}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {category.categoryName}
                </StyledButton>
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
                      border: '1px solid rgba(180, 23, 18, 0.1)',
                      '& .MuiList-root': {
                        paddingTop: 1,
                        paddingBottom: 1,
                      },
                    },
                  }}
                >
                  {category.types.map((type) => (
                    <StyledMenuItem
                      key={type.typeId}
                      component={Link}
                      to={`/customer-asset/${category.categoryId}/${type.typeId}`}
                      onClick={handleClose}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {type.typeName}
                      </Typography>
                    </StyledMenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default CategoryBar;

