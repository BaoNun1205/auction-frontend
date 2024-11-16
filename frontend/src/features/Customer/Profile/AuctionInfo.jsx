import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Chip,
  Container,
  styled 
} from '@mui/material';
import { LocationOn, Public } from '@mui/icons-material';

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: '#B7201B',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: '#B7201B',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&.Mui-selected::after': {
    transform: 'scaleX(1)',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '8px 24px',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: '#8B1815',
  },
}));

const AuctionRegisteredItem = ({ auctionName, imgSrc, startTime, endTime, isOnline, location }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 200, sm: 'auto' } }}
        image="/placeholder.svg?height=200&width=200"
        alt={auctionName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#B7201B', fontWeight: 'bold', mb: 2 }}>
            {auctionName}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            <Typography variant="body1">
              Start time: {new Date(startTime).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              End time: {new Date(endTime).toLocaleDateString()}
            </Typography>
            {location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'text.secondary' }} />
                <Typography variant="body1">{location}</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={isOnline ? <Public /> : <LocationOn />}
              label={isOnline ? 'Online Auction' : 'Offline Auction'}
              color={isOnline ? 'primary' : 'secondary'}
              variant="outlined"
            />
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <JoinButton variant="contained">
            Join
          </JoinButton>
        </Box>
      </Box>
    </StyledCard>
  );
};

const AuctionInfo = () => {
  const [tab, setTab] = useState(0);
  const auctionImg = './src/assets/images/auctionItem.png';
  const exRegisteredData = [
    {
      id: 1,
      auctionName: 'Auction 1',
      imgSrc: auctionImg,
      startTime: '2021-10-01',
      endTime: '2021-10-10',
      isOnline: true,
      location: '',
    },
    {
      id: 2,
      auctionName: 'Auction 2',
      imgSrc: auctionImg,
      startTime: '2021-11-01',
      endTime: '2021-11-10',
      isOnline: false,
      location: '21 Le Loi, District 1, HCMC',
    },
  ];

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          sx={{ 
            color: '#B7201B',
            fontWeight: 'bold',
            mb: 4,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Auction
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tab} 
            onChange={handleChange} 
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: '#B7201B',
              }
            }}
          >
            <StyledTab label="Registered" />
            <StyledTab label="Participated" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 3 }}>
          {tab === 0 ? (
            <Box>
              {exRegisteredData.map((item) => (
                <AuctionRegisteredItem
                  key={item.id}
                  auctionName={item.auctionName}
                  imgSrc={item.imgSrc}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  isOnline={item.isOnline}
                  location={item.location}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="h6" align="center" color="text.secondary">
              No participated auctions yet
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AuctionInfo;