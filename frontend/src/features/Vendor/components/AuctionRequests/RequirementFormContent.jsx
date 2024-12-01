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

const primaryColor = '#b41712';

const RequirementFormContent = ({
  formData,
  handleInputChange,
  handleDescriptionChange,
  handleImageUpload,
  handleDeleteImage,
  canEdit,
  currentRequirement
}) => {
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên sản phẩm"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            variant="outlined"
            disabled={currentRequirement && !canEdit}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Giá khởi điểm"
            name="startingPrice"
            type="number"
            value={formData.startingPrice}
            onChange={handleInputChange}
            required
            variant="outlined"
            InputProps={{
              startAdornment: <Typography color="textSecondary">₫</Typography>
            }}
            disabled={currentRequirement && !canEdit}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Mô tả
          </Typography>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            theme="snow"
            style={{ height: '200px', marginBottom: '50px' }}
            readOnly={currentRequirement && !canEdit}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color={primaryColor}>
            Hình ảnh sản phẩm
          </Typography>
          <Grid container spacing={2}>
            {formData.productImages.map((image, index) => (
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
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color={primaryColor}>
            Hình ảnh giấy tờ
          </Typography>
          <Grid container spacing={2}>
            {formData.documentImages.map((image, index) => (
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
        </Grid>
      </Grid>
    </form>
  );
};

export default RequirementFormContent;