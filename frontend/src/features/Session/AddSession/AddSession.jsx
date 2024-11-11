import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  MenuItem,
  Breadcrumbs,
  Link,
  Stack
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useCreateSession } from '~/hooks/sessionHook';
import { createSesion } from '~/api/session';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  typeSession: Yup.string().required('Session type is required'),
  assetId: Yup.string().required('Asset ID is required'),
  userId: Yup.string().required('User ID is required'),
  startTime: Yup.date().required('Start time is required'),
  endTime: Yup.date().required('End time is required').min(
    Yup.ref('startTime'),
    'End time must be after start time'
  ),
  startingBids: Yup.number().required('Starting bid is required').positive('Starting bid must be positive'),
  bidIncrement: Yup.number().required('Bid increment is required').positive('Bid increment must be positive'),
});

export default function CreateAuction() {
  const initialValues = {
    typeSession: '',
    assetId: '',
    userId: '',
    startTime: null,
    endTime: null,
    startingBids: '',
    bidIncrement: '',
  };

  const { mutate: createSession } = useCreateSession(); // Assuming you have this hook
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('typeSession', values.typeSession);
    formData.append('assetId', values.assetId);
    formData.append('userId', values.userId);
    formData.append('startTime', values.startTime.toISOString());
    formData.append('endTime', values.endTime.toISOString());
    formData.append('startingBids', values.startingBids);
    formData.append('bidIncrement', values.bidIncrement);

    console.log('formData', formData);

    createSession(formData, {
      onSuccess: (response) => {
        console.log('Success:', response);
        // navigate(`${BASE_PATHS.AUCTIONS}`);
      },
      onError: (error) => {
        console.error('Error:', error);
        setSubmitting(false);
      },
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Auction
        </Typography>
        
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/dashboard">
            Dashboard
          </Link>
          <Link underline="hover" color="inherit" href="/auctions">
            Auctions
          </Link>
          <Typography color="text.primary">Create</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Details
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Fill in the auction details below
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <Stack spacing={3}>
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="typeSession"
                    label="Session Type"
                    error={touched.typeSession && errors.typeSession}
                    helperText={touched.typeSession && errors.typeSession}
                  >
                    <MenuItem value="LIVE">Live Auction</MenuItem>
                    <MenuItem value="TIMED">Timed Auction</MenuItem>
                  </Field>
                  <Stack direction="row" spacing={2}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="assetId"
                      label="Asset ID"
                      error={touched.assetId && errors.assetId}
                      helperText={touched.assetId && errors.assetId}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="userId"
                      label="User ID"
                      error={touched.userId && errors.userId}
                      helperText={touched.userId && errors.userId}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Start Time"
                        value={values.startTime}
                        onChange={(newValue) => {
                          setFieldValue('startTime', newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={touched.startTime && errors.startTime}
                            helperText={touched.startTime && errors.startTime}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="End Time"
                        value={values.endTime}
                        onChange={(newValue) => {
                          setFieldValue('endTime', newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={touched.endTime && errors.endTime}
                            helperText={touched.endTime && errors.endTime}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="startingBids"
                      label="Starting Bid"
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                      error={touched.startingBids && errors.startingBids}
                      helperText={touched.startingBids && errors.startingBids}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="bidIncrement"
                      label="Bid Increment"
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                      error={touched.bidIncrement && errors.bidIncrement}
                      helperText={touched.bidIncrement && errors.bidIncrement}
                    />
                  </Stack>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Create Auction
                    </Button>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
}