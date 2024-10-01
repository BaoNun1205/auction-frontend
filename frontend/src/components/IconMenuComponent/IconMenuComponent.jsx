import React, { useState } from 'react'
import { IconButton, Popper, MenuList, Paper } from '@mui/material'
import { MoreVertical } from 'lucide-react'

const ActionMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMouseLeavePopper = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <IconButton
        sx={(theme) => ({ color: theme.palette.primary.textMain })}
        onClick={handleMenuOpen}
      >
        <MoreVertical size={20} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="right-start"
        style={{ zIndex: 1 }}
        onMouseLeave={handleMouseLeavePopper}
      >
        <Paper>
          <MenuList>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onClick: (event) => {
                  if (child.props.onClick) {
                    child.props.onClick(event)
                  }
                  handleMenuClose()
                }
              })
            )}
          </MenuList>
        </Paper>
      </Popper>
    </>
  )
}

export default ActionMenu