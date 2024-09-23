import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'

const MenuItemExpand = ({ itemOpen, item, handleClick }) => {
  const navigate = useNavigate()

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block', color: 'primary.textMain' }}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: 48,
            justifyContent: 'initial',
            m: 2,
            mb: 0.5,
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
              mr: 2,
              justifyContent: 'center',
              color: 'primary.textMain'
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0, color: 'primary.textMain' }} />
          {open && (itemOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      <Collapse in={itemOpen && open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subItems.map((subItem, subIndex) => (
            <ListItemButton
              key={subIndex}
              sx={{
                pl: 4,
                m: 2,
                mt: 0.5,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'primary.secondary'
                }
              }}
              onClick={() => navigate(subItem.path)}
            >
              <ListItemText primary={subItem.name} sx={{ color: 'primary.textMain' }} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default MenuItemExpand