import React, { useState, useCallback, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { Box, IconButton, Tooltip, Typography, Fade } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import { StyledEditor, FullscreenWrapper } from './style'
import 'react-quill/dist/quill.snow.css'

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background'
]

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean']
  ]
}

const Editor = ({ error, helperText, sx, ...other }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isFullscreen, toggleFullscreen])

  return (
    <FullscreenWrapper isFullscreen={isFullscreen}>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`
          }),
          ...sx
        }}
      >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...other}
        />
        <Fade in={isFocused || isFullscreen}>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1
            }}
          >
            <Tooltip title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
              <IconButton
                onClick={toggleFullscreen}
                sx={{
                  color: 'text.primary',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>
      </StyledEditor>
      {helperText && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {helperText}
        </Typography>
      )}
    </FullscreenWrapper>
  )
}

export default Editor


