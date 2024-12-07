import React, { useState } from 'react';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';

const FilterSidebar = ({ categories, filters, handleFilterChange }) => {
  const [expandedCategory, setExpandedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? '' : category);
  };

  return (
    <>
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
              checked={filters.auction_success}
              onChange={handleFilterChange}
              name="auction_success"
            />
          }
          label="Đấu giá thành công"
        />
      </FormGroup>
    </>
  );
};

export default FilterSidebar;

