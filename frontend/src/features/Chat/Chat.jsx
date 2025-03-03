import React, { useEffect, useState } from 'react';
import { connectWebSocket, disconnectWebSocket, sendMessage } from '~/service/webSocketService';
import { useGetConversations, useGetMessages, useSendMessage } from '~/hooks/chatHook';
import { Box, TextField, IconButton, List, ListItem, Avatar, Badge, Paper, Stack, Typography } from '@mui/material';
import { Search, InsertEmoticon, AttachFile, Image, NoteAdd, Send } from '@mui/icons-material';
import { useAppStore } from '~/store/appStore';

export default function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const currentUserId = '5819bac8-d2f5-4879-a37a-dd15680909b2';
  const token = useAppStore((state) => state.auth.token);

  // React Query hooks
  const { data: conversations = [] } = useGetConversations(currentUserId);
  const { data: messages = [] } = useGetMessages(selectedConversation);
  const sortedMessages = [...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const sendMessageMutation = useSendMessage();

  useEffect(() => {
    if (selectedConversation) {
      const destination = `/rt-chat/conversations/${selectedConversation}`;
      connectWebSocket(token, destination, (message) => {
        const response = JSON.parse(message.body);
        sendMessageMutation.mutate({
          conversationId: selectedConversation,
          messageData: response.result
        });
      });
    }

    return () => {
      disconnectWebSocket();
    };
  }, [selectedConversation, token]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageData = {
      content: newMessage,
      senderId: currentUserId,
      timestamp: new Date().toISOString()
    };

    sendMessage(`/app/chat/${selectedConversation}`, messageData);
    sendMessageMutation.mutate({ conversationId: selectedConversation, messageData });
    setNewMessage('');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sidebar */}
      <Box sx={{ width: 360, borderRight: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Tìm theo tên"
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <Search />
                </IconButton>
              )
            }}
            variant="outlined"
            size="small"
          />
        </Box>

        <List>
          {conversations.map((chat) => (
            <ListItem
              key={chat.id}
              button
              onClick={() => setSelectedConversation(chat.id)}
              sx={{ '&:hover': { bgcolor: '#f5f5f5' }, py: 1 }}
            >
              <Avatar src={chat.avatar} />
              <Typography variant="body1">{chat.name}</Typography>
              <Badge badgeContent={chat.unread} color="error" />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
          {sortedMessages.map((msg, index) => (
            <Stack key={index} direction="row" spacing={1} justifyContent={msg.senderId === currentUserId ? 'flex-end' : 'flex-start'}>
              <Typography variant="body1" sx={{ bgcolor: msg.senderId === currentUserId ? '#1976d2' : '#e0e0e0', color: msg.senderId === currentUserId ? 'white' : 'black', p: 1, borderRadius: 2 }}>
                {msg.content}
              </Typography>
            </Stack>
          ))}
        </Box>

        {/* Input area */}
        <Paper sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton><InsertEmoticon /></IconButton>
            <IconButton><Image /></IconButton>
            <IconButton><AttachFile /></IconButton>
            <IconButton><NoteAdd /></IconButton>
            <TextField
              fullWidth
              placeholder="Nhập nội dung tin nhắn"
              size="small"
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={!selectedConversation}>
              <Send />
            </IconButton>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
