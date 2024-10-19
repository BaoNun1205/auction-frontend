import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadIllustration from './uploadsvg';

const ImageUploadAndReview = forwardRef((props, ref) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useImperativeHandle(ref, () => ({
    getSelectedFiles: () => selectedFiles,
    clearSelectedFiles: () => {
      setSelectedImages([]); // Đặt lại danh sách hình ảnh đã chọn
      setSelectedFiles([]); // Đặt lại danh sách file đã chọn
    },
  }));

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleRemoveAll = () => {
    setSelectedImages([]);
    setSelectedFiles([]);
  };

  return (
    <Box>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        multiple
        hidden
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed lightgray',
            borderRadius: 1,
            p: 3,
            minHeight: 200,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
            },
          }}
        >
          <UploadIllustration />
          <p>Drop or select file</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>
            Drop files here or click to browse through your machine.
          </p>
        </Box>
      </label>

      <ImageList
        sx={{ width: '100%', mt: 2, overflowY: 'auto', maxHeight: 450 }}
        cols={5}
        rowHeight={150}
      >
        {selectedImages.map((imageUrl, index) => (
          <ImageListItem key={index}>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              loading="lazy"
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
            />
            <ImageListItemBar
              position="top"
              sx={{ backgroundColor: 'transparent' }}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <CloseIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleRemoveAll} sx={{ mr: 2 }}>
          Remove all
        </Button>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => props.onUpload(selectedFiles)}
          disabled={selectedImages.length === 0}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
});

ImageUploadAndReview.displayName = 'ImageUploadAndReview';

export default ImageUploadAndReview;
