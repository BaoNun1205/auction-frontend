import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, ChartLegend);

const ChartPage = () => {
  // Dữ liệu giả mở rộng thêm
  const duLieuLine = [
    { time: 'Th1', sessions: 12, deposits: 5000000, participants: 200 },
    { time: 'Th2', sessions: 15, deposits: 7000000, participants: 250 },
    { time: 'Th3', sessions: 13, deposits: 4500000, participants: 180 },
    { time: 'Th4', sessions: 20, deposits: 9000000, participants: 300 },
    { time: 'Th5', sessions: 18, deposits: 8000000, participants: 280 },
    { time: 'Th6', sessions: 17, deposits: 7500000, participants: 270 },
    { time: 'Th7', sessions: 22, deposits: 9500000, participants: 320 },
    { time: 'Th8', sessions: 25, deposits: 10000000, participants: 350 },
    { time: 'Th9', sessions: 19, deposits: 8800000, participants: 290 },
    { time: 'Th10', sessions: 21, deposits: 9200000, participants: 310 },
  ];

  // Định dạng giá trị thành tiền VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  // Dữ liệu cho Bar chart
  const duLieuBar = {
    labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10'],
    datasets: [
      {
        label: 'Tiền Cọc', // Đổi "Tiền Gửi" thành "Tiền Cọc"
        data: [5000000, 7000000, 4500000, 9000000, 8000000, 7500000, 9500000, 10000000, 8800000, 9200000], // Dữ liệu VND
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Tổng Quan Các Biểu Đồ Thống Kê
      </Typography>
      <Grid container spacing={3}>
        {/* Biểu đồ Line Chart 1 - Số Phiên Đấu Giá Theo Thời Gian */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Số Phiên Đấu Giá Theo Thời Gian</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={duLieuLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Tháng', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Số Phiên', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ Bar Chart - Tổng Quan Tiền Cọc */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Tổng Quan Tiền Cọc</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <Bar
                data={duLieuBar}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return formatCurrency(context.raw); // Hiển thị giá trị VND trên tooltip
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Tháng',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Tiền Cọc (VND)',
                      },
                      ticks: {
                        callback: function (value) {
                          return formatCurrency(value); // Hiển thị giá trị VND trên trục Y
                        },
                      },
                    },
                  },
                }}
              />
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ Line Chart 2 - Tổng Tiền Đấu Giá */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Tổng Tiền Đấu Giá</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={duLieuLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Tháng', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Tiền Đấu Giá (VND)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="deposits" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ Line Chart 3 - Sự Tham Gia Trong Các Phiên Đấu Giá */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '40px', height: '400px' }}>
            <Typography variant="h6">Sự Tham Gia Trong Các Phiên Đấu Giá</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={duLieuLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Tháng', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Số Người Tham Gia', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
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
