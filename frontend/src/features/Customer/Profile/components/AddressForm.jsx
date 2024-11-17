import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputAdornment,
  CircularProgress,
  Checkbox,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = 'https://provinces.open-api.vn/api';

export default function AddressForm() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [addressType, setAddressType] = useState('home');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province.name);
    setSelectedDistrict('');
    setSelectedWard('');
    fetchDistricts(province.code);
    setSelectedTab(1);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district.name);
    setSelectedWard('');
    fetchWards(district.code);
    setSelectedTab(2);
  };

  const handleWardSelect = (ward) => {
    setSelectedWard(ward.name);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', mt: 2, p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Địa chỉ mới
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Họ và tên"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
        />
        <TextField
          fullWidth
          placeholder="Số điện thoại"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
        />
      </Box>

      <TextField
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
        sx={{ mb: 2, bgcolor: 'background.paper' }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { width: anchorEl?.offsetWidth || 'auto' }
        }}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { minWidth: 0 },
              '& .Mui-selected': { color: '#f44336' },
              '& .MuiTabs-indicator': { bgcolor: '#f44336' }
            }}
          >
            <Tab label="Tỉnh/Thành phố" />
            <Tab label="Quận/Huyện" disabled={!selectedProvince} />
            <Tab label="Phường/Xã" disabled={!selectedDistrict} />
          </Tabs>
          <Box sx={{ 
            maxHeight: 300, 
            overflow: 'auto',
            '& .MuiListItem-root': {
              py: 1.5,
              '&:hover': {
                bgcolor: 'action.hover',
                cursor: 'pointer'
              }
            }
          }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {selectedTab === 0 && provinces.map((province) => (
                  <ListItem key={province.code} onClick={() => handleProvinceSelect(province)}>
                    <ListItemText primary={province.name} />
                  </ListItem>
                ))}
                {selectedTab === 1 && districts.map((district) => (
                  <ListItem key={district.code} onClick={() => handleDistrictSelect(district)}>
                    <ListItemText primary={district.name} />
                  </ListItem>
                ))}
                {selectedTab === 2 && wards.map((ward) => (
                  <ListItem key={ward.code} onClick={() => handleWardSelect(ward)}>
                    <ListItemText primary={ward.name} />
                  </ListItem>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Popover>

      <TextField
        fullWidth
        placeholder="Địa chỉ cụ thể"
        variant="outlined"
        multiline
        rows={3}
        sx={{ mb: 2, bgcolor: 'background.paper' }}
      />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Checkbox
            sx={{ 
                color: '#f44336',
                '&.Mui-checked': {
                color: '#f44336',
                }
            }} 
            />
            <Typography sx={{ color: 'text.secondary' }}>
            Đặt làm địa chỉ mặc định
            </Typography>
        </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined"
          sx={{ 
            color: 'text.primary',
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'text.primary',
            }
          }}
        >
          Trở Lại
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#f44336',
            '&:hover': {
              bgcolor: '#d32f2f',
            }
          }}
        >
          Hoàn thành
        </Button>
      </Box>
    </Paper>
  );
}