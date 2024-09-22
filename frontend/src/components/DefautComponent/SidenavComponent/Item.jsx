import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

const Item = ({ item, open }) => {
  const navigate = useNavigate()

  return (
    <ListItem key={item.name} disablePadding sx={{ display: 'block', color: 'primary.textMain' }} onClick={() => navigate(`${item.path}`)}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          m: 2,
          px: 1,
          borderRadius: 2,
          '&:hover': {
            bgcolor: 'primary.secondary'
          }
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'primary.textMain'
          }}
        >
          <Box sx={{ color: 'primary.textMain' }}>
            {item.icon}
          </Box>
        </ListItemIcon>
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
      </ListItemButton>
    </ListItem>
  )
}

export default Item