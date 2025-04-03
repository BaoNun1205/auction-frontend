// import React, { useEffect, useState, useCallback, useRef } from 'react'
// import { connectWebSocket, sendMessage } from '~/service/webSocketService'
// import { useGetConversations, useGetMessages } from '~/hooks/chatHook'
// import {
//   Box,
//   TextField,
//   IconButton,
//   List,
//   ListItem,
//   Avatar,
//   Badge,
//   Paper,
//   Stack,
//   Typography,
//   MenuItem,
//   Switch,
//   Divider,
//   Menu,
//   CircularProgress
// } from '@mui/material'
// import {
//   Search,
//   InsertEmoticon,
//   AttachFile,
//   Image,
//   NoteAdd,
//   Send,
//   Chat as ChatIcon,
//   KeyboardArrowDown,
//   ChevronRight
// } from '@mui/icons-material'
// import { useAppStore } from '~/store/appStore'
// import WelcomeScreen from './components/WelcomeScreen'
// import TypingIndicator from './components/TypingIndicator'

// function formatCustomDate(timestamp) {
//   const date = new Date(timestamp)
//   const now = new Date()

//   const diffTime = now - date
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

//   const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
//   const weekday = weekdays[date.getDay()]

//   const day = String(date.getDate()).padStart(2, '0')
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const year = date.getFullYear()
//   const currentYear = now.getFullYear()

//   const isToday = date.getDate() === now.getDate() &&
//                   date.getMonth() === now.getMonth() &&
//                   date.getFullYear() === now.getFullYear()

//   const yesterday = new Date(now)
//   yesterday.setDate(now.getDate() - 1)
//   const isYesterday = date.getDate() === yesterday.getDate() &&
//                      date.getMonth() === yesterday.getMonth() &&
//                      date.getFullYear() === yesterday.getFullYear()

//   if (isToday) {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
//   } else if (isYesterday) {
//     return 'Hôm qua'
//   } else if (diffDays > 0 && diffDays <= 3) {
//     return weekday
//   } else if (diffDays > 3 && year === currentYear) {
//     return `${day}/${month}`
//   } else {
//     return `${day}/${month}/${year}`
//   }
// }

// export default function ChatInterface() {
//   const [selectedConversation, setSelectedConversation] = useState(null)
//   const [newMessage, setNewMessage] = useState('')
//   const [liveMessages, setLiveMessages] = useState([])
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef(null)
//   const shopHeaderRef = useRef(null)
//   const user = useAppStore((state) => state.auth.user)
//   const currentUserId = user.id
//   const token = useAppStore((state) => state.auth.token)

//   const [shopMenuAnchorEl, setShopMenuAnchorEl] = useState(null)
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true)
//   const [localConversations, setLocalConversations] = useState([])

//   const { data: conversations = [], isLoading: isLoadingConversations } = useGetConversations(currentUserId)
//   const { data: messages = [], isLoading: isLoadingMessages } = useGetMessages(selectedConversation)
//   const sortedMessages = [...messages, ...liveMessages]
//     .filter((msg, index, self) => 
//       index === self.findIndex(m => m.timestamp === msg.timestamp && m.content === msg.content)
//     )
//     .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

//   // Đồng bộ conversations từ API với state cục bộ
//   useEffect(() => {
//     setLocalConversations(conversations)
//   }, [conversations])

//   const selectedConversationData = localConversations.find((c) => c.conversationId === selectedConversation)
//   const targetUser = selectedConversationData 
//     ? (selectedConversationData.seller.userId === currentUserId 
//       ? selectedConversationData.buyer 
//       : selectedConversationData.seller)
//     : null

//   const onMessage = useCallback(
//     (message) => {
//       const response = JSON.parse(message.body)
//       console.log('Received message:', response)
//       if (response.code === 200 && response.result) {
//         const messageData = response.result
//         if (messageData.content && messageData.sender && messageData.timestamp && messageData.conversationId) {
//           // Chỉ thêm tin nhắn vào liveMessages nếu đang ở conversation đó
//           if (messageData.conversationId === selectedConversation) {
//             setLiveMessages((prev) => {
//               const isDuplicate = prev.some(
//                 m => m.timestamp === messageData.timestamp && m.content === messageData.content
//               ) || messages.some(
//                 m => m.timestamp === messageData.timestamp && m.content === messageData.content
//               )
//               if (isDuplicate || messageData.sender.userId === currentUserId) {
//                 return prev
//               }
//               return [...prev, messageData]
//             })
//           }

//           // Cập nhật lastMessage và time trong conversations
//           setLocalConversations((prevConversations) => {
//             const existingConv = prevConversations.find(conv => conv.conversationId === messageData.conversationId)
//             if (existingConv) {
//               return prevConversations.map((conv) =>
//                 conv.conversationId === messageData.conversationId
//                   ? {
//                     ...conv,
//                     lastMessage: messageData.content,
//                     time: messageData.timestamp,
//                     unread: messageData.sender.userId !== currentUserId && conv.conversationId !== selectedConversation
//                       ? (conv.unread || 0) + 1
//                       : conv.unread
//                   }
//                   : conv
//               )
//             }
//             return prevConversations // Nếu conversation chưa tồn tại, giữ nguyên danh sách
//           })

//           if (messageData.sender.userId !== currentUserId && messageData.conversationId === selectedConversation) {
//             setIsTyping(false)
//           }
//         }
//       } else if (response.type === 'TYPING' && response.conversationId === selectedConversation) {
//         if (response.userId !== currentUserId) {
//           setIsTyping(true)
//           setTimeout(() => setIsTyping(false), 5000)
//         }
//       }
//     },
//     [currentUserId, selectedConversation, messages]
//   )

//   // Subscribe tất cả conversations khi load xong
//   useEffect(() => {
//     if (!isLoadingConversations && conversations.length > 0 && token) {
//       const destinations = conversations.map(conv => `/rt-chat/conversations/${conv.conversationId}`)
//       console.log('Subscribing to destinations:', destinations)
//       const cleanup = connectWebSocket(token, destinations, onMessage)

//       return () => {
//         if (typeof cleanup === 'function') {
//           cleanup()
//         }
//       }
//     }
//   }, [conversations, isLoadingConversations, token, onMessage])

//   // Reset liveMessages và unread count khi chọn conversation
//   useEffect(() => {
//     if (selectedConversation) {
//       setLiveMessages([])
//       setLocalConversations((prev) =>
//         prev.map((conv) =>
//           conv.conversationId === selectedConversation
//             ? { ...conv, unread: 0 }
//             : conv
//         )
//       )
//     }
//   }, [selectedConversation])

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [sortedMessages])

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const messageData = {
//       content: newMessage,
//       senderId: currentUserId,
//       timestamp: new Date().toISOString(),
//       conversationId: selectedConversation
//     }

//     sendMessage(`/app/rt-auction/conversations/${selectedConversation}`, messageData)
//     setLiveMessages((prev) => {
//       const isDuplicate = prev.some(
//         m => m.timestamp === messageData.timestamp && m.content === messageData.content
//       ) || messages.some(
//         m => m.timestamp === messageData.timestamp && m.content === messageData.content
//       )
//       if (isDuplicate) return prev
//       return [...prev, messageData]
//     })

//     // Cập nhật lastMessage và time khi gửi tin nhắn
//     setLocalConversations((prevConversations) =>
//       prevConversations.map((conv) =>
//         conv.conversationId === selectedConversation
//           ? {
//             ...conv,
//             lastMessage: messageData.content,
//             time: messageData.timestamp,
//             unread: 0
//           }
//           : conv
//       )
//     )

//     setNewMessage('')
//   }

//   const handleShopMenuOpen = (event) => {
//     setShopMenuAnchorEl(event.currentTarget)
//   }

//   const handleShopMenuClose = () => {
//     setShopMenuAnchorEl(null)
//   }

//   const handleNotificationToggle = () => {
//     setNotificationsEnabled(!notificationsEnabled)
//   }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         height: '100%',
//         bgcolor: '#f5f5f5',
//         overflow: 'hidden',
//         borderRadius: 1
//       }}
//     >
//       <Box
//         sx={{
//           width: 220,
//           borderRight: 1,
//           borderColor: 'divider',
//           bgcolor: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}
//       >
//         <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
//           <TextField
//             fullWidth
//             placeholder="Tìm theo tên"
//             InputProps={{
//               startAdornment: (
//                 <IconButton size="small">
//                   <Search fontSize="small" />
//                 </IconButton>
//               )
//             }}
//             variant="outlined"
//             size="small"
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 1,
//                 fontSize: '0.875rem'
//               }
//             }}
//           />
//         </Box>
//         <Box
//           sx={{
//             flex: 1,
//             overflowY: 'auto',
//             '&::-webkit-scrollbar': {
//               width: '4px'
//             },
//             '&::-webkit-scrollbar-thumb': {
//               backgroundColor: '#bdbdbd',
//               borderRadius: '2px'
//             }
//           }}
//         >
//           {isLoadingConversations ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//               <CircularProgress size={24} />
//             </Box>
//           ) : (
//             <List disablePadding>
//               {localConversations.map((chat) => {
//                 const chatTargetUser = chat.seller.userId === currentUserId ? chat.buyer : chat.seller
//                 return (
//                   <ListItem
//                     key={chat.conversationId}
//                     button
//                     onClick={() => {
//                       setSelectedConversation(chat.conversationId)
//                     }}
//                     sx={{ '&:hover': { bgcolor: '#f5f5f5' }, py: 1, display: 'flex', alignItems: 'center', gap: 2 }}
//                   >
//                     <Avatar src={chatTargetUser.avatar} />
//                     <Box sx={{ flex: 1, overflow: 'hidden' }}>
//                       <Typography variant="body2" fontWeight={500} noWrap>{chatTargetUser.name}</Typography>
//                       <Typography variant="body2" color="textSecondary" noWrap>{chat.lastMessage}</Typography>
//                     </Box>
//                     <Box
//                       display="flex"
//                       flexDirection="column"
//                       alignItems="flex-end"
//                       justifyContent="center"
//                       gap={2}
//                     >
//                       <Typography
//                         variant="caption"
//                         color="textSecondary"
//                       >{formatCustomDate(chat.time)}</Typography>
//                       <Badge
//                         badgeContent={chat.unread}
//                         color="error"
//                         sx={{
//                           '& .MuiBadge-badge': {
//                             fontSize: '0.5rem',
//                             height: '10px',
//                             minWidth: '10px',
//                             padding: '0 4px'
//                           }
//                         }}
//                       />
//                     </Box>
//                   </ListItem>
//                 )
//               })}
//             </List>
//           )}
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}
//       >
//         {!selectedConversation ? (
//           <WelcomeScreen />
//         ) : (
//           <>
//             <Box
//               sx={{
//                 p: 1.5,
//                 borderBottom: '1px solid #f0f0f0',
//                 backgroundColor: '#fff',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between'
//               }}
//             >
//               <Box
//                 ref={shopHeaderRef}
//                 sx={{
//                   display: 'flex',
//                   cursor: 'pointer',
//                   alignItems: 'center',
//                   gap: 0.5
//                 }}
//                 onClick={handleShopMenuOpen}
//               >
//                 <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//                   {targetUser?.name || 'Đang tải...'}
//                 </Typography>
//                 <KeyboardArrowDown fontSize="small" sx={{ color: '#757575' }} />
//               </Box>

//               <Menu
//                 anchorEl={shopMenuAnchorEl}
//                 open={Boolean(shopMenuAnchorEl)}
//                 onClose={handleShopMenuClose}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'left'
//                 }}
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'left'
//                 }}
//                 sx={{
//                   '& .MuiPaper-root': {
//                     width: 280,
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                     borderRadius: 1,
//                     mt: 0.5
//                   }
//                 }}
//                 MenuListProps={{
//                   sx: { padding: 0 }
//                 }}
//                 disablePortal
//               >
//                 <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
//                   <Avatar src={targetUser?.avatar} sx={{ width: 40, height: 40 }} />
//                   <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//                     {targetUser?.name || 'Đang tải...'}
//                   </Typography>
//                 </Box>

//                 <Divider />

//                 <MenuItem sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="body2">Tắt thông báo</Typography>
//                   <Switch
//                     size="small"
//                     checked={notificationsEnabled}
//                     onChange={handleNotificationToggle}
//                     sx={{
//                       '& .MuiSwitch-switchBase.Mui-checked': {
//                         color: '#b41712'
//                       },
//                       '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//                         backgroundColor: '#b41712'
//                       }
//                     }}
//                   />
//                 </MenuItem>

//                 <MenuItem sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="body2">Tố cáo người dùng</Typography>
//                   <ChevronRight fontSize="small" sx={{ color: '#757575' }} />
//                 </MenuItem>

//                 <MenuItem sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="body2">Xem thông tin cá nhân</Typography>
//                   <ChevronRight fontSize="small" sx={{ color: '#757575' }} />
//                 </MenuItem>
//               </Menu>
//             </Box>

//             <Box
//               sx={{
//                 flex: 1,
//                 p: 1.5,
//                 overflowY: 'auto',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 0.5,
//                 '&::-webkit-scrollbar': {
//                   width: '6px'
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   backgroundColor: '#bdbdbd',
//                   borderRadius: '3px'
//                 }
//               }}
//             >
//               {isLoadingMessages ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//                   <CircularProgress size={24} />
//                 </Box>
//               ) : (
//                 <>
//                   {sortedMessages.map((msg, index) => {
//                     const senderId = msg.sender?.userId || msg.senderId
//                     const senderAvatar = senderId === currentUserId ? user.avatar : targetUser?.avatar
//                     return (
//                       <Stack
//                         key={index}
//                         direction="row"
//                         spacing={1}
//                         justifyContent={senderId === currentUserId ? 'flex-end' : 'flex-start'}
//                         sx={{ mb: 0.75 }}
//                       >
//                         {senderId !== currentUserId && <Avatar src={senderAvatar} sx={{ width: 28, height: 28 }} />}
//                         <Box
//                           sx={{
//                             bgcolor: senderId === currentUserId ? '#d7f7ef' : '#fff',
//                             color: 'black',
//                             p: 1.25,
//                             borderRadius: 1.5,
//                             maxWidth: '70%',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: 0.5
//                           }}
//                         >
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               wordBreak: 'break-word',
//                               fontSize: '0.875rem',
//                               width: '100%'
//                             }}
//                           >
//                             {msg.content}
//                           </Typography>
//                           <Typography
//                             variant="caption"
//                             sx={{
//                               color: 'rgba(0, 0, 0, 0.6)',
//                               fontSize: '0.7rem',
//                               fontWeight: 400,
//                               alignSelf: 'flex-end'
//                             }}
//                           >
//                             {formatCustomDate(msg.timestamp)}
//                           </Typography>
//                         </Box>
//                       </Stack>
//                     )
//                   })}
//                   {isTyping && <TypingIndicator />}
//                   <div ref={messagesEndRef} />
//                 </>
//               )}
//             </Box>

//             <Paper sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
//               <Stack direction="row" spacing={0.5} alignItems="center">
//                 <IconButton size="small">
//                   <InsertEmoticon fontSize="small" />
//                 </IconButton>
//                 <IconButton size="small">
//                   <Image fontSize="small" />
//                 </IconButton>
//                 <IconButton size="small">
//                   <AttachFile fontSize="small" />
//                 </IconButton>
//                 <IconButton size="small">
//                   <NoteAdd fontSize="small" />
//                 </IconButton>
//                 <TextField
//                   fullWidth
//                   placeholder="Nhập nội dung tin nhắn"
//                   size="small"
//                   multiline
//                   maxRows={3}
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter' && !e.shiftKey) {
//                       e.preventDefault()
//                       handleSendMessage()
//                     }
//                   }}
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       fontSize: '0.875rem'
//                     }
//                   }}
//                 />
//                 <IconButton
//                   color="primary"
//                   size="small"
//                   onClick={handleSendMessage}
//                   disabled={!selectedConversation || !newMessage.trim()}
//                   sx={{ color: '#b41712' }}
//                 >
//                   <Send fontSize="small" />
//                 </IconButton>
//               </Stack>
//             </Paper>
//           </>
//         )}
//       </Box>
//     </Box>
//   )
// }

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connectWebSocket, sendMessage } from '~/service/webSocketService'
import { useGetConversations, useGetMessages } from '~/hooks/chatHook'
import { Box } from '@mui/material'
import { useAppStore } from '~/store/appStore'
import ChatSidebar from './components/ChatSidebar'
import WelcomeScreen from './components/WelcomeScreen'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'

function formatCustomDate(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffTime = now - date
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  const weekday = weekdays[date.getDay()]
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const currentYear = now.getFullYear()
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()

  if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  if (isYesterday) return 'Hôm qua'
  if (diffDays > 0 && diffDays <= 3) return weekday
  if (diffDays > 3 && year === currentYear) return `${day}/${month}`
  return `${day}/${month}/${year}`
}

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [liveMessages, setLiveMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [shopMenuAnchorEl, setShopMenuAnchorEl] = useState(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [localConversations, setLocalConversations] = useState([])
  const messagesEndRef = useRef(null)

  const user = useAppStore((state) => state.auth.user)
  const currentUserId = user.id
  const token = useAppStore((state) => state.auth.token)
  const { data: conversations = [], isLoading: isLoadingConversations } = useGetConversations(currentUserId)
  const { data: messages = [], isLoading: isLoadingMessages } = useGetMessages(selectedConversation)

  const sortedMessages = [...messages, ...liveMessages]
    .filter((msg, index, self) => index === self.findIndex(m => m.timestamp === msg.timestamp && m.content === msg.content))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  useEffect(() => setLocalConversations(conversations), [conversations])

  const selectedConversationData = localConversations.find((c) => c.conversationId === selectedConversation)
  const targetUser = selectedConversationData 
    ? (selectedConversationData.seller.userId === currentUserId ? selectedConversationData.buyer : selectedConversationData.seller)
    : null

  const onMessage = useCallback(
    (message) => {
      const response = JSON.parse(message.body)
      if (response.code === 200 && response.result) {
        const messageData = response.result
        if (messageData.content && messageData.sender && messageData.timestamp && messageData.conversationId) {
          if (messageData.conversationId === selectedConversation) {
            setLiveMessages((prev) => {
              const isDuplicate = prev.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content) ||
                messages.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content)
              if (isDuplicate || messageData.sender.userId === currentUserId) return prev
              return [...prev, messageData]
            })
          }
          setLocalConversations((prevConversations) => {
            const existingConv = prevConversations.find(conv => conv.conversationId === messageData.conversationId)
            if (existingConv) {
              return prevConversations.map((conv) =>
                conv.conversationId === messageData.conversationId
                  ? {
                    ...conv,
                    lastMessage: messageData.content,
                    time: messageData.timestamp,
                    unread: messageData.sender.userId !== currentUserId && conv.conversationId !== selectedConversation
                      ? (conv.unread || 0) + 1 : conv.unread
                  }
                  : conv
              )
            }
            return prevConversations
          })
          if (messageData.sender.userId !== currentUserId && messageData.conversationId === selectedConversation) {
            setIsTyping(false)
          }
        }
      } else if (response.type === 'TYPING' && response.conversationId === selectedConversation) {
        if (response.userId !== currentUserId) {
          setIsTyping(true)
          setTimeout(() => setIsTyping(false), 5000)
        }
      }
    },
    [currentUserId, selectedConversation, messages]
  )

  useEffect(() => {
    if (!isLoadingConversations && conversations.length > 0 && token) {
      const destinations = conversations.map(conv => `/rt-chat/conversations/${conv.conversationId}`)
      const cleanup = connectWebSocket(token, destinations, onMessage)
      return () => typeof cleanup === 'function' && cleanup()
    }
  }, [conversations, isLoadingConversations, token, onMessage])

  useEffect(() => {
    if (selectedConversation) {
      setLiveMessages([])
      setLocalConversations((prev) =>
        prev.map((conv) => conv.conversationId === selectedConversation ? { ...conv, unread: 0 } : conv)
      )
    }
  }, [selectedConversation])

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [sortedMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return
    const messageData = {
      content: newMessage,
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      conversationId: selectedConversation
    }
    sendMessage(`/app/rt-auction/conversations/${selectedConversation}`, messageData)
    setLiveMessages((prev) => {
      const isDuplicate = prev.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content) ||
        messages.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content)
      if (isDuplicate) return prev
      return [...prev, messageData]
    })
    setLocalConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.conversationId === selectedConversation
          ? { ...conv, lastMessage: messageData.content, time: messageData.timestamp, unread: 0 }
          : conv
      )
    )
    setNewMessage('')
  }

  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: '#f5f5f5', overflow: 'hidden', borderRadius: 1 }}>
      <ChatSidebar
        conversations={localConversations}
        isLoadingConversations={isLoadingConversations}
        currentUserId={currentUserId}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        formatCustomDate={formatCustomDate}
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {!selectedConversation ? (
          <WelcomeScreen />
        ) : (
          <>
            <ChatHeader
              targetUser={targetUser}
              shopMenuAnchorEl={shopMenuAnchorEl}
              setShopMenuAnchorEl={setShopMenuAnchorEl}
              notificationsEnabled={notificationsEnabled}
              setNotificationsEnabled={setNotificationsEnabled}
            />
            <ChatMessages
              sortedMessages={sortedMessages}
              isLoadingMessages={isLoadingMessages}
              currentUserId={currentUserId}
              targetUser={targetUser}
              user={user}
              formatCustomDate={formatCustomDate}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              selectedConversation={selectedConversation}
            />
          </>
        )}
      </Box>
    </Box>
  )
}