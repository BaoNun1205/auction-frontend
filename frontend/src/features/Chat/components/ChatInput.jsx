import React from 'react'
import { Paper, Stack, IconButton, TextField } from '@mui/material'
import { InsertEmoticon, Image, AttachFile, NoteAdd, Send } from '@mui/icons-material'

export default function ChatInput({ newMessage, setNewMessage, handleSendMessage, selectedConversation }) {
  return (
    <Paper sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <IconButton size="small">
          <InsertEmoticon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <Image fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <AttachFile fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <NoteAdd fontSize="small" />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Nhập nội dung tin nhắn"
          size="small"
          multiline
          maxRows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
          sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.875rem' } }}
        />
        <IconButton
          color="primary"
          size="small"
          onClick={handleSendMessage}
          disabled={!selectedConversation || !newMessage.trim()}
          sx={{ color: '#b41712' }}
        >
          <Send fontSize="small" />
        </IconButton>
      </Stack>
    </Paper>
  )
}