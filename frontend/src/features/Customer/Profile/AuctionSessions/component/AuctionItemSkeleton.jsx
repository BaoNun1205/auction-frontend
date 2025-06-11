import { Box, Tabs, Card, Container, Skeleton } from "@mui/material"
import { StyledTab } from "../style" // Assuming this is imported from the same location

const AuctionItemSkeleton = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Image skeleton */}
      <Skeleton
        variant="rectangular"
        sx={{
          width: { xs: "100%", sm: 300 },
          height: { xs: 200, sm: 220 },
        }}
        animation="wave"
      />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 3 }}>
        {/* Title skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "70%", mb: 2 }} animation="wave" />

        {/* Info chips skeleton */}
        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2, gap: 1 }}>
          <Skeleton variant="rounded" width={150} height={32} animation="wave" />
          <Skeleton variant="rounded" width={180} height={32} animation="wave" />
          <Skeleton variant="rounded" width={140} height={32} animation="wave" />
          <Skeleton variant="rounded" width={160} height={32} animation="wave" />
        </Box>

        {/* Action buttons skeleton */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Skeleton variant="circular" width={40} height={40} animation="wave" />
          <Skeleton variant="rounded" width={120} height={36} animation="wave" />
        </Box>
      </Box>
    </Card>
  )
}

const AuctionSessionsSkeleton = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Title skeletons */}
        <Skeleton variant="text" sx={{ fontSize: "2.5rem", width: "40%", mb: 1 }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1.2rem", width: "60%", mb: 3 }} animation="wave" />

        {/* Tabs skeleton */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={0}
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: "#B7201B",
              },
            }}
          >
            <StyledTab label="Đã đăng ký" />
            <StyledTab label="Đã tham gia" />
          </Tabs>
        </Box>

        {/* Auction items skeleton */}
        <Box sx={{ minHeight: "400px", maxHeight: "600px", overflowY: "auto" }}>
          <AuctionItemSkeleton />
          <AuctionItemSkeleton />
          <AuctionItemSkeleton />
        </Box>
      </Box>
    </Container>
  )
}

export default AuctionSessionsSkeleton
