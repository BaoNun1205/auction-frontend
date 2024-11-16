import React from 'react';
import { Button, Box, Card, CardContent, CardMedia, Typography, Container, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SliderAuction({ data }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    if (currentIndex > data.length - 3) {
        setCurrentIndex(0);
    }

    return (
        <Container sx={{ mt: 2, maxWidth: 'xl' }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ position: 'relative' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {data.slice(currentIndex, currentIndex + 3).map((card, index) => (
                            <motion.div
                                key={index}
                                style={{ flex: '1 1 30%', padding: '16px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                initial={{ opacity: 0, x: index === 0 ? -100 : index === 1 ? 0 : 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={card.image}
                                        alt="Card"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">{card.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, position: 'relative', bottom: '44px' }}>
                        <IconButton onClick={handlePrev} sx={{ backgroundColor: 'gray.300', '&:hover': { backgroundColor: 'gray.400' } }}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton onClick={handleNext} sx={{ backgroundColor: 'gray.300', '&:hover': { backgroundColor: 'gray.400' } }}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default SliderAuction;