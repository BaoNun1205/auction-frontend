import React from 'react';
import { ImHammer2 } from 'react-icons/im';
import { Box, Typography, Divider } from '@mui/material';
import CurrentAuctionItem from './components/CurrentAuctionItem';

const CurrentAuctions = () => {
    const items = [
        {
            type: "The auction is currently ongoing",
            date: "10/07/2024",
            time: "10:00 AM",
            image: "",
            name: "1.07 carat heart-shaped loose diamond certified IGI VS1",
            startbid: 100,
        },
        {
            type: "The auction is currently ongoing",
            date: "11/07/2024",
            time: "11:00 AM",
            image: "",
            name: "Antique gold necklace, 18k, Victorian era",
            startbid: 200,
        },
        {
            type: "The auction is currently ongoing",
            date: "12/07/2024",
            time: "1:00 PM",
            image: "",
            name: "Luxury vintage watch, limited edition 1952",
            startbid: 150,
        },
        {
            type: "The auction is currently ongoing",
            date: "13/07/2024",
            time: "2:00 PM",
            image: "",
            name: "Oil painting by renowned artist, framed",
            startbid: 300,
        },
        {
            type: "The auction is currently ongoing",
            date: "14/07/2024",
            time: "3:00 PM",
            image: "",
            name: "Rare porcelain vase, Qing dynasty",
            startbid: 400,
        },
        {
            type: "The auction is currently ongoing",
            date: "15/07/2024",
            time: "4:00 PM",
            image: "",
            name: "Handcrafted Persian rug, 12x15 ft",
            startbid: 500,
        },
        {
            type: "The auction is currently ongoing",
            date: "16/07/2024",
            time: "5:00 PM",
            image: "",
            name: "Sculpture by famous modern artist",
            startbid: 350,
        },
        {
            type: "The auction is currently ongoing",
            date: "17/07/2024",
            time: "6:00 PM",
            image: "",
            name: "Vintage car model 1968, mint condition",
            startbid: 1000,
        },
        {
            type: "The auction is currently ongoing",
            date: "18/07/2024",
            time: "7:00 PM",
            image: "",
            name: "Rare gemstone collection, assorted types",
            startbid: 600,
        },
        {
            type: "The auction is currently ongoing",
            date: "19/07/2024",
            time: "8:00 PM",
            image: "",
            name: "Luxury handbag, limited edition 2022",
            startbid: 250,
        },
        {
            type: "The auction is currently ongoing",
            date: "20/07/2024",
            time: "9:00 PM",
            image: "",
            name: "Historical document signed by famous figure",
            startbid: 750,
        },
        {
            type: "The auction is currently ongoing",
            date: "21/07/2024",
            time: "10:00 PM",
            image: "",
            name: "Classic furniture set, antique collection",
            startbid: 1200,
        },
    ];    

  return (
    <Box textAlign="center" my={4} mx={5}>
      <Typography variant="h4" color="primary" fontWeight="bold">Current Auctioned Products</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
        <ImHammer2 size={32} className="text-mainBgColor" />
        <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
      </Box>
      <CurrentAuctionItem items={items} />
    </Box>
  );
}

export default CurrentAuctions;