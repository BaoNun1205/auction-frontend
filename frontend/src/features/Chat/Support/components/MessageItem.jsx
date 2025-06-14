import { Box, Stack, Avatar, Typography } from "@mui/material"

const MessageItem = ({ message, currentUserId, targetUserAvatar, isMobile = false, isTablet = false }) => {
  const senderId = message.sender?.userId || message.senderId
  const isCurrentUser = senderId === currentUserId

  return (
    <Stack
      direction="row"
      spacing={isMobile ? 0.5 : 1}
      justifyContent={isCurrentUser ? "flex-end" : "flex-start"}
      sx={{
        mb: isMobile ? 0.5 : 0.75,
        px: isMobile ? 0.5 : 0,
      }}
    >
      {!isCurrentUser && (
        <Avatar
          src={targetUserAvatar}
          sx={{
            width: isMobile ? 24 : isTablet ? 26 : 28,
            height: isMobile ? 24 : isTablet ? 26 : 28,
            alignSelf: "flex-end",
            mb: 0.5,
          }}
        />
      )}
      <Box
        sx={{
          bgcolor: isCurrentUser ? "#d7f7ef" : "#fff",
          color: "black",
          p: isMobile ? 1 : isTablet ? 1.125 : 1.25,
          borderRadius: isMobile ? 1.25 : 1.5,
          maxWidth: isMobile ? "85%" : isTablet ? "75%" : "70%",
          minWidth: isMobile ? "60px" : "80px",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 0.25 : 0.5,
          boxShadow: isMobile ? "0 1px 2px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.1)",
          border: isCurrentUser ? "none" : "1px solid #f0f0f0",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            wordBreak: "break-word",
            fontSize: isMobile ? "0.8rem" : isTablet ? "0.85rem" : "0.875rem",
            lineHeight: isMobile ? 1.3 : 1.4,
            width: "100%",
          }}
        >
          {message.content}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: isMobile ? "0.65rem" : "0.7rem",
            fontWeight: 400,
            alignSelf: "flex-end",
            mt: isMobile ? 0.25 : 0,
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Typography>
      </Box>
      {isCurrentUser && <Box sx={{ width: isMobile ? 24 : 28 }} />}
    </Stack>
  )
}

export default MessageItem
