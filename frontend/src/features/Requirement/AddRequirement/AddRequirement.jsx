import React, { useRef } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ImageUploadAndReview from './ImageUpload'
import { StyledContainer, StyledHeaderBox, StyledInnerBox, StyledSubtitleBox, StyledTitleBox } from '~/features/style'
import TextFieldComponent from '~/components/TextFieldComponent/TextFieldComponent'
import Editor from '~/components/EditorComponent/Editor'
import { useCreateRequirement } from '~/hooks/requirementHook'
import Resizer from 'react-image-file-resizer'

const validationSchema = Yup.object().shape({
  assetName: Yup.string().required('Asset Name is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  editorContent: Yup.string().required('Description is required')
})

const resizeImage = (file) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800, // width
      800, // height
      'JPEG', // format
      80, // quality
      0, // rotation
      (uri) => resolve(uri),
      'file'
    )
  })
}

const AddRequirement = () => {
  const { mutate: createRequirement } = useCreateRequirement()
  const imageUploadRef = useRef()

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData()
    formData.append('assetName', values.assetName)
    formData.append('assetPrice', values.price)
    formData.append('assetDescription', values.editorContent)

    // Lấy các file từ ImageUploadAndReview qua imageUploadRef
    const selectedFiles = imageUploadRef.current.getSelectedFiles()

    // Resize từng file trước khi thêm vào FormData
    for (const file of selectedFiles) {
      const resizedFile = await resizeImage(file);
      formData.append('images', resizedFile);
    }
    
    createRequirement(formData, {
      onSuccess: (response) => {
        console.log('Success:', response)
        setSubmitting(false)
        resetForm()
        imageUploadRef.current.clearSelectedFiles()
      },
      onError: (error) => {
        console.error('Error:', error)
        setSubmitting(false)
      }
    })
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
        <Box sx={(theme) => ({
          m: 'auto', maxWidth: '880px', bgcolor: theme.palette.primary.secondary, borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        })}>
          <Box sx={(theme) => ({
            display: 'flex', flexDirection: 'column', px: 3, py: 3,
            color: theme.palette.primary.textMain, borderBottom: '1px solid',
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
            <Formik
              initialValues={{
                assetName: '',
                price: '',
                editorContent: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                <Form noValidate>
                  <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                    <Field
                      name="assetName"
                      as={TextFieldComponent}
                      label="Asset Name"
                      value={values.assetName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                    />
                    <Field
                      name="price"
                      as={TextFieldComponent}
                      label="Expected price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                    />
                  </Stack>
                  <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Description
                    </Typography>
                    <Editor
                      value={values.editorContent}
                      onChange={(content) => setFieldValue('editorContent', content)}
                      error={false}
                      helperText=""
                    />
                  </Box>
                  <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Images
                    </Typography>
                    <ImageUploadAndReview ref={imageUploadRef} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{ width: '70%' }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </StyledInnerBox>
    </StyledContainer>
  )
}

export default AddRequirement
