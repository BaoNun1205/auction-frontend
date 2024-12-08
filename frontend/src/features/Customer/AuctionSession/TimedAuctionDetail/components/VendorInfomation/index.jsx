import React from 'react'
import {
  Box,
  Typography,
  Button,
  Avatar
} from '@mui/material'
import { Message } from '@mui/icons-material'
import { Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const VendorInformation = ({ vendorId, isView = true }) => {
  const navigate = useNavigate()
  const sellerStats = [
    { label: 'Đánh Giá', value: '2,2tr' },
    { label: 'Tỉ Lệ Phản Hồi', value: '100%' },
    { label: 'Sản Phẩm', value: '36,5k' },
    { label: 'Thời Gian Phản Hồi', value: 'trong vài giờ' },
    { label: 'Tham Gia', value: '4 năm trước' },
    { label: 'Người Theo Dõi', value: '3,9tr' }
  ]
  return (
    <Box
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
      }}
    >
      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
        <Box display="flex" alignItems="flex-start" gap={3}>
          <Box position="relative">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: '2.5rem',
                bgcolor: '#f5f5f5',
                color: '#757575',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
          L
            </Avatar>
            <Box
              component="img"
              src="/shopee-mall-badge.png"
              alt="Shopee Mall"
              sx={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                height: 24,
                zIndex: 1
              }}
            />
          </Box>
          <Box flex={1}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 500,
                fontSize: '1.5rem',
                lineHeight: 1.2
              }}
            >
          LOVITO OFFICIAL STORE
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Online 9 Phút Trước
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<Message />}
                sx={{
                  bgcolor: '#b41712',
                  color: 'white',
                  px: 3,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#8B0000',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.12)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                CHAT
              </Button>
              {isView && (
                <Button
                  variant="outlined"
                  startIcon={<Store />}
                  sx={{
                    borderColor: 'rgba(0,0,0,0.12)',
                    color: 'text.primary',
                    px: 3,
                    py: 1,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: 'rgba(0,0,0,0.24)',
                      bgcolor: 'rgba(0,0,0,0.04)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onClick={() => navigate(`/store/${vendorId}`)}
                >
                XEM
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          sx={{
            '& > div': {
              borderLeft: '1px solid',
              borderColor: 'divider',
              '&:nth-of-type(3n+1)': {
                borderLeft: 'none'
              },
              '@media (max-width: 600px)': {
                '&:nth-of-type(2n+1)': {
                  borderLeft: 'none'
                }
              }
            }
          }}
        >
          {sellerStats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 calc(33.333% - 16px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {stat.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: stat.isHighlighted ? '#ee4d2d' : 'text.primary',
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default VendorInformation
