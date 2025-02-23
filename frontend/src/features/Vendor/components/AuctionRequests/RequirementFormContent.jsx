import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { ImagePreview, ImageUploadButton } from './style';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const primaryColor = '#b41712';

const formatNumber = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const RequirementFormContent = ({
  formData,
  handleInputChange,
  handleDescriptionChange,
  handleImageUpload,
  handleDeleteImage,
  canEdit,
  currentRequirement,
  handleSubmit
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên vật phẩm là bắt buộc'),
    startingPrice: Yup.string().required('Giá khởi điểm là bắt buộc'),
    productImages: Yup.array().min(1, 'Cần ít nhất một hình ảnh vật phẩm'),
    documentImages: Yup.array().min(1, 'Cần ít nhất một hình ảnh giấy tờ')
  });

  const handlePriceChange = (event, setFieldValue) => {
    const { name, value } = event.target;
    const formattedValue = formatNumber(value.replace(/\./g, ''));
    setFieldValue(name, formattedValue);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, isValid, dirty }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                label="Tên vật phẩm"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                required
                variant="outlined"
                disabled={currentRequirement && !canEdit}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                label="Giá khởi điểm"
                name="startingPrice"
                value={values.startingPrice}
                onChange={(e) => handlePriceChange(e, setFieldValue)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: <Typography color="textSecondary">₫</Typography>
                }}
                disabled={currentRequirement && !canEdit}
                error={touched.startingPrice && Boolean(errors.startingPrice)}
                helperText={touched.startingPrice && errors.startingPrice}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Mô tả
              </Typography>
              <ReactQuill
                value={values.description}
                onChange={handleDescriptionChange}
                theme="snow"
                style={{ height: '200px', marginBottom: '50px' }}
                readOnly={currentRequirement && !canEdit}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color={primaryColor}>
                Hình ảnh vật phẩm
              </Typography>
              <Grid container spacing={2}>
                {values.productImages.map((image, index) => (
                  <Grid item xs={12} sm={3} key={`product-${index}`}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`product-image-upload-${index}`}
                      type="file"
                      onChange={(e) => handleImageUpload(e, 'productImages', index)}
                      disabled={currentRequirement && !canEdit}
                    />
                    <label htmlFor={`product-image-upload-${index}`}>
                      {image ? (
                        <ImagePreview style={{ backgroundImage: `url(${image instanceof File ? URL.createObjectURL(image) : image})` }}>
                          {(!currentRequirement || canEdit) && (
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteImage('productImages', index)}
                              sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                            >
                              <CloseIcon />
                            </IconButton>
                          )}
                        </ImagePreview>
                      ) : (
                        <ImageUploadButton component="span" disabled={currentRequirement && !canEdit}>
                          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                          <Typography variant="body2" color="textSecondary">
                            Thêm ảnh
                          </Typography>
                        </ImageUploadButton>
                      )}
                    </label>
                  </Grid>
                ))}
              </Grid>
              {touched.productImages && errors.productImages && (
                <Typography color="error" variant="body2">
                  {errors.productImages}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color={primaryColor}>
                Hình ảnh giấy tờ
              </Typography>
              <Grid container spacing={2}>
                {values.documentImages.map((image, index) => (
                  <Grid item xs={12} sm={6} key={`document-${index}`}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`document-image-upload-${index}`}
                      type="file"
                      onChange={(e) => handleImageUpload(e, 'documentImages', index)}
                      disabled={currentRequirement && !canEdit}
                    />
                    <label htmlFor={`document-image-upload-${index}`}>
                      {image ? (
                        <ImagePreview style={{ backgroundImage: `url(${image instanceof File ? URL.createObjectURL(image) : image})` }}>
                          {(!currentRequirement || canEdit) && (
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteImage('documentImages', index)}
                              sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                            >
                              <CloseIcon />
                            </IconButton>
                          )}
                        </ImagePreview>
                      ) : (
                        <ImageUploadButton component="span" disabled={currentRequirement && !canEdit}>
                          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                          <Typography variant="body2" color="textSecondary">
                            Thêm ảnh
                          </Typography>
                        </ImageUploadButton>
                      )}
                    </label>
                  </Grid>
                ))}
              </Grid>
              {touched.documentImages && errors.documentImages && (
                <Typography color="error" variant="body2">
                  {errors.documentImages}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default RequirementFormContent;