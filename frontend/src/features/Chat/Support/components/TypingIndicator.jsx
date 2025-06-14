"use client"
import { Box, Typography, Avatar, useTheme, useMediaQuery } from "@mui/material"

const TypingIndicator = ({ targetUser }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 0.5 : 1,
        mb: isMobile ? 0.5 : 1,
        px: isMobile ? 0.5 : 0,
      }}
    >
      {targetUser && (
        <Avatar
          src={targetUser.avatar}
          sx={{
            width: isMobile ? 24 : isTablet ? 26 : 28,
            height: isMobile ? 24 : isTablet ? 26 : 28,
          }}
        >
          {targetUser.name?.charAt(0) || targetUser.username?.charAt(0)}
        </Avatar>
      )}
      <Box
        sx={{
          bgcolor: "#f0f0f0",
          borderRadius: isMobile ? 1.25 : 1.5,
          p: isMobile ? 1 : 1.25,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
          Đang nhập...
        </Typography>
        <Box sx={{ display: "flex", gap: 0.25 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: isMobile ? 4 : 5,
                height: isMobile ? 4 : 5,
                borderRadius: "50%",
                bgcolor: "#999",
                animation: "typing 1.4s infinite",
                animationDelay: `${i * 0.2}s`,
                "@keyframes typing": {
                  "0%, 60%, 100%": {
                    transform: "translateY(0)",
                    opacity: 0.5,
                  },
                  "30%": {
                    transform: "translateY(-8px)",
                    opacity: 1,
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default TypingIndicator
