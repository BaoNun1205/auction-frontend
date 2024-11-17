import { ImHammer2 } from "react-icons/im";
import { PiArrowRightFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Divider, Button } from '@mui/material';
import UpcomingAuctionItem from "../components/UpcomingAuctionItem/UpcomingAuctionItem";
import AuctionImg from '~/assets/images/auctionItem.png';
import { useFilterSessions } from "~/hooks/sessionHook";
import splitDateTime from "~/utils/SplitDateTime";

function UpcomingAuctions() {
  const [upcomingData, setUpcomingData] = useState([]);

  // const fetchUpcommingAuction = () => {
  //   const sampleData = [
  //     {
  //       auctionId: '1',
  //       name: 'Sample Auction 1',
  //       startDate: '2023-01-01',
  //       endDate: '2023-01-10',
  //       method: "",
  //       isSecret: "",
  //       status: ""
  //     },
  //     {
  //       auctionId: '2',
  //       name: 'Sample Auction 2',
  //       startDate: '2023-02-01',
  //       endDate: '2023-02-10',
  //       method: "",
  //       isSecret: "",
  //       status: ""
  //     },
  //     {
  //       auctionId: '3',
  //       name: 'Sample Auction 3',
  //       startDate: '2023-03-01',
  //       endDate: '2023-03-10',
  //       method: "",
  //       isSecret: "",
  //       status: ""
  //     },
  //     {
  //       auctionId: '4',
  //       name: 'Sample Auction 4',
  //       startDate: '2023-04-01',
  //       endDate: '2023-04-10',
  //       method: "",
  //       isSecret: "",
  //       status: ""
  //     },
  //     {
  //       auctionId: '5',
  //       name: 'Sample Auction 5',
  //       startDate: '2023-05-01',
  //       endDate: '2023-05-10',
  //       method: "",
  //       isSecret: "",
  //       status: ""
  //     },
  //     {
  //       auctionId: '6',
  //       name: 'Sample Auction 6',
  //       startDate: '2023-06-01',
  //       endDate: '2023-06-10',
  //       method: "",
  //       isSecret: "",
  //       status: ""
  //     }
  //   ];
  //   setUpcomingData(sampleData);
  // };

  // useEffect(() => {
  //   fetchUpcommingAuction();
  // }, []);

  const { data, isLoading, isError } = useFilterSessions({ status: '0' });
  console.log('Data:', data);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading sessions</Typography>;
  }

  const { data: items, total: totalPages } = data;

  return (
    <Box mx={5}>
      <Box textAlign="center">
        <Typography variant="h4" color="#B7201B" fontWeight="bold">Phiên đấu giá sắp diễn ra</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
          <ImHammer2 size={32} className="text-mainBgColor" />
          <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
        </Box>
      </Box>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <UpcomingAuctionItem
              item={item}
            />
          </Grid>
          ))}
      </Grid>
      <Box display="flex" justifyContent="center" my={3}>
        <Button component={Link} to={""} variant="contained" color="primary" endIcon={<PiArrowRightFill />}>
          View All
        </Button>
      </Box>
    </Box>
  )
}

export default UpcomingAuctions;