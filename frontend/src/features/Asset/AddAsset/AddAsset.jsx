import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill'; 
import Autocomplete from '@mui/material/Autocomplete';
import ImageUploadAndReview from './ImageUpload';
import CustomNumberInput from '~/components/InputNumberComponent/InputNumberComponent'

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
  'Kelly Snyder',
];

const vendors = [
  'Vendor 1',
  'Vendor 2',
  'Vendor 3',
];

const inspectors = [
  'Inspector A',
  'Inspector B',
  'Inspector C',
];

const CustomFormControl = styled(FormControl)({
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'blue',
  },
  '& .Mui-focused .MuiInputLabel-root': {
    color: 'blue',
  },
});

const CustomTextField = styled(TextField)({
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'blue',
  },
});

const AddAsset = () => {
  const [assetName, setAssetName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [vendor, setVendor] = useState([]);
  const [inspector, setInspector] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  const [value, setValue] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, vendor, inspector, editorContent);
  };

  return (
    <Box sx={{ m: 'auto', maxWidth: '880px', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Box 
        sx={(theme) => ({
          m: 'auto',
          maxWidth: '880px',
          borderRadius: '16px 16px 0 0',
          backgroundColor: theme.palette.primary.lightMain,
          height: 75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Typography variant="h4" component="h3" gutterBottom sx={{ textAlign: 'center', color: 'white', m: 0 }}>
          Create Asset
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="assetName"
              variant="outlined"
              color="secondary"
              label="Asset Name"
              onChange={(e) => setAssetName(e.target.value)}
              value={assetName}
              required
              fullWidth
              sx={{ m: 1, width: '50%' }}
            />
            <Autocomplete
              disablePortal
              options={names}
              sx={{
                m: 1,
                width: '50%',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'blue',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
                '& label.Mui-focused': {
                  color: 'blue',
                },
              }}
              renderInput={(params) => <CustomTextField {...params} label="Category" />}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <Autocomplete
              disablePortal
              options={vendors}
              sx={{
                m: 1,
                width: '50%',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'blue',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
                '& label.Mui-focused': {
                  color: 'blue',
                },
              }}
              renderInput={(params) => <CustomTextField {...params} label="Vendors" />}
            />
              <Autocomplete
              disablePortal
              options={names}
              sx={{
                m: 1,
                width: '50%',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'blue',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
                '& label.Mui-focused': {
                  color: 'blue',
                },
              }}
              renderInput={(params) => <CustomTextField {...params} label="Inspector" />}
            />
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
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              theme="snow"
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
              sx = {{width:'70%'}}
            >
              Submit
            </Button>
          </Box>

        </form>
        
      </Box>
    </Box>
    
  );
};

export default AddAsset;