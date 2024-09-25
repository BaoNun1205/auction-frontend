import React from 'react'
import Navbar from '../../components/DefautComponent/NavbarComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../../components/DefautComponent/SidenavComponent/Sidenav'
import UserList from '../../features/user/UserList'
import { useState } from 'react'
import { createTheme } from '@mui/material'
import DarkThemeEditor from '~/components/EditorComponent/Editor'

export default function EditorPage() {
  const [content, setContent] = useState('')
  const [error, setError] = useState(false)

  const handleEditorChange = (value) => {
    setContent(value)
    setError(value.length === 0)
  }

  const handleSubmit = () => {
    if (content.length === 0) {
      setError(true)
    } else {
      console.log('Submitted content:', content)
      // Here you would typically send the content to a server
    }
  }

  return (

    <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display:'flex', bgcolor: '#000000' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'primary.main' }}>
            <DarkThemeEditor
              value={content}
              onChange={handleEditorChange}
              error={error}
              helperText={error ? 'Content cannot be empty' : ''}
              sx={{ marginBottom: 2 }}
            />
          </Box>
        </Box>
      </div>
    </>
  )
}