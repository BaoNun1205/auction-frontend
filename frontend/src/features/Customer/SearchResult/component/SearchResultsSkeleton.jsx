import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Breadcrumbs,
  List,
  ListItem,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Card,
  CardContent,
  CardActions,
  Skeleton
} from '@mui/material'
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material'

function SearchResultsSkeleton() {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Breadcrumbs Skeleton */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Skeleton variant="text" width={80} height={20} />
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton variant="text" width={100} height={20} />
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Sidebar Skeleton */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                borderBottom: '2px solid #c41e3a',
                pb: 1,
                width: 'fit-content'
              }}
            >
              Danh mục
            </Typography>
            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
          </Box>

          {/* Categories Skeleton */}
          <List>
            {[...Array(4)].map((_, index) => (
              <Box key={index}>
                <ListItem>
                  <ListItemText primary={<Skeleton variant="text" width="70%" height={24} />} />
                  <Skeleton variant="circular" width={24} height={24} />
                </ListItem>
                {/* Subcategories skeleton for first category */}
                {index === 0 && (
                  <List component="div" disablePadding>
                    {[...Array(3)].map((_, subIndex) => (
                      <ListItem key={subIndex} sx={{ pl: 4 }}>
                        <ListItemText primary={<Skeleton variant="text" width="60%" height={20} />} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </List>

          {/* Status Filters Skeleton */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Trạng thái
          </Typography>
          <FormGroup>
            {[...Array(4)].map((_, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox disabled sx={{ opacity: 0.3 }} />}
                label={<Skeleton variant="text" width={80} height={20} />}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Main Content Skeleton */}
        <Grid item xs={12} md={9}>
          {/* Sort Controls Skeleton */}
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
          </Stack>

          {/* Results Grid Skeleton */}
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Image Skeleton */}
                  <Skeleton variant="rectangular" width="100%" height={200} />

                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Title Skeleton */}
                    <Skeleton variant="text" width="90%" height={28} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />

                    {/* Price Skeleton */}
                    <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />

                    {/* Time Skeleton */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                      <Skeleton variant="circular" width={16} height={16} sx={{ mr: 0.5 }} />
                      <Skeleton variant="text" width="80%" height={16} />
                    </Box>

                    {/* Status Skeleton */}
                    <Skeleton variant="text" width="50%" height={16} />
                  </CardContent>

                  <CardActions>
                    <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Skeleton */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Skeleton variant="rectangular" width={300} height={40} sx={{ borderRadius: 2 }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchResultsSkeleton
