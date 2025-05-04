import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Rating,
  Box,
  Stack,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { useCreateOrUpdateReview, useGetReviewBetweenUsers } from '~/hooks/reviewHook'
import { useAppStore } from '~/store/appStore'

// Styled components
const PrimaryColor = '#b41712'

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: PrimaryColor,
  color: 'white',
  '&:hover': {
    backgroundColor: '#92120e'
  },
  transition: 'all 0.2s'
}))

const DialogHeader = styled(Box)(({ theme }) => ({
  backgroundColor: PrimaryColor,
  padding: theme.spacing(3, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white'
}))

const ReviewFormDialog = ({ open, onClose, vendorId }) => {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(-1)
  const { auth } = useAppStore()

  const currentUserId = auth.user.id

  const { data: existingReview } = useGetReviewBetweenUsers(currentUserId, vendorId)
  const { mutate: submitReview, isPending } = useCreateOrUpdateReview()

  useEffect(() => {
    if (existingReview) {
      setReview(existingReview.comment || '')
      setRating(existingReview.rating || 0)
    } else {
      setReview('')
      setRating(0)
    }
  }, [existingReview])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentUserId || !vendorId) return

    submitReview(
      {
        reviewerId: currentUserId,
        revieweeId: vendorId,
        rating,
        comment: review
      },
      {
        onSuccess: () => {
          console.log('Đánh giá đã được gửi!')
          onClose?.()
        }
      }
    )
  }

  const labels = {
    1: 'Không hài lòng',
    2: 'Tạm được',
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Tuyệt vời'
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Đánh giá của bạn
            </Typography>
            <Typography variant="subtitle2">
              Hãy chia sẻ trải nghiệm của bạn
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogHeader>

        <DialogContent dividers>
          <Stack spacing={4}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                Xếp hạng của bạn
              </Typography>
              <Rating
                name="rating"
                value={rating}
                precision={1}
                size="large"
                onChange={(event, newValue) => setRating(newValue)}
                onChangeActive={(event, newHover) => setHover(newHover)}
                sx={{
                  '& .MuiRating-iconFilled': { color: '#faaf00' },
                  '& .MuiRating-iconHover': { color: '#faaf00' },
                  fontSize: '2rem'
                }}
              />
              <Box sx={{ height: 20, mt: 1 }}>
                {rating !== null && (
                  <Typography variant="body2" color="text.secondary">
                    {labels[hover !== -1 ? hover : rating]}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Box>
              <Typography variant="body2" color="text.secondary" fontWeight="medium" gutterBottom>
                Chi tiết đánh giá
              </Typography>
              <TextField
                placeholder="Chia sẻ trải nghiệm của bạn..."
                multiline
                rows={4}
                fullWidth
                value={review}
                onChange={(e) => setReview(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: PrimaryColor },
                    '&.Mui-focused fieldset': { borderColor: PrimaryColor }
                  }
                }}
              />
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" sx={{
            borderColor: PrimaryColor,
            color: PrimaryColor,
            '&:hover': {
              backgroundColor: '#f5f5f5',
              borderColor: PrimaryColor
            }
          }}>
            Hủy
          </Button>
          <PrimaryButton type="submit" variant="contained" disabled={rating === 0}>
            Gửi đánh giá
          </PrimaryButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ReviewFormDialog
