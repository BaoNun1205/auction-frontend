import React from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

const PersonalInformation = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h5" color="#B41712">
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Username/Email</Typography>
            <TextField fullWidth placeholder="nguyenA@gmail.com" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">First Name</Typography>
            <TextField fullWidth label="First Name" placeholder="Nguyen Van A" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Address</Typography>
            <TextField fullWidth placeholder="123 ...." />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Number</Typography>
            <TextField fullWidth placeholder="123 ..." />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Country</Typography>
            <TextField fullWidth placeholder="abc ..." />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">State/Province</Typography>
            <TextField fullWidth placeholder="abc ..." />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">City</Typography>
            <TextField fullWidth label="City" placeholder="abc ..." />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Payments</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Bank Name" placeholder="abc" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Bank Number" placeholder="0123456" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Bank Branch" placeholder="abc ..." />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              UPDATE
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PersonalInformation;
