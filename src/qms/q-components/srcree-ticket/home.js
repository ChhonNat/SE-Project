import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ScreenTicketAsyncData } from '../../../services/screen-ticket.service';
import CardClick from '../cards/cardClick';
import DemoDate from '../screen-display/date';
import abada_icon_1 from './../../assets/logo/abadas_logo_box_180.png';

const productTitles = [
  'Elevate your style with our latest timepieces.',
  'Upgrade your everyday with our smartwatches and wearables.',
  'Discover the perfect match for your wrist.',
  'Timeless designs and cutting-edge technology come together.',
  'Express your individuality with our curated collection.',
  'More than just a watch, it\'s a statement.',
  'Elevate your everyday with our stylish and functional wearables.',
  'Stay connected and in control with our smartwatch technology.',
  'Find the perfect watch to complement your active lifestyle.',
  'Our watches are designed to stand the test of time.'
];

const ScreenTicket = () => {
  const componentRef = useRef();

  const compenentPrint = {
    content: () => componentRef.current,
    documentTitle: "Print Ticket",
    // onAfterPrint: ()=> alert('Printing is successfully ')
  };

  const printTicket = useReactToPrint(compenentPrint)

  const [waitingNum, setWatingNum] = useState('1000');
  const handleClick = async () => {
    const service_id = '1';
    let submitData = {};
    try {
      submitData['service_id'] = service_id;
      let responseAfterTicketed = await ScreenTicketAsyncData.create(submitData);
      let tmp = responseAfterTicketed?.data?.data;
      setWatingNum(tmp);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(waitingNum);
  return (
    <Box>
      <Grid>
        <Grid
          item
          xs={12}
          height={'25vh'}
        >
          <Stack
            height={'100%'}
            justifyContent='center'
            alignItems='center'
            direction={'column'}
            spacing={3}
          >
            <Box>
              <img style={{ width: "210px" }} src={abada_icon_1} alt="" />
            </Box>
            <Typography variant='h5'>
              Click button below to get a waiting number
            </Typography>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          height={'60vh'}
        >
          <Stack
            height={'100%'}
            justifyContent='center'
            alignItems='center'
          >
            <CardClick
              handleClick={handleClick}
              title="Tuition Fee"
            />

            <Typography ref={componentRef} variant='body1' m={4}>
              {waitingNum}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          height={'10vh'}
        >
          <Stack
            height={'100%'}
            justifyContent='space-around'
            alignItems='center'
            direction={'row'}
          >
            <Typography variant='body2'>
              &copy; {new Date().getFullYear()} ABADAS
            </Typography>
            <Typography variant='body2'>
              Deisign & Develop by GROUP 2
            </Typography>
          </Stack>

        </Grid>
        <Grid
          item
          xs={12}
          height={'3.5vh'}
        >
          <Stack
            height={'100%'}
            justifyContent='center'
            alignItems='center'
            direction={'row'}
          >
            <DemoDate
              productTitles={productTitles}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ScreenTicket;