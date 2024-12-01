import React, { useEffect, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  Box,
  InputAdornment,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import viLocale from 'date-fns/locale/vi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isAfter, addHours } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateSession } from '~/hooks/sessionHook';
import { StyledDialog, StyledFormControl, primaryColor } from './style';

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Loại phiên đấu giá là bắt buộc'),
  startTime: Yup.date()
    .required('Thời gian bắt đầu là bắt buộc')
    .min(new Date(), 'Thời gian bắt đầu phải sau thời điểm hiện tại'),
  endTime: Yup.date()
    .required('Thời gian kết thúc là bắt buộc')
    .min(Yup.ref('startTime'), 'Thời gian kết thúc phải sau thời gian bắt đầu'),
  startingBid: Yup.number()
    .required('Giá khởi điểm là bắt buộc')
    .positive('Giá khởi điểm phải là số dương'),
  bidIncrement: Yup.number()
    .required('Bước giá là bắt buộc')
    .positive('Bước giá phải là số dương'),
  depositPrice: Yup.number()
    .required('Giá cọc là bắt buộc')
    .positive('Giá cọc phải là số dương')
    .max(Yup.ref('startingBid'), 'Giá cọc không được lớn hơn giá khởi điểm'),
});

const AuctionCreationDialog = ({ open, onClose, asset }) => {
  const { mutate: createSession } = useCreateSession();

  const [initialValues, setInitialValues] = useState({
    type: '',
    startTime: addHours(new Date(), 1),
    endTime: addHours(new Date(), 25),
    startingBid: '',
    bidIncrement: '',
    depositPrice: '',
  });

  useEffect(() => {
    if (asset) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        startingBid: asset.assetPrice || '',
      }));
    }
  }, [asset]);

  console.log('sessionData:', asset);

  const handleSubmit = (values, { setSubmitting }) => {
    const sessionData = {
      typeSession: values.type,
      assetId: asset.assetId,
      userId: asset?.vendor?.userId,
      startingBids: values.startingBid,
      bidIncrement: values.bidIncrement,
      depositAmount: values.depositPrice,
    };

    createSession(sessionData, {
      onSuccess: () => {
        setSubmitting(false);
        onClose();
      },
      onError: (error) => {
        console.error('Error creating session:', error);
        setSubmitting(false);
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}>
      <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Tạo Phiên Đấu Giá</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: 'inherit',
              padding: 0.5,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form noValidate>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <StyledFormControl fullWidth variant="outlined">
                    <InputLabel id="session-type-label">Loại phiên đấu giá *</InputLabel>
                    <Select
                      labelId="session-type-label"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Loại phiên đấu giá *"
                      error={touched.type && Boolean(errors.type)}
                    >
                      <MenuItem value="LIVE">Đấu giá trực tiếp</MenuItem>
                      <MenuItem value="TIMED">Đấu giá có thời hạn</MenuItem>
                    </Select>
                  </StyledFormControl>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="Thời gian bắt đầu"
                      value={values.startTime}
                      onChange={(newValue) => {
                        setFieldValue('startTime', newValue);
                        if (values.endTime && isAfter(values.endTime, newValue)) {
                          setFieldValue('endTime', addHours(newValue, 24));
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={touched.startTime && Boolean(errors.startTime)}
                          helperText={touched.startTime && errors.startTime}
                        />
                      )}
                      minDateTime={new Date()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="Thời gian kết thúc"
                      value={values.endTime}
                      onChange={(newValue) => setFieldValue('endTime', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={touched.endTime && Boolean(errors.endTime)}
                          helperText={touched.endTime && errors.endTime}
                        />
                      )}
                      minDateTime={values.startTime}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="startingBid"
                      label="Giá khởi điểm *"
                      fullWidth
                      type="number"
                      value={values.startingBid}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.startingBid && Boolean(errors.startingBid)}
                      helperText={touched.startingBid && errors.startingBid}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₫</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="bidIncrement"
                      label="Bước giá *"
                      fullWidth
                      type="number"
                      value={values.bidIncrement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bidIncrement && Boolean(errors.bidIncrement)}
                      helperText={touched.bidIncrement && errors.bidIncrement}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₫</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="depositPrice"
                      label="Giá cọc *"
                      fullWidth
                      type="number"
                      value={values.depositPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.depositPrice && Boolean(errors.depositPrice)}
                      helperText={touched.depositPrice && errors.depositPrice}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₫</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ padding: 3 }}>
                <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }}>
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    bgcolor: primaryColor,
                    '&:hover': {
                      bgcolor: '#8B0000',
                    },
                  }}
                >
                  Tạo Phiên Đấu Giá
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </StyledDialog>
    </LocalizationProvider>
  );
};

export default AuctionCreationDialog;