"use client"

import { useEffect, useRef } from "react"
import { Box, CircularProgress, useTheme, useMediaQuery } from "@mui/material"
import MessageItem from "./MessageItem"
import TypingIndicator from "./TypingIndicator"

const MessageList = ({ messages, currentUserId, targetUser, isLoading, isTyping }) => {
  const messagesEndRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress size={isMobile ? 20 : 24} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        flex: 1,
        p: isMobile ? 1 : isTablet ? 1.25 : 1.5,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: isMobile ? "4px" : "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#bdbdbd",
          borderRadius: "3px",
        },
      }}
    >
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          message={msg}
          currentUserId={currentUserId}
          targetUserAvatar={targetUser?.avatar}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      ))}
      {isTyping && <TypingIndicator targetUser={targetUser} />}
      <div ref={messagesEndRef} />
    </Box>
  )
}

export default MessageList
