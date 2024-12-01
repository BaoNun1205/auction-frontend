import React, { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Box,
  Tab,
  ListItemText,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  StyledBox,
  StyledTextField,
  StyledCheckbox,
  StyledButton,
  StyledTabs,
  StyledPopover,
  StyledListItem,
} from './style';
import { useCreateAddress } from '~/hooks/addressHook';  // Import useCreateAddress hook
import { useAppStore } from '~/store/appStore';

const API_URL = 'https://provinces.open-api.vn/api';

export default function AddressForm({ refresh, handleClose }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth } = useAppStore()
  const [formData, setFormData] = useState({
    userId: auth.user.id, 
    recipientName: '',
    phone: '',
    addressDetail: '',
  });

  const { mutate: createAddress, isLoading: isSubmitting, isError, error } = useCreateAddress();

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/p/`);
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
    setLoading(false);
  };

  const fetchDistricts = async (provinceCode) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/p/${provinceCode}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
    setLoading(false);
  };

  const fetchWards = async (districtCode) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/d/${districtCode}?depth=2`);
      const data = await response.json();
      setWards(data.wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
    setLoading(false);
  };

  const handleAddressClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddress = () => {
    setAnchorEl(null);
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province.name);
    setSelectedDistrict(''); // Reset district and ward when province is selected
    setSelectedWard('');
    fetchDistricts(province.code);
    setSelectedTab(1);

    // Update province in formData
    setFormData({
      ...formData,
      province: province.name,
    });
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district.name);
    setSelectedWard('');
    fetchWards(district.code);
    setSelectedTab(2);

    // Update district in formData
    setFormData({
      ...formData,
      district: district.name,
    });
  };

  const handleWardSelect = (ward) => {
    setSelectedWard(ward.name);
    handleCloseAddress();

    // Update ward in formData
    setFormData({
      ...formData,
      ward: ward.name,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const addressData = {
      ...formData,
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
    };

    console.log('Address Data:', addressData); // Check if the data is correct

    createAddress(addressData, {
      onSuccess: () => {
        refresh();
        handleClose()
      },
      onError: (error) => {
        console.error('Error creating address:', error);
      },
    });
  };

  const open = Boolean(anchorEl);

  return (
    <StyledBox component="form" onSubmit={handleFormSubmit}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Địa chỉ mới
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <StyledTextField
          fullWidth
          placeholder="Họ và tên"
          variant="outlined"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleInputChange}
        />
        <StyledTextField
          fullWidth
          placeholder="Số điện thoại"
          variant="outlined"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </Box>

      <StyledTextField
        fullWidth
        placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
        variant="outlined"
        onClick={handleAddressClick}
        value={`${selectedProvince}${selectedDistrict ? `, ${selectedDistrict}` : ''}${selectedWard ? `, ${selectedWard}` : ''}`}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <KeyboardArrowDownIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />

      <StyledPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseAddress}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <StyledTabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
            <Tab label="Tỉnh/Thành phố" />
            <Tab label="Quận/Huyện" disabled={!selectedProvince} />
            <Tab label="Phường/Xã" disabled={!selectedDistrict} />
          </StyledTabs>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {selectedTab === 0 && provinces.map((province) => (
                  <StyledListItem key={province.code} onClick={() => handleProvinceSelect(province)}>
                    <ListItemText primary={province.name} />
                  </StyledListItem>
                ))}
                {selectedTab === 1 && districts.map((district) => (
                  <StyledListItem key={district.code} onClick={() => handleDistrictSelect(district)}>
                    <ListItemText primary={district.name} />
                  </StyledListItem>
                ))}
                {selectedTab === 2 && wards.map((ward) => (
                  <StyledListItem key={ward.code} onClick={() => handleWardSelect(ward)}>
                    <ListItemText primary={ward.name} />
                  </StyledListItem>
                ))}
              </>
            )}
          </Box>
        </Box>
      </StyledPopover>

      <StyledTextField
        fullWidth
        placeholder="Địa chỉ cụ thể"
        variant="outlined"
        multiline
        rows={3}
        name="addressDetail"
        value={formData.addressDetail}
        onChange={handleInputChange}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <StyledCheckbox />
        <Typography sx={{ color: 'text.secondary' }}>
          Đặt làm địa chỉ mặc định
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <StyledButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Hoàn thành'}
        </StyledButton>
      </Box>
    </StyledBox>
  );
}
