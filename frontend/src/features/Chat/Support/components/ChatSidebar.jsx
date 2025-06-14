import React from 'react'
import { useMemo, useState } from 'react'
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Avatar,
  Typography,
  CircularProgress,
  Chip,
  useMediaQuery,
  useTheme,
  Badge,
  Drawer
} from '@mui/material'
import { Search, SupportAgent, Close } from '@mui/icons-material'

export default function ChatSidebar({
  conversations,
  isLoadingConversations,
  currentUserId,
  selectedConversation,
  setSelectedConversation,
  isMobileOpen = false,
  onMobileClose,
  formatCustomDate = (date) => new Date(date).toLocaleDateString()
}) {
  const [searchText, setSearchText] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'))

  // const filteredConversations = useMemo(() => {
  //   return conversations.filter((chat) => {
  //     const chatTargetUser = chat.seller.userId === currentUserId ? chat.buyer : chat.seller
  //     const targetName = chatTargetUser.name || chatTargetUser.username || ''
  //     return targetName.toLowerCase().includes(searchText.toLowerCase())
  //   })
  // }, [conversations, currentUserId, searchText])

  const filteredConversations = useMemo(() => {
    return conversations
      .filter((chat) => {
        const chatTargetUser = chat.seller.userId === currentUserId ? chat.buyer : chat.seller
        const targetName = chatTargetUser.name || chatTargetUser.username || ''
        return targetName.toLowerCase().includes(searchText.toLowerCase())
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }, [conversations, currentUserId, searchText])

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId)
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }

  const sidebarContent = (
    <Box
      sx={{
        width: isMobile ? '100vw' : isTablet ? 320 : isLaptop ? 360 : 400,
        height: '100%',
        borderRight: isMobile ? 'none' : 1,
        borderColor: 'divider',
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: isMobile ? 1 : isTablet ? 1.5 : 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: '#f8f9fa'
        }}
      >
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Hỗ trợ khách hàng
            </Typography>
            <IconButton onClick={onMobileClose} size="small">
              <Close />
            </IconButton>
          </Box>
        )}

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: isTablet ? 1.5 : 2 }}>
            <SupportAgent sx={{ color: '#2196f3', fontSize: isTablet ? 24 : 28 }} />
            <Typography
              variant={isTablet ? 'subtitle1' : 'h6'}
              sx={{
                fontWeight: 'bold',
                color: '#1976d2'
              }}
            >
              Hỗ trợ khách hàng ({filteredConversations.length})
            </Typography>
          </Box>
        )}

        <TextField
          fullWidth
          placeholder={isMobile ? 'Tìm kiếm...' : 'Tìm kiếm cuộc trò chuyện...'}
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
              borderRadius: 2,
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              bgcolor: 'white'
            }
          }}
        />
      </Box>

      {/* Conversations List */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: isMobile ? '4px' : '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '3px',
            '&:hover': { backgroundColor: '#9e9e9e' }
          }
        }}
      >
        {isLoadingConversations ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress size={isMobile ? 24 : 32} />
          </Box>
        ) : filteredConversations.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: isMobile ? '0.8rem' : undefined }}>
              {searchText ? 'Không tìm thấy cuộc trò chuyện nào' : 'Chưa có cuộc trò chuyện nào'}
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {filteredConversations.map((chat) => {
              const chatTargetUser = chat.seller.userId === currentUserId ? chat.buyer : chat.seller
              const isSelected = chat.conversationId === selectedConversation

              return (
                <ListItem
                  key={chat.conversationId}
                  button
                  onClick={() => handleConversationSelect(chat.conversationId)}
                  sx={{
                    '&:hover': { bgcolor: '#f5f5f5' },
                    py: isMobile ? 1.25 : isTablet ? 1.5 : 2,
                    px: isMobile ? 1 : isTablet ? 1.5 : 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: isMobile ? 1 : isTablet ? 1.5 : 2,
                    bgcolor: isSelected ? '#e3f2fd' : 'transparent',
                    borderLeft: isSelected ? '4px solid #2196f3' : '4px solid transparent',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    minHeight: isMobile ? 60 : 72
                  }}
                >
                  <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar
                      src={chatTargetUser.avatar}
                      sx={{
                        width: isMobile ? 36 : isTablet ? 40 : 48,
                        height: isMobile ? 36 : isTablet ? 40 : 48
                      }}
                    >
                      {chatTargetUser?.name?.charAt(0) || chatTargetUser?.username?.charAt(0)}
                    </Avatar>
                    {/* Online status indicator */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: isMobile ? 8 : 10,
                        height: isMobile ? 8 : 10,
                        bgcolor: '#4caf50',
                        borderRadius: '50%',
                        border: '2px solid white'
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography
                        variant={isMobile ? 'body2' : 'subtitle2'}
                        fontWeight={600}
                        noWrap
                        sx={{
                          flex: 1,
                          fontSize: isMobile ? '0.85rem' : undefined
                        }}
                      >
                        {chatTargetUser?.name || chatTargetUser.username}
                      </Typography>
                      {!isMobile && (
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ fontSize: isTablet ? '0.7rem' : '0.75rem' }}
                        >
                          {formatCustomDate(chat.updatedAt)}
                        </Typography>
                      )}
                    </Box>

                    {!isMobile && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        noWrap
                        sx={{
                          mb: 1,
                          fontSize: isTablet ? '0.8rem' : '0.875rem'
                        }}
                      >
                        {chat.lastMessage || 'Chưa có tin nhắn'}
                      </Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {!isMobile && (
                        <Chip
                          label="Khách hàng"
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: isTablet ? '0.7rem' : '0.75rem',
                            height: isTablet ? 18 : 20,
                            color: '#666',
                            borderColor: '#ddd'
                          }}
                        />
                      )}
                      {chat.unread > 0 && (
                        <Badge
                          badgeContent={chat.unread > 99 ? '99+' : chat.unread}
                          color="error"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: isMobile ? '0.65rem' : '0.7rem',
                              height: isMobile ? '14px' : '16px',
                              minWidth: isMobile ? '14px' : '16px',
                              fontWeight: 'bold',
                              marginRight: 2
                            }
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Mobile timestamp */}
                  {isMobile && (
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem' }}>
                        {formatCustomDate(chat.updatedAt)}
                      </Typography>
                    </Box>
                  )}
                </ListItem>
              )
            })}
          </List>
        )}
      </Box>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100vw'
          }
        }}
      >
        {sidebarContent}
      </Drawer>
    )
  }

  return sidebarContent
}
