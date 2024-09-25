import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { StyledListItem, StyledListItemButton, StyledListItemIcon } from './style'

const ItemExpand = ({ item }) => {
  const navigate = useNavigate()

  return (
    <StyledListItem key={item.name} disablePadding onClick={() => navigate(`${item.path}`)}>
      <StyledListItemButton>
        <StyledListItemIcon>
          <Box sx={(theme) => ({ color: theme.palette.primary.textmain })}>
            {item.icon}
          </Box>
        </StyledListItemIcon>
        <ListItemText
          primary={item.name}
          sx={[
            open
              ? {
                opacity: 1
              }
              : {
                opacity: 0
              }
          ]}
        />
      </StyledListItemButton>
    </StyledListItem>
  )
}

export default ItemExpand