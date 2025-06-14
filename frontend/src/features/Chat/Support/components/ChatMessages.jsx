"use client"
import { Box, Stack, Avatar, Typography, CircularProgress, useTheme, useMediaQuery } from "@mui/material"
import TypingIndicator from "./TypingIndicator"

export default function ChatMessages({
  sortedMessages,
  isLoadingMessages,
  currentUserId,
  targetUser,
  user,
  isTyping,
  messagesEndRef,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      sx={{
        flex: 1,
        p: isMobile ? 1 : isTablet ? 1.25 : 1.5,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 0.25 : 0.5,
        "&::-webkit-scrollbar": {
          width: isMobile ? "4px" : "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#bdbdbd",
          borderRadius: "3px",
        },
      }}
    >
      {isLoadingMessages ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress size={isMobile ? 20 : 24} />
        </Box>
      ) : sortedMessages.length === 0 ? (
        <Box
          sx={{
            bgcolor: "#fff3e0",
            p: isMobile ? 1.5 : 2,
            borderRadius: 2,
            maxWidth: isMobile ? "95%" : "90%",
            alignSelf: "center",
            mt: 2,
            mx: isMobile ? 1 : 0,
          }}
        >
          <Typography
            variant={isMobile ? "caption" : "body2"}
            sx={{
              fontWeight: "bold",
              color: "#ff9800",
              fontSize: isMobile ? "0.75rem" : undefined,
            }}
          >
            LƯU Ý: BIDMASTER KHÔNG CHO PHÉP CÁC HÀNH VI: ĐẶT CỌC/CHUYỂN
          </Typography>
          <Typography
            variant={isMobile ? "caption" : "body2"}
            sx={{
              color: "black",
              mt: 0.5,
              fontSize: isMobile ? "0.7rem" : undefined,
              lineHeight: isMobile ? 1.3 : 1.4,
            }}
          >
            khoản riêng tiền cho người bán/Người giao dịch/CáC HOẠT động thông tuyển CTV/Tăng cấp qua miễn phí, ... Vui
            lòng chỉ đấu giá trực tiếp trên ứng dụng BidMaster để tránh nguy cơ bị lừa đảo nhé!{" "}
            <Typography
              component="span"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                fontSize: isMobile ? "0.7rem" : undefined,
              }}
            >
              Tìm hiểu thêm
            </Typography>
          </Typography>
        </Box>
      ) : (
        <>
          {sortedMessages.map((msg, index) => {
            const senderId = msg.sender?.userId || msg.senderId
            const senderAvatar = senderId === currentUserId ? user.avatar : targetUser?.avatar
            const isCurrentUser = senderId === currentUserId

            return (
              <Stack
                key={index}
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
                    src={senderAvatar}
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
                    {msg.content}
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
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Typography>
                </Box>
                {isCurrentUser && (
                  <Box sx={{ width: isMobile ? 24 : 28 }} /> // Spacer for alignment
                )}
              </Stack>
            )
          })}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </>
      )}
    </Box>
  )
}
