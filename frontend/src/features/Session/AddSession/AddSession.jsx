import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextFieldComponent from '~/components/TextFieldComponent/TextFieldComponent';
import { StyledContainer, StyledHeaderBox, StyledInnerBox, StyledSubtitleBox, StyledTitleBox } from '~/features/style';
import { useCreateSession, useGetSessionById } from '~/hooks/sessionHook';
import { useGetAssetById } from '~/hooks/assetHook';

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

const AddSession = () => {
  const { id } = useParams();
  const { data: asset, error, isLoading } = useGetAssetById(id);
  const { mutate: createSession } = useCreateSession();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    typeSession: '',
    assetId: '',
    userId: '',
    startTime: null,
    endTime: null,
    startingBids: '',
    bidIncrement: '',
  });

  useEffect(() => {
    if (asset) {
      setInitialValues({
        assetId: asset.assetId || '',
        userId: asset.vendorId || '',
        startingBids: asset.assetPrice || '',
      });
    }
  }, [asset]);

  const handleSubmit = (values, { setSubmitting }) => {
    const sessionData = {
      typeSession: values.typeSession,
      assetId: values.assetId,
      userId: values.userId,
      startTime: values.startTime.toISOString(),
      endTime: values.endTime.toISOString(),
      startingBids: values.startingBids,
      bidIncrement: values.bidIncrement
    };

    createSession(sessionData, {
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
        <Typography color="error">Error fetching asset</Typography>
      </Box>
    );
  }

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Create</StyledTitleBox>
            <StyledSubtitleBox>
              Dashboard • Session • <Box component="span" sx={{ color: 'primary.disable' }}>Create</Box>
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
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                <Form noValidate>
                  <Stack direction="row" sx={{ my: 2 }}>
                    <Field
                      name="typeSession"
                      as={TextFieldComponent}
                      label="Session Type"
                      select
                      value={values.typeSession}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value="LIVE">Live Auction</MenuItem>
                      <MenuItem value="TIMED">Timed Auction</MenuItem>
                    </Field>
                  </Stack>
                  {/* <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                    <Field
                      name="assetId"
                      as={TextFieldComponent}
                      label="Asset ID"
                      value={values.assetId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                    />
                    <Field
                      name="userId"
                      as={TextFieldComponent}
                      label="User ID"
                      value={values.userId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                    />
                  </Stack> */}
                  <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        sx={{ width: '50%' }}
                        label="Start Time"
                        value={values.startTime}
                        onChange={(newValue) => setFieldValue('startTime', newValue)}
                        renderInput={(params) => (
                          <TextFieldComponent
                            {...params}
                            fullWidth
                            error={Boolean(values.startTime && values.endTime && values.endTime <= values.startTime)}
                            helperText={values.startTime && values.endTime && values.endTime <= values.startTime ? 'End time must be after start time' : ''}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        sx={{ width: '50%' }}
                        label="End Time"
                        value={values.endTime}
                        onChange={(newValue) => setFieldValue('endTime', newValue)}
                        renderInput={(params) => (
                          <TextFieldComponent
                            {...params}
                            fullWidth
                            error={Boolean(values.startTime && values.endTime && values.endTime <= values.startTime)}
                            helperText={values.startTime && values.endTime && values.endTime <= values.startTime ? 'End time must be after start time' : ''}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                    <Field
                      name="startingBids"
                      as={TextFieldComponent}
                      label="Starting Bid"
                      type="number"
                      value={values.startingBids}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                    />
                    <Field
                      name="bidIncrement"
                      as={TextFieldComponent}
                      label="Bid Increment"
                      type="number"
                      value={values.bidIncrement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: '50%' }}
                    />
                  </Stack>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{ width: '70%' }}
                    >
                      Create Session
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

export default AddSession;