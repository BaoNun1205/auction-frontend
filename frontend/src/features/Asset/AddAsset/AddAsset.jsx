import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material'
import ReactQuill from 'react-quill'
import ImageUploadAndReview from './ImageUpload'
import CustomNumberInput from '~/components/InputNumberComponent/InputNumberComponent'
import StackSelectComponent from '~/components/StackSelectComponent/StackSelectComponent'
import { StyledContainer, StyledHeaderBox, StyledInnerBox, StyledSubtitleBox, StyledTitleBox } from '~/features/style'
import TextFieldComponent from '~/components/TextFieldComponent/TextFieldComponent'
import Editor from '~/components/EditorComponent/Editor'
// import { useTheme } from '@mui/material/styles'

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

const AddAsset = () => {
  const [assetName, setAssetName] = useState('')
  const [vendor, setVendor] = useState([])
  const [inspector, setInspector] = useState([])
  const [editorContent, setEditorContent] = useState('')
  // const { theme } = useTheme()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(vendor, inspector, editorContent)
  }

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Create</StyledTitleBox>
            <StyledSubtitleBox>
              Dashboard • requirement • <Box component="span" sx={{ color: 'primary.disable' }}>Create</Box>
            </StyledSubtitleBox>
          </Box>
        </StyledHeaderBox>
        <Box sx={(theme) => ({ m: 'auto', maxWidth: '880px', bgcolor: theme.palette.primary.secondary, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' })}>
          <Box sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            px: 3,
            py: 3,
            color: theme.palette.primary.textMain,
            borderBottom: '1px solid',
            borderColor: theme.palette.primary.disable
          })}>
            <Typography component="h6" variant='h6' sx={(theme) => ({ color: theme.palette.primary.textMain })}>
                Details
            </Typography>
            <Typography sx={(theme) => ({ color: theme.palette.primary.disable })}>
                Title, short description, image...
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextFieldComponent label="Asset Name" value={assetName} onChange={(e) => setAssetName(e.target.value)} sx={{ width: '50%' }} />
                <StackSelectComponent
                  options={names}
                  label="Category"
                  sx={{ m: 1, width: '50%' }}
                />
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextFieldComponent label="Vendor Name" value={vendor} onChange={(e) => setVendor(e.target.value)} sx={{ width: '50%' }} />
                <TextFieldComponent label="Inspector Name" value={inspector} onChange={(e) => setInspector(e.target.value)} sx={{ width: '50%' }} />
              </Stack>
              <Typography variant="h6" gutterBottom>
              Price
              </Typography>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <CustomNumberInput aria-label="Demo number input" placeholder="Type a number…" />
              </Stack>
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" gutterBottom>
              Description
                </Typography>
                <Editor
                  value={editorContent}
                  onChange={setEditorContent}
                  error={false}
                  helperText=""
                />
              </Box>
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" gutterBottom>
              Images
                </Typography>
                <ImageUploadAndReview />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx = {{ width:'70%' }}
                >
              Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </StyledInnerBox>
    </StyledContainer>

  )
}

export default AddAsset