import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  styled
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import ReactQuill from 'react-quill'
import { useCreateCategory } from '~/hooks/categoryHook'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const CreateCategory = ({ onClose, onCreateSuccess }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const { mutate: createCategory, isLoading, error } = useCreateCategory()

  const handleNameChange = (event) => {
    setName(event.target.value)
    console.log('Name:', name)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
    console.log('Image:', file)
  }

  const handleDeleteImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Tạo FormData và thêm file ảnh và tên category
    const formData = new FormData()
    formData.append('categoryName', name) // Thêm tên category
    formData.append('image', image) // Thêm file ảnh

    console.log('Submitted:', { name, image })

    // Gửi FormData
    createCategory(
      formData,
      {
        onSuccess: (response) => {
          onCreateSuccess()
          console.log('Category created successfully:', response)
          setName('')
          setImage(null)
          setImagePreview(null)
          onClose()
        },
        onError: (error) => {
          console.error('Error creating category:', error)
        }
      }
    )
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, minWidth: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Create New Category</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Category Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#1c252e'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#28323d'
              }
            },
            '& label.Mui-focused': {
              color: '#1c252e'
            }
          }}
        />
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2 }}
            disabled={!!image}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Box>
        {imagePreview && (
          <Box sx={{ mt: 2, mb: 2, position: 'relative' }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
            />
            <IconButton
              aria-label="delete image"
              onClick={handleDeleteImage}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading} // Khóa nút khi đang gửi yêu cầu
        >
          Create Category
        </Button>
      </form>
    </Box>
  )
}

export default CreateCategory
