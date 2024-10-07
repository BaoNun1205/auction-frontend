import React, { useState, useCallback, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { Box, IconButton, Tooltip, Typography, Fade } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import { StyledEditor, FullscreenWrapper } from './style'
import styled from '@emotion/styled'
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

// const StyledEditor = styled('div')(({ theme }) => ({
//   position: 'relative',
//   height: '100%',
//   '& .ql-toolbar.ql-snow': {
//     backgroundColor: '#f5f5f5',
//     border: 'none',
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: theme.spacing(1),
//     '& .ql-formats': {
//       marginRight: theme.spacing(1),
//     },
//     '& button': {
//       color: theme.palette.text.primary,
//       '&:hover': {
//         color: theme.palette.primary.main,
//       },
//       '&.ql-active': {
//         color: theme.palette.primary.main,
//       },
//     },
//     '& .ql-picker': {
//       color: theme.palette.text.primary,
//     },
//     '& .ql-picker-options': {
//       backgroundColor: '#ffffff',
//       border: `1px solid ${theme.palette.divider}`,
//     },
//   },
//   '& .ql-container.ql-snow': {
//     border: 'none',
//     backgroundColor: '#ffffff',
//     color: theme.palette.text.primary,
//     height: 'calc(100% - 42px)', // Adjust based on your toolbar height
//   },
//   '& .ql-editor': {
//     padding: theme.spacing(2),
//     '&.ql-blank::before': {
//       color: theme.palette.text.secondary,
//     },
//   },
// }))

// const StyledReactQuill = styled(ReactQuill)(({ theme }) => ({
//   '.ql-container': {
//     backgroundColor: 'black', // Màu nền đen
//     color: 'white' // Màu chữ trắng
//   },
//   '.ql-toolbar': {
//     backgroundColor: 'black' // Màu nền của toolbar
//   }
// }));

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


