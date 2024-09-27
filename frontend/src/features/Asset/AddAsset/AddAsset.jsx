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
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    borderColor: 'green',
  },
  '& .Mui-focused .MuiInputLabel-root': {
    color: 'green',
  },
});

const AddAsset = () => {
  const [assetName, setAssetName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [vendor, setVendor] = useState('');
  const [inspector, setInspector] = useState('');
  const [editorContent, setEditorContent] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(assetName, firstName, vendor, inspector, editorContent);
  }

  return (
    <Box sx={{ m: 'auto', maxWidth: '880px', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Box sx={{ m: 'auto', maxWidth: '880px', borderRadius: '16px 16px 0 0', backgroundColor: '#0073e6', height: 75, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" component="h3" gutterBottom sx={{ textAlign: 'center', color: 'white', m: 0 }}>
          Create Asset
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              variant="outlined"
              color="secondary"
              label="Asset Name"
              onChange={e => setAssetName(e.target.value)}
              value={assetName}
              required
              fullWidth
              sx={{ m: 1, width: '50%' }}
            />
            <CustomFormControl sx={{ m: 1, width: '50%' }}>
              <InputLabel id="name-label">Name</InputLabel>
              <Select
                labelId="name-label"
                variant="outlined"
                color="secondary"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                fullWidth
                required
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      overflowY: 'auto',
                    },
                  },
                }}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </CustomFormControl>
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <CustomFormControl sx={{ m: 1, width: '50%' }}>
              <InputLabel id="vendor-label">Vendor</InputLabel>
              <Select
                labelId="vendor-label"
                variant="outlined"
                color="secondary"
                onChange={e => setVendor(e.target.value)}
                value={vendor}
                fullWidth
                required
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor} value={vendor}>
                    {vendor}
                  </MenuItem>
                ))}
              </Select>
            </CustomFormControl>
            <CustomFormControl sx={{ m: 1, width: '50%' }}>
              <InputLabel id="inspector-label">Inspector</InputLabel>
              <Select
                labelId="inspector-label"
                variant="outlined"
                color="secondary"
                onChange={e => setInspector(e.target.value)}
                value={inspector}
                fullWidth
                required
              >
                {inspectors.map((inspector) => (
                  <MenuItem key={inspector} value={inspector}>
                    {inspector}
                  </MenuItem>
                ))}
              </Select>
            </CustomFormControl>
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
          <Button variant="outlined" color="secondary" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddAsset;