import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Avatar,
  Paper,
  Link,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGetUserById, useUpdateUser } from '~/hooks/userHook';
import { useAppStore } from '~/store/appStore';
import { StyledTextField } from './style';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
  marginTop: theme.spacing(4)
}));

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.text.primary
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const StyledSelect = styled(Select)(({ theme }) => ({
  bgcolor: theme.palette.primary.secondary,
  color: theme.palette.text.secondary,
  minWidth: 120,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.borderHover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.borderFocus
  }
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiRadio-root': {
    '&.Mui-checked': {
      color: '#b41712'
    }
  }
}));

const maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  const maskedName = name.slice(0, 2) + '*'.repeat(name.length - 2);
  return `${maskedName}@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) return '';
  return phone.slice(0, 2) + '*'.repeat(phone.length - 4) + phone.slice(-2);
};

const CustomerInformation = () => {
  const { auth } = useAppStore();
  const [gender, setGender] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/placeholder.svg?height=180&width=180');
  const [avatarFile, setAvatarFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState({
    year: '',
    month: '',
    day: ''
  });
  const [name, setName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { data: user } = useGetUserById(auth?.user?.id);

  // Update user data hook
  const { mutate: updateUser } = useUpdateUser();

  // Set the gender, avatar, name, and date of birth values based on the API data
  useEffect(() => {
    if (user?.gender) {
      setGender(user.gender);
    }
    if (user?.dateOfBirth) {
      const [year, month, day] = user.dateOfBirth.split('-');
      setDateOfBirth({ day: String(parseInt(day, 10)), month: String(parseInt(month, 10)), year });
    }
    if (user?.avatar) {
      setAvatarUrl(user.avatar);
    } else {
      setAvatarUrl('/placeholder.svg?height=180&width=180');
    }
    if (user?.name) {
      setName(user.name); // Load user name into state
    }
  }, [user]);

  // Generate arrays for day, month, year options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrorMessage('Kích thước file vượt quá 1MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrorMessage('Chỉ chấp nhận file JPEG hoặc PNG');
        return;
      }
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file); // Set the avatar file for upload
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value); // Update name when input changes
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', user?.password);
    formData.append('phone', user?.phone);
    formData.append('email', user?.email);
    formData.append('gender', gender);
    formData.append('dateOfBirth', `${dateOfBirth.year}-${String(dateOfBirth.month).padStart(2, '0')}-${String(dateOfBirth.day).padStart(2, '0')}`);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    // Call the updateUser function from the hook
    updateUser(
      { userId: auth?.user?.id, payload: formData },
      {
        onSuccess: () => {
          setSnackbar({ open: true, message: 'Cập nhật thông tin thành công', severity: 'success' });
        },
        onError: (error) => {
          console.error('Error updating user:', error);
          setSnackbar({ open: true, message: 'Cập nhật thông tin thất bại', severity: 'error' });
        }
      }
    );
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <StyledPaper elevation={0}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Hồ Sơ Của Tôi
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </Typography>

          <Box component="form" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên đăng nhập"
                  name="username"
                  value={user?.username}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Họ và tên"
                  value={name} // Use 'name' state for editing
                  onChange={handleChange} // Handle change to update 'name'
                  name="name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={maskEmail(user?.email)}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Link underline="none" href="/" sx={{ ml: 1, color: '#b41712' }}>
                          Thay Đổi
                        </Link>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={maskPhone(user?.phone)}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Link href="#" underline="none" sx={{ ml: 1, color: '#b41712' }}>
                          Thay Đổi
                        </Link>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <StyledFormLabel component="legend">Giới tính</StyledFormLabel>
                  <RadioGroup
                    row
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <StyledFormControlLabel value="MALE" control={<Radio />} label="Nam" />
                    <StyledFormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
                    <StyledFormControlLabel value="OTHER" control={<Radio />} label="Khác" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormLabel component="legend">Ngày sinh</FormLabel>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <StyledSelect
                      fullWidth
                      value={dateOfBirth.day}
                      onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Ngày</MenuItem>
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledSelect
                      fullWidth
                      value={dateOfBirth.month}
                      onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Tháng</MenuItem>
                      {months.map((month) => (
                        <MenuItem key={month} value={month}>{month}</MenuItem>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledSelect
                      fullWidth
                      value={dateOfBirth.year}
                      onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Năm</MenuItem>
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                      ))}
                    </StyledSelect>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 180, height: 180 }} src={avatarUrl} />
            <Button
              component="label"
              variant="outlined"
              sx={{ mt: 2, color: '#b41712', borderColor: '#b41712' }}
            >
              Chọn Ảnh
              <VisuallyHiddenInput type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} />
            </Button>
            {errorMessage && (
              <Typography color="error" variant="caption">
                {errorMessage}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Dung lượng file tối đa 1 MB
              <br />
              Định dạng: JPEG, PNG
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#b41712',
                color: 'white',
                px: 4,
                '&:hover': {
                  bgcolor: '#8B0000'
                }
              }}
              onClick={handleSave} // Trigger save on button click
            >
              Lưu
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledPaper>
  );
};

export default CustomerInformation;