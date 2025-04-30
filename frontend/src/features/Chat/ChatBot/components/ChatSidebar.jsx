import React from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  Avatar,
  Typography,
  CircularProgress,
  Badge
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { formatCustomDate } from '~/utils/customTime'

export default function ChatSidebar({
  conversations,
  isLoadingConversations,
  selectedConversation,
  setSelectedConversation,
  handleNewChat
}) {
  return (
    <Box
      sx={{
        width: 220,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Nút New Chat */}
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={handleNewChat}
          fullWidth
          sx={{ fontSize: '0.75rem', textTransform: 'none', borderColor: '#b41712', bgcolor: 'white', color: '#b41712' }}
        >
          Tạo mới
        </Button>
      </Box>

      {/* Danh sách cuộc trò chuyện */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '2px' }
        }}
      >
        {isLoadingConversations ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : conversations.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Không có cuộc trò chuyện nào
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {conversations.map((chat) => (
              <ListItem
                key={chat.id}
                button
                onClick={() => setSelectedConversation(chat.id)}
                selected={selectedConversation === chat.id}
                sx={{
                  '&:hover': { bgcolor: '#f5f5f5' },
                  py: 1,
                  px: 2,
                  bgcolor: selectedConversation === chat.id ? '#e0e0e0' : 'inherit'
                }}
              >
                <Typography variant="body2" fontWeight={500} noWrap>
                  {chat.topic || 'Chưa đặt tiêu đề'}
                </Typography>
              </ListItem>
            ))}
          </List>

        )}
      </Box>
    </Box>
  )
}
