import React, { useMemo, useState } from 'react'
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Avatar,
  Badge,
  Typography,
  CircularProgress
} from '@mui/material'
import { Search } from '@mui/icons-material'

export default function ChatSidebar({
  conversations,
  isLoadingConversations,
  currentUserId,
  selectedConversation,
  setSelectedConversation,
  formatCustomDate
}) {

  const [searchText, setSearchText] = useState('')

  const filteredConversations = useMemo(() => {
    return conversations.filter((chat) => {
      const chatTargetUser = chat.seller.userId === currentUserId ? chat.buyer : chat.seller
      const targetName = chatTargetUser.name || chatTargetUser.username || ''
      return targetName.toLowerCase().includes(searchText.toLowerCase())
    })
  }, [conversations, currentUserId, searchText])

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
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="Tìm theo tên"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton size="small">
                <Search fontSize="small" />
              </IconButton>
            )
          }}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              fontSize: '0.875rem'
            }
          }}
        />
      </Box>
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
        ) : filteredConversations.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="body2" color="textSecondary">
      Không có cuộc trò chuyện nào
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {filteredConversations.map((chat) => {
              const chatTargetUser = chat.seller.userId === currentUserId ? chat.buyer : chat.seller
              return (
                <ListItem
                  key={chat.conversationId}
                  button
                  onClick={() => setSelectedConversation(chat.conversationId)}
                  sx={{ '&:hover': { bgcolor: '#f5f5f5' }, py: 1, display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <Avatar src={chatTargetUser.avatar} />
                  <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    <Typography variant="body2" fontWeight={500} noWrap>
                      {chatTargetUser?.name || chatTargetUser.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {chat.lastMessage}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center" gap={2}>
                    <Typography variant="caption" color="textSecondary">
                      {formatCustomDate(chat.time)}
                    </Typography>
                    <Badge
                      badgeContent={chat.unread}
                      color="error"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.5rem',
                          height: '10px',
                          minWidth: '10px',
                          padding: '0 4px'
                        }
                      }}
                    />
                  </Box>
                </ListItem>
              )
            })}
          </List>
        )}
      </Box>
    </Box>
  )
}