import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Chip,
  Divider,
  Paper
} from '@mui/material'
import {
  LocalShipping as TruckIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckIcon,
  Speed as SpeedIcon
} from '@mui/icons-material'
import { Loader } from '@googlemaps/js-api-loader'

const DeliveryTrackingDialog = ({ open, onClose, asset }) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [deliveryStartTime] = useState(new Date(Date.now() - 1000 * 60 * 30)) // Giả lập bắt đầu giao hàng 30 phút trước
  const [estimatedArrival, setEstimatedArrival] = useState(null)
  const [speed, setSpeed] = useState(35) // km/h

  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const directionsRendererRef = useRef(null)
  const markerRef = useRef(null)

  // Tọa độ giả lập
  const sellerLocation = { lat: 10.762622, lng: 106.660172 } // Quận 5, TP.HCM
  const buyerLocation = { lat: 10.841246, lng: 106.810526 } // Quận 9, TP.HCM
  const sellerAddress = '123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM'
  const buyerAddress = '456 Đường Lê Văn Việt, Quận 9, TP.HCM'

  // Các bước giao hàng
  const deliverySteps = [
    { label: 'Đã lấy hàng', time: formatTime(new Date(deliveryStartTime)), completed: true },
    {
      label: 'Đang vận chuyển',
      time: formatTime(new Date(deliveryStartTime.getTime() + 15 * 60 * 1000)),
      completed: true
    },
    {
      label: 'Đến kho phân loại',
      time: formatTime(new Date(deliveryStartTime.getTime() + 30 * 60 * 1000)),
      completed: false
    },
    { label: 'Đang giao hàng', time: 'Dự kiến', completed: false },
    { label: 'Đã giao hàng', time: 'Dự kiến', completed: false }
  ]

  function formatTime(date) {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  // Tải Google Maps API
  useEffect(() => {
    if (!open) return

    const loadMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg', // Đây là API key demo của Google, trong thực tế cần thay bằng API key thật
        version: 'weekly',
        libraries: ['places', 'geometry']
      })

      try {
        const google = await loader.load()
        setMapLoaded(true)
        initMap(google)
      } catch (error) {
        console.error('Error loading Google Maps API:', error)
      }
    }

    if (!mapLoaded) {
      loadMap()
    } else if (mapInstanceRef.current) {
      updateDeliveryStatus()
    }

    const interval = setInterval(updateDeliveryStatus, 1000)
    return () => clearInterval(interval)
  }, [open, mapLoaded])

  const initMap = (google) => {
    if (!mapRef.current) return

    // Khởi tạo bản đồ
    const mapOptions = {
      center: { lat: (sellerLocation.lat + buyerLocation.lat) / 2, lng: (sellerLocation.lng + buyerLocation.lng) / 2 },
      zoom: 12,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    }

    const map = new google.maps.Map(mapRef.current, mapOptions)
    mapInstanceRef.current = map

    // Khởi tạo DirectionsService và DirectionsRenderer
    const directionsService = new google.maps.DirectionsService()
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true, // Không hiển thị marker mặc định
      polylineOptions: {
        strokeColor: '#b41712',
        strokeWeight: 5,
        strokeOpacity: 0.7
      }
    })
    directionsRendererRef.current = directionsRenderer

    // Tạo marker cho người bán và người mua
    new google.maps.Marker({
      position: sellerLocation,
      map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40)
      },
      title: 'Người bán'
    })

    new google.maps.Marker({
      position: buyerLocation,
      map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new google.maps.Size(40, 40)
      },
      title: 'Người mua'
    })

    // Tạo marker cho xe giao hàng
    const deliveryMarker = new google.maps.Marker({
      map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/truck.png',
        scaledSize: new google.maps.Size(32, 32)
      },
      title: 'Xe giao hàng'
    })
    markerRef.current = deliveryMarker

    // Tính toán lộ trình
    const request = {
      origin: sellerLocation,
      destination: buyerLocation,
      travelMode: google.maps.TravelMode.DRIVING
    }

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result)

        // Lấy thông tin khoảng cách và thời gian
        const route = result.routes[0]
        const leg = route.legs[0]
        setDistance(leg.distance.text)
        setDuration(leg.duration.text)

        // Tính thời gian dự kiến đến nơi
        const durationInSeconds = leg.duration.value
        const estimatedTime = new Date(deliveryStartTime.getTime() + durationInSeconds * 1000)
        setEstimatedArrival(estimatedTime)

        // Cập nhật thời gian dự kiến cho các bước
        const totalTimeInMinutes = durationInSeconds / 60
        const step3Time = new Date(deliveryStartTime.getTime() + totalTimeInMinutes * 0.3 * 60 * 1000)
        const step4Time = new Date(deliveryStartTime.getTime() + totalTimeInMinutes * 0.6 * 60 * 1000)
        const step5Time = estimatedTime

        deliverySteps[2].time = formatTime(step3Time)
        deliverySteps[3].time = formatTime(step4Time)
        deliverySteps[4].time = formatTime(step5Time)

        // Cập nhật vị trí xe
        updateDeliveryStatus()
      } else {
        console.error('Directions request failed:', status)
      }
    })
  }

  const updateDeliveryStatus = () => {
    if (!mapInstanceRef.current || !directionsRendererRef.current || !markerRef.current) return

    const google = window.google
    if (!google) return

    const now = new Date()
    const elapsedTimeMs = now - deliveryStartTime

    // Lấy thông tin lộ trình
    const directions = directionsRendererRef.current.getDirections()
    if (!directions) return

    const route = directions.routes[0]
    const path = route.overview_path
    const totalDistance = route.legs[0].distance.value // meters
    const totalDuration = route.legs[0].duration.value // seconds

    // Tính toán tiến độ dựa trên thời gian đã trôi qua
    const progressPercent = Math.min((elapsedTimeMs / (totalDuration * 1000)) * 100, 100)
    setProgress(progressPercent)

    // Cập nhật bước hiện tại
    if (progressPercent < 30) {
      setCurrentStep(1)
      deliverySteps[1].completed = true
      deliverySteps[2].completed = false
    } else if (progressPercent < 60) {
      setCurrentStep(2)
      deliverySteps[1].completed = true
      deliverySteps[2].completed = true
      deliverySteps[3].completed = false
    } else if (progressPercent < 100) {
      setCurrentStep(3)
      deliverySteps[1].completed = true
      deliverySteps[2].completed = true
      deliverySteps[3].completed = true
      deliverySteps[4].completed = false
    } else {
      setCurrentStep(4)
      deliverySteps[1].completed = true
      deliverySteps[2].completed = true
      deliverySteps[3].completed = true
      deliverySteps[4].completed = true
    }

    // Tính toán vị trí hiện tại của xe dựa trên tiến độ
    if (progressPercent < 100) {
      // Tìm vị trí trên lộ trình dựa trên phần trăm hoàn thành
      const distanceCovered = (progressPercent / 100) * totalDistance
      let accumulatedDistance = 0
      let position = path[0]

      for (let i = 0; i < path.length - 1; i++) {
        const segment = google.maps.geometry.spherical.computeDistanceBetween(path[i], path[i + 1])
        if (accumulatedDistance + segment > distanceCovered) {
          // Tính toán vị trí chính xác trên đoạn đường này
          const ratio = (distanceCovered - accumulatedDistance) / segment
          position = google.maps.geometry.spherical.interpolate(path[i], path[i + 1], ratio)
          break
        }
        accumulatedDistance += segment
      }

      // Cập nhật vị trí xe
      markerRef.current.setPosition(position)
      setCurrentPosition(position)

      // Tính toán tốc độ hiện tại (giả lập)
      const speedVariation = Math.sin(Date.now() / 5000) * 5 // Thay đổi tốc độ +/- 5km/h
      setSpeed(Math.max(30, Math.min(45, 35 + speedVariation)))
    } else {
      // Đã đến nơi
      markerRef.current.setPosition(path[path.length - 1])
      setCurrentPosition(path[path.length - 1])
      setSpeed(0)
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          border: '1px solid rgba(180, 23, 18, 0.2)'
        }
      }}
    >
      <DialogTitle
        sx={{
          color: '#b41712',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pb: 1
        }}
      >
        <TruckIcon />
        Theo dõi giao hàng - {asset?.assetName}
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Thông tin đơn hàng */}
        <Paper sx={{ p: 2, mb: 3, backgroundColor: 'rgba(180, 23, 18, 0.05)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: '250px' }}>
              <Typography variant="h6" gutterBottom>
                Thông tin giao hàng
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <LocationIcon sx={{ color: '#b41712', mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Từ (Người bán):
                  </Typography>
                  <Typography variant="body2">{sellerAddress}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <LocationIcon sx={{ color: '#4caf50', mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Đến (Người mua):
                  </Typography>
                  <Typography variant="body2">{buyerAddress}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: '200px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  icon={<SpeedIcon />}
                  label={`${Math.round(speed)} km/h`}
                  color="primary"
                  sx={{ backgroundColor: speed > 0 ? '#b41712' : '#999' }}
                />
              </Box>
              {distance && (
                <Typography variant="body2">
                  <strong>Khoảng cách:</strong> {distance}
                </Typography>
              )}
              {duration && (
                <Typography variant="body2">
                  <strong>Thời gian dự kiến:</strong> {duration}
                </Typography>
              )}
              {estimatedArrival && (
                <Typography variant="body2">
                  <strong>Dự kiến đến:</strong> {formatTime(estimatedArrival)}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Google Maps */}
        <Box
          sx={{
            height: 350,
            mb: 3,
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid #ddd'
          }}
        >
          <Box
            ref={mapRef}
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
          {!mapLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.7)'
              }}
            >
              <Typography>Đang tải bản đồ...</Typography>
            </Box>
          )}
        </Box>

        {/* Thanh tiến trình */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Tiến trình giao hàng
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#b41712',
                borderRadius: 4
              }
            }}
          />
        </Box>

        {/* Lịch sử giao hàng */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScheduleIcon sx={{ color: '#b41712' }} />
          Lịch sử giao hàng
        </Typography>

        {deliverySteps.map((step, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ mr: 2 }}>
              {index <= currentStep ? (
                <CheckIcon sx={{ color: '#4caf50' }} />
              ) : (
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#ddd'
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: index <= currentStep ? 600 : 400,
                  color: index <= currentStep ? '#1a1a1a' : '#999'
                }}
              >
                {step.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {index <= currentStep ? step.time : 'Dự kiến ' + step.time}
              </Typography>
            </Box>
            {index === currentStep && (
              <Chip
                label="Hiện tại"
                size="small"
                sx={{
                  backgroundColor: '#b41712',
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              />
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            p: 2,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(76, 175, 80, 0.3)'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Lưu ý:</strong> Thời gian giao hàng có thể thay đổi tùy thuộc vào tình hình giao thông và thời tiết.
            Bạn sẽ nhận được thông báo khi đơn hàng được giao thành công.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: '#b41712',
            color: '#b41712',
            '&:hover': {
              borderColor: '#a01510',
              backgroundColor: 'rgba(180, 23, 18, 0.1)'
            }
          }}
        >
          Đóng
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#b41712',
            '&:hover': {
              backgroundColor: '#a01510'
            }
          }}
        >
          Liên hệ shipper
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeliveryTrackingDialog
