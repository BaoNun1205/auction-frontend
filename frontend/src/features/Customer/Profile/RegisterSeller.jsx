import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  InputLabel,
  FormControl,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const RegisterSeller = () => {
  const [businessFile, setBusinessFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: '#d32f2f', fontWeight: 'bold', mb: 4 }}
      >
        Seller Information
      </Typography>

      <Grid container spacing={2}>
        {/* Username/Email */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username/Email"
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* First Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Country */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* State/Province */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="State/Province"
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* City */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Short description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Short description"
            variant="outlined"
            size="small"
            multiline
            rows={4}
          />
        </Grid>

        {/* Terms and conditions */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Terms and conditions of the auction"
            variant="outlined"
            size="small"
            multiline
            rows={4}
          />
        </Grid>

        {/* Payments */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Payments
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Bank Name</InputLabel>
            <Select>
              <MenuItem value={1}>Jack</MenuItem>
              <MenuItem value={2}>Lucy</MenuItem>
              <MenuItem value={3}>Tom</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Bank Number</InputLabel>
            <Select>
              <MenuItem value={1}>123456</MenuItem>
              <MenuItem value={2}>234567</MenuItem>
              <MenuItem value={3}>345678</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Bank Branch</InputLabel>
            <Select>
              <MenuItem value={1}>Branch A</MenuItem>
              <MenuItem value={2}>Branch B</MenuItem>
              <MenuItem value={3}>Branch C</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Organization */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Organization (Individuals may skip this section)
          </Typography>
        </Grid>

        {/* Business license */}
        <Grid item xs={12} sm={6}>
          <Typography>Business license</Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
          >
            Upload
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(e, setBusinessFile)}
            />
          </Button>
          {businessFile && <Typography>{businessFile.name}</Typography>}
        </Grid>

        {/* Company logo */}
        <Grid item xs={12} sm={6}>
          <Typography>Logo</Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
          >
            Upload
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(e, setLogoFile)}
            />
          </Button>
          {logoFile && <Typography>{logoFile.name}</Typography>}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#B7201B',
            color: 'white',
            px: 4,
            py: 1,
            fontWeight: 'bold',
          }}
        >
          REGISTER
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterSeller;
