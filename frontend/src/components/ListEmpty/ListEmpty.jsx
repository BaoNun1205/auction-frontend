import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { FolderOpen } from 'lucide-react'

export default function ListEmpty({ nameList }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 300,
        p: 6
      }}>
        <FolderOpen 
          size={64} 
          style={{ 
            color: 'text.secondary', 
            marginBottom: '16px' 
          }} 
        />
        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
          No {nameList} found
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 250 }}>
          There are no {nameList} to display. Try creating a new category or adjusting your filters.
        </Typography>
      </Box>
    </Box>
  )
}