import React, { useState, useRef } from 'react'
import {
  Popper,
  MenuList,
  Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from '@mui/icons-material'
import { MenuContainer, StyledButton, StyledPaper, StyledMenuItem, ButtonContent, IconContainer, MenuItemName } from './style'

const MenuItem = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const timerRef = useRef(null)

  const handleMouseEnterButton = (event) => {
    clearTimeout(timerRef.current)
    setAnchorEl(event.currentTarget)
    setIsHovered(true)
  }

  const handleMouseLeaveButton = () => {
    timerRef.current = setTimeout(() => {
      setIsHovered(false)
      setAnchorEl(null)
    }, 100)
  }

  const handleMouseEnterPopper = () => {
    clearTimeout(timerRef.current)
    setIsHovered(true)
  }

  const handleMouseLeavePopper = () => {
    timerRef.current = setTimeout(() => {
      setIsHovered(false)
      setAnchorEl(null)
    }, 100)
  }

  const open = Boolean(anchorEl) && isHovered
  const isMenu = item.subItems && item.subItems.length > 0

  const handleClick = (e) => {
    if (isMenu) {
      handleMouseEnterButton(e)
    } else {
      navigate(item.path)
    }
  }

  return (
    <MenuContainer>
      <StyledButton
        className="button-class"
        onMouseEnter={isMenu ? handleMouseEnterButton : undefined}
        onMouseLeave={isMenu ? handleMouseLeaveButton : undefined}
        onClick={!isMenu ? handleClick : undefined}
      >
        <ButtonContent>
          <IconContainer>
            {item.icon}
            {isMenu && (
              <ChevronRight
                size={16}
                style={{
                  position: 'absolute',
                  right: -24,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
            )}
          </IconContainer>
          <MenuItemName variant="caption">{item.name}</MenuItemName>
        </ButtonContent>
      </StyledButton>
      {isMenu && (
        <Popper
          className="popper-class"
          open={open}
          anchorEl={anchorEl}
          placement="right-start"
          style={{ zIndex: 1 }}
          onMouseEnter={handleMouseEnterPopper}
          onMouseLeave={handleMouseLeavePopper}
        >
          <StyledPaper>
            <MenuList>
              {item.subItems.map((subItem) => (
                <StyledMenuItem key={subItem.name} onClick={() => navigate(subItem.path)}>
                  {subItem.name}
                </StyledMenuItem>
              ))}
            </MenuList>
          </StyledPaper>
        </Popper>
      )}
    </MenuContainer>
  )
}

export default MenuItem
