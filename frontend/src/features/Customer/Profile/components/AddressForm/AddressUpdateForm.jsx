import React, { useState, useEffect } from 'react'
import { Typography, Box, TextField, Button, Stack, CircularProgress, InputAdornment, Popover, Tabs, Tab, ListItemText, ListItem, Checkbox, FormControlLabel, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useUpdateAddress } from '~/hooks/addressHook' // import the hook
import {
  StyledBox,
  StyledTextField,
  StyledCheckbox,
  StyledButton,
  StyledTabs,
  StyledPopover,
  StyledListItem
} from './style'

const API_URL = 'https://provinces.open-api.vn/api'

const AddressUpdateForm = ({ address, refresh, handleClose }) => {
  const [formData, setFormData] = useState({
    addressId: '',
    recipientName: '',
    phone: '',
    addressDetail: '',
    ward: '',
    district: '',
    province: '',
    isDefault: false
  })

  const [errors, setErrors] = useState({})
  const { mutate: updateAddress, isLoading, error } = useUpdateAddress()

  const [loading, setLoading] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (address) {
      setFormData({
        addressId: address.addressId,
        recipientName: address.recipientName,
        phone: address.phone,
        addressDetail: address.addressDetail,
        ward: address.ward,
        district: address.district,
        province: address.province,
        isDefault: address.isDefault
      })
      setSelectedProvince(address.province)
      setSelectedDistrict(address.district)
      setSelectedWard(address.ward)
    }
  }, [address])

  useEffect(() => {
    fetchProvinces()
  }, [])

  const fetchProvinces = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/p/`)
      const data = await response.json()
      setProvinces(data)
    } catch (error) {
      console.error('Error fetching provinces:', error)
    }
    setLoading(false)
  }

  const fetchDistricts = async (provinceCode) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/p/${provinceCode}?depth=2`)
      const data = await response.json()
      setDistricts(data.districts)
    } catch (error) {
      console.error('Error fetching districts:', error)
    }
    setLoading(false)
  }

  const fetchWards = async (districtCode) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/d/${districtCode}?depth=2`)
      const data = await response.json()
      setWards(data.wards)
    } catch (error) {
      console.error('Error fetching wards:', error)
    }
    setLoading(false)
  }

  const handleAddressClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleCloseAddress = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province.name)
    setSelectedDistrict('')
    setSelectedWard('')
    fetchDistricts(province.code)
    setSelectedTab(1)
  }

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district.name)
    setSelectedWard('')
    fetchWards(district.code)
    setSelectedTab(2)
  }

  const handleWardSelect = (ward) => {
    setSelectedWard(ward.name)
    handleCloseAddress()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleIsDefaultChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      isDefault: e.target.checked
    }))
  }

  const handleSubmit = () => {
    const newErrors = {}
    if (!formData.recipientName) newErrors.recipientName = 'Recipient name is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.addressDetail) newErrors.addressDetail = 'Address detail is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    updateAddress(
      {
        addressId: formData.addressId,
        payload: {
          ...formData,
          province: selectedProvince,
          district: selectedDistrict,
          ward: selectedWard
        }
      },
      {
        onSuccess: () => {
          refresh()
          handleClose()
        },
        onError: (error) => {
          console.error('Error updating address:', error)
        }
      }
    )
  }

  const getFullAddress = () => {
    const fullAddress = []
    if (selectedProvince) fullAddress.push(selectedProvince)
    if (selectedDistrict) fullAddress.push(selectedDistrict)
    if (selectedWard) fullAddress.push(selectedWard)
    return fullAddress.join(', ')
  }

  return (
    <StyledBox component="form" sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Cập nhật địa chỉ mới
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <StyledTextField
          label="Họ và tên"
          variant="outlined"
          value={formData.recipientName}
          name="recipientName"
          onChange={handleChange}
          error={Boolean(errors.recipientName)}
          helperText={errors.recipientName}
          sx={{ flex: 1 }} // This will make the input fields take equal width
        />
        <StyledTextField
          label="Số điện thoại"
          value={formData.phone}
          name="phone"
          onChange={handleChange}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          sx={{ flex: 1 }} // This will make the input fields take equal width
        />
      </Box>

      <StyledTextField
        fullWidth
        placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
        variant="outlined"
        value={getFullAddress()}
        onClick={handleAddressClick}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <KeyboardArrowDownIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {/* Address Popover */}
      <StyledPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseAddress}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
            <Tab label="Tỉnh/Thành phố" />
            <Tab label="Quận/Huyện" disabled={!selectedProvince} />
            <Tab label="Phường/Xã" disabled={!selectedDistrict} />
          </Tabs>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {selectedTab === 0 &&
                  provinces.map((province) => (
                    <ListItem key={province.code} onClick={() => handleProvinceSelect(province)}>
                      <ListItemText primary={province.name} />
                    </ListItem>
                  ))}
                {selectedTab === 1 &&
                  districts.map((district) => (
                    <ListItem key={district.code} onClick={() => handleDistrictSelect(district)}>
                      <ListItemText primary={district.name} />
                    </ListItem>
                  ))}
                {selectedTab === 2 &&
                  wards.map((ward) => (
                    <ListItem key={ward.code} onClick={() => handleWardSelect(ward)}>
                      <ListItemText primary={ward.name} />
                    </ListItem>
                  ))}
              </>
            )}
          </Box>
        </Box>
      </StyledPopover>

      <StyledTextField
        label="Địa chỉ cụ thể"
        variant="outlined"
        multiline
        rows={3}
        value={formData.addressDetail}
        name="addressDetail"
        onChange={handleChange}
        error={Boolean(errors.addressDetail)}
        helperText={errors.addressDetail}
        sx={{ width: '100%' }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <StyledCheckbox checked={formData.isDefault} onChange={handleIsDefaultChange} />
        <Typography sx={{ color: 'text.secondary' }}>
          Đặt làm địa chỉ mặc định
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{ width: 'auto', padding: '10px 20px' }}
        >
          {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
        </StyledButton>
      </Box>
    </StyledBox>
  )
}

export default AddressUpdateForm
