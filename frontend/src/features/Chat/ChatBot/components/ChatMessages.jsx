import React from 'react'
import { Box, Stack, Avatar, Typography, CircularProgress } from '@mui/material'
import TypingIndicator from './TypingIndicator'
import chatBotLogo from '~/assets/images/logo/chatBotLogo.png'

export default function ChatMessages({
  sortedMessages,
  isLoadingMessages,
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Avatar src={chatBotLogo} sx={{ width: 24, height: 24, mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
              Lưu ý từ BidAI:
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'black', mt: 0.5 }}>
            BidAI là trợ lý ảo hỗ trợ thông tin và giải đáp thắc mắc về đấu giá. Vui lòng <strong>không chia sẻ thông tin cá nhân, tài khoản ngân hàng</strong> hay thực hiện bất kỳ <strong>giao dịch bên ngoài ứng dụng</strong>.
            <br />
              Nếu có điều gì không rõ hoặc cần tìm kiếm thông tin liên quan đến ứng dụng, bạn có thể hỏi BidAI bất kỳ lúc nào để được hỗ trợ nhanh chóng và chính xác.
            <Typography component="span" sx={{ color: '#43a047', fontWeight: 'bold', display: 'block', mt: 0.5 }}>
              🟢 Hỏi ngay: "Thông tin về các phiên đấu giá đang diễn ra?"
            </Typography>
          </Typography>

        </Box>
      ) : (
        <>
          {sortedMessages.map((msg, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                justifyContent={msg.role == 'user' ? 'flex-end' : 'flex-start'}
                sx={{ mb: 0.75 }}
              >
                {msg.role == 'assistant' && <Avatar src={chatBotLogo} sx={{ width: 28, height: 28 }} />}
                <Box
                  sx={{
                    bgcolor: msg.role == 'user' ? '#d7f7ef' : '#fff',
                    color: 'black',
                    p: 1.25,
                    borderRadius: 1.5,
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ wordBreak: 'break-word', fontSize: '0.875rem', width: '100%' }}
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />

                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem', fontWeight: 400, alignSelf: 'flex-end' }}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
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
                pl: '10px',
                mt: 0.5
              }}
            >
              BidAI đang trả lời...
            </Typography>
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </Box>
  )
}