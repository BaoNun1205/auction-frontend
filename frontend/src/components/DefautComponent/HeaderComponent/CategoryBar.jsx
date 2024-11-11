import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetCategories } from '~/hooks/categoryHook';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CategoryBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { data } = useGetCategories();
  const items = Array.isArray(data) ? data : [];

  const handleClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setCurrentCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentCategory(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Box display="flex" justifyContent="space-between">
              {items.map((category) => (
                <Button
                  key={category.categoryId}
                  color="inherit"
                  onClick={(event) => handleClick(event, category)}
                >
                  <Typography variant="h7" fontWeight="bold">
                    {category.categoryName}
                  </Typography>
                  <ArrowDropDownIcon />
                </Button>
              ))}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {currentCategory?.types.map((type) => (
          <MenuItem
            key={type.typeId}
            component={Link}
            to={`/customer-asset/${currentCategory.categoryId}/${type.typeId}`}
            onClick={handleClose}
          >
            <Typography variant="h8">
              {type.typeName}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoryBar;
