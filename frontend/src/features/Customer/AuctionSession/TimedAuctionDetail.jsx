import React from 'react';
import { Button, Box, Typography, Container, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import SliderAuction from './components/SliderAuction';
import AssetDetail from './AssetDetail';

const auctionData = [
    {
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'Card 1',
        description: 'Info which directs to the other page.',
    },
    {
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'Card 2',
        description: 'Info which directs to the other page.',
    },
    {
        image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'Card 3',
        description: 'Info which directs to the other page.',
    },
    {
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'Card 4',
        description: 'Info which directs to the other page.',
    },
    {
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'Card 5',
        description: 'Info which directs to the other page.',
    },
    {
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'Card 7',
        description: 'Info which directs to the other page.',
    }
];

function SecretAuction() {
    return (
        <Box>
            <AssetDetail />
            <Container maxWidth="xl">
                <Box my={4}>
                    <Typography variant="h4" color="textSecondary" fontWeight="bold" mb={2}>Related Paintings</Typography>
                    <SliderAuction data={auctionData} />
                </Box>
                <Box my={4}>
                    <Typography variant="h4" color="textSecondary" fontWeight="bold" mb={2}>Related Searches</Typography>
                    <Box display="flex" gap={2}>
                        <Button variant="contained" color="primary" component={Link} to={''}>Auctions in Orlando</Button>
                        <Button variant="contained" color="primary" component={Link} to={''}>Auctions in Orlando</Button>
                        <Button variant="contained" color="primary" component={Link} to={''}>Auctions in Orlando</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default SecretAuction;