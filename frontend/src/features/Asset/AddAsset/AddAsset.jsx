import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImageUploadAndReview from './ImageUpload';
import { StyledContainer, StyledHeaderBox, StyledInnerBox, StyledSubtitleBox, StyledTitleBox } from '~/features/style';
import TextFieldComponent from '~/components/TextFieldComponent/TextFieldComponent';
import Editor from '~/components/EditorComponent/Editor';
import { useCreateRequirement, useGetRequirementById } from '~/hooks/requirementHook';
import StackSelectComponent from '~/components/StackSelectComponent/StackSelectComponent';
import { useCreateAsset } from '~/hooks/assetHook';
import { useNavigate } from 'react-router-dom';
import { ASSET_PATH } from '~/api/assetApi';
import { BASE_PATHS } from '~/routes/routes';
import { useGetTypes } from '~/hooks/typeHook';

const validationSchema = Yup.object().shape({
  assetName: Yup.string().required('Asset Name is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  editorContent: Yup.string().required('Description is required'),
  type: Yup.string().required('Type is required')
});

const AddAsset = () => {
  const { id } = useParams();
  const { data: requirement, error, isLoading } = useGetRequirementById(id);
  const { mutate: createAsset } = useCreateAsset();
  const imageUploadRef = useRef();
  const navigate = useNavigate();
  const { data } = useGetTypes();
  const types = Array.isArray(data) ? data : [];

  const [initialValues, setInitialValues] = useState({
    assetName: '',
    price: '',
    editorContent: '',
    vendor: '',
    inspector: '',
    type: '',
    images: []
  });

  useEffect(() => {
    if (requirement) {
      setInitialValues({
        assetName: requirement.assetName || '',
        price: requirement.assetPrice || '',
        editorContent: requirement.assetDescription || '',
        vendor: requirement.vendor.userId || '',
        inspector: requirement.inspector.userId || '',
        images: requirement.imageRequirements.map(img => img.image) || []
      });
    }
  }, [requirement]);

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('requirementId', id);
    formData.append('assetName', values.assetName);
    formData.append('assetPrice', values.price);
    formData.append('assetDescription', values.editorContent);
    formData.append('vendorId', values.vendor);
    formData.append('inspectorId', values.inspector);
    formData.append('typeId', values.type);
    formData.append('images', values.images);

    console.log('formData', formData);

    createAsset(formData, {
      onSuccess: (response) => {
        console.log('Success:', response);
        navigate(`${BASE_PATHS.ASSET}`);
      },
      onError: (error) => {
        console.error('Error:', error);
        navigate(`${BASE_PATHS.ASSET}`);
      }
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography color="error">Error fetching requirement</Typography>
      </Box>
    );
  }

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Tạo vật phẩm</StyledTitleBox>
            <StyledSubtitleBox>
              Vật phẩm • <Box component="span" sx={{ color: 'primary.disable' }}>Tạo</Box>
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
              Chi tiết vật phẩm
            </Typography>
            <Typography sx={(theme) => ({ color: theme.palette.primary.disable })}>
              Tiêu đề, mô tả ngắn, hình ảnh...
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, setFieldValue, isSubmitting, errors, touched }) => (
                <Form noValidate>
                  <Stack direction="row" sx={{ my: 2 }}>
                    <Field
                      name="assetName"
                      as={TextFieldComponent}
                      label="Tên vật phẩm"
                      value={values.assetName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '100%' }}
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Stack>
                  <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                    <Field
                      name="price"
                      as={TextFieldComponent}
                      label="Giá khởi điểm"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                      InputProps={{
                        readOnly: true
                      }}
                    />
                    <StackSelectComponent
                      options={types.map(type => ({ label: type.typeName, value: type.typeId }))}
                      value={types.find(type => type.typeId === values.type)?.typeName}
                      label='Loại vật phẩm'
                      onChange={(event, newValue) => setFieldValue('type', newValue?.value || '')}
                      sx={{ m: 1, width: '50%' }}
                      error={touched.type && Boolean(errors.type)}
                      helperText={touched.type && errors.type}
                    />
                  </Stack>
                  <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                    <Field
                      name="vendor"
                      as={TextFieldComponent}
                      label="Người bán"
                      value={requirement?.vendor?.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                      InputProps={{
                        readOnly: true
                      }}
                    />
                    <Field
                      name="inspector"
                      as={TextFieldComponent}
                      label="Người kiểm duyệt"
                      value={requirement?.inspector?.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Stack>
                  <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Mô tả chi tiết
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
                      Hình ảnh
                    </Typography>
                    <ImageUploadAndReview ref={imageUploadRef} initialImages={values.images} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting || !values.type}
                      sx={{ width: '70%' }}
                    >
                      Tạo vật phẩm
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
        </StyledInnerBox>
    </StyledContainer>
  );
};

export default AddAsset;