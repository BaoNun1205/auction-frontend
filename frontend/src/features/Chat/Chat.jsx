import React from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Badge,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  Stack
} from '@mui/material'
import { Search, InsertEmoticon, AttachFile, Image, NoteAdd, Send, ThumbUp, ThumbDown } from '@mui/icons-material'

// Sample data
const conversations = [
  {
    id: 1,
    name: 'Aldo VietNam Official',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: '[Shop AI Assistant] Hi...',
    time: '15:44',
    unread: 0
  },
  {
    id: 2,
    name: 'TiNiPrinting Official',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'ok b',
    time: '16:02',
    unread: 1
  }
  // Add more sample conversations...
]

const questions = [
  'Sản phẩm này có miễn phí vận chuyển không?',
  'Sản phẩm này có sẵn không?',
  'Có thể thanh toán bằng COD được không?'
]

export default function ChatInterface() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Left sidebar */}
      <Box sx={{ width: 360, borderRight: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Tìm theo tê"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
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
              sx={{
                '&:hover': { bgcolor: '#f5f5f5' },
                py: 1
              }}
            >
              <ListItemAvatar>
                <Badge badgeContent={chat.unread} color="error">
                  <Avatar src={chat.avatar} />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                secondary={chat.lastMessage}
                secondaryTypographyProps={{ noWrap: true }}
              />
              <Typography variant="caption" color="text.secondary">
                {chat.time}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main chat area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Product card */}
        <Card sx={{ m: 2, display: 'flex', maxWidth: 600 }}>
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, objectFit: 'contain' }}
            image="/placeholder.svg?height=100&width=100"
            alt="Aldo handbag"
          />
          <CardContent>
            <Typography variant="h6">Túi xách tay nữ Aldo SURGOINE</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  ₫1.950.000
              </Typography>
              <Typography variant="body1" color="error">
                  ₫780.000 - ₫975.000
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Questions */}
        <Box sx={{ px: 2 }}>
          {questions.map((question, index) => (
            <Typography
              key={index}
              component="div"
              sx={{
                color: '#1976d2',
                mb: 1,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {question}
            </Typography>
          ))}
        </Box>

        {/* Chat messages */}
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
          <Box sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
            <Typography variant="body2">Được gửi bởi Trợ lý AI</Typography>
            <Typography variant="caption">15:44</Typography>
          </Box>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton size="small">
              <ThumbUp />
            </IconButton>
            <IconButton size="small">
              <ThumbDown />
            </IconButton>
          </Stack>
        </Box>

        {/* Input area */}
        <Paper sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton>
              <InsertEmoticon />
            </IconButton>
            <IconButton>
              <Image />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <NoteAdd />
            </IconButton>
            <TextField fullWidth placeholder="Nhập nội dung tin nhắn" size="small" multiline maxRows={4} />
            <IconButton color="primary">
              <Send />
            </IconButton>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

