import React from 'react'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = ({ items = [] }) => {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <Breadcrumbs separator={<ChevronRight fontSize="small" />} aria-label="breadcrumb" mb={3}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return item.path ? (
          <Link
            key={index}
            to={item.path}
            style={{
              color: isLast ? 'text.primary' : 'inherit',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => handleNavigate(item.path)}
          >
            {item.label}
          </Link>
        ) : (
          <Typography
            key={index}
            color="text.primary"
            sx={{ cursor: 'default' }}
          >
            {item.label}
          </Typography>
        )
      })}
    </Breadcrumbs>
  )
}

export default Breadcrumb