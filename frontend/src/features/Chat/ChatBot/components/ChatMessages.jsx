import React from 'react'
import { Box, Stack, Avatar, Typography, CircularProgress } from '@mui/material'
import TypingIndicator from './TypingIndicator'

export default function ChatMessages({
  sortedMessages,
  isLoadingMessages,
  currentUserId,
  targetUser,
  user,
  isTyping,
  messagesEndRef
}) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 1.5,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '3px' }
      }}
    >
      {isLoadingMessages ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : sortedMessages.length === 0 ? (
        <Box
          sx={{
            bgcolor: '#fff3e0',
            p: 2,
            borderRadius: 2,
            maxWidth: '90%',
            alignSelf: 'center',
            mt: 2
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
            LƯU Ý: BIDMASTER KHÔNG CHO PHÉP CÁC HÀNH VI: ĐẶT CỌC/CHUYỂN
          </Typography>
          <Typography variant="body2" sx={{ color: 'black', mt: 0.5 }}>
            khoản riêng tiền cho người bán/Người giao dịch/CáC HOẠT động thông tuyển CTV/Tăng
            cấp qua miễn phí, ... Vui lòng chỉ đấu giá trực tiếp trên ứng dụng BidMaster để tránh nguy cơ bị lừa đảo nhé!{' '}
            <Typography component="span" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Tìm hiểu thêm
            </Typography>
          </Typography>
        </Box>
      ) : (
        <>
          {sortedMessages.map((msg, index) => {
            const senderId = msg.sender?.userId || msg.senderId
            const senderAvatar = senderId === currentUserId ? user.avatar : targetUser?.avatar
            return (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                justifyContent={senderId === currentUserId ? 'flex-end' : 'flex-start'}
                sx={{ mb: 0.75 }}
              >
                {senderId !== currentUserId && <Avatar src={senderAvatar} sx={{ width: 28, height: 28 }} />}
                <Box
                  sx={{
                    bgcolor: senderId === currentUserId ? '#d7f7ef' : '#fff',
                    color: 'black',
                    p: 1.25,
                    borderRadius: 1.5,
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5
                  }}
                >
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', fontSize: '0.875rem', width: '100%' }}>
                    {msg.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem', fontWeight: 400, alignSelf: 'flex-end' }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </Typography>
                </Box>
              </Stack>
            )
          })}
          {isTyping && (
            <Typography
              variant="body2"
              sx={{
                fontStyle: 'italic',
                color: 'gray',
                pl: '40px',
                mt: 0.5
              }}
            >
              {targetUser?.name || 'Hệ thống'} đang trả lời...
            </Typography>
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </Box>
  )
}