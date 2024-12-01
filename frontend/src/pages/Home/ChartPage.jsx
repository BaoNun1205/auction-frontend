import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, ChartLegend);

const ChartPage = () => {
  // Dữ liệu giả trực tiếp trong App.js
  const duLieuLine = [
    { time: 'Th1', sessions: 12, deposits: 5000, participants: 200 },
    { time: 'Th2', sessions: 15, deposits: 7000, participants: 250 },
    { time: 'Th3', sessions: 13, deposits: 4500, participants: 180 },
    { time: 'Th4', sessions: 20, deposits: 9000, participants: 300 },
    { time: 'Th5', sessions: 18, deposits: 8000, participants: 280 },
  ];

  const duLieuBar = {
    labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5'],
    datasets: [
      {
        label: 'Tiền Gửi',
        data: [5000, 7000, 4500, 9000, 8000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center"></Typography>
      <Grid container spacing={3}>
        {/* Biểu đồ Line Chart 1 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Số Phiên Đấu Giá Theo Thời Gian</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={duLieuLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ Bar Chart 1 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Tổng Quan Tiền Gửi</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <Bar data={duLieuBar} options={{ responsive: true }} />
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ Line Chart 2 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Tổng Tiền Đấu Giá</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={duLieuLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="deposits" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ Line Chart 3 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Sự Tham Gia Trong Các Phiên Đấu Giá</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={duLieuLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="participants" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChartPage;
