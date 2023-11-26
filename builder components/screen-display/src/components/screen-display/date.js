import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import './Style/date.css';


const DemoDate = (props) => {
  const {productTitles} = props
  // const [marqueeIndex, setMarqueeIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setMarqueeIndex((prevIndex) => (prevIndex + 1) % productTitles.length);
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <div className='dateBlur'>
        <Typography gutterBottom variant="h5" component="div">
          {currentTime.toLocaleDateString('en-US')}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          | {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}
        </Typography>
      </div>
      <Marquee className='marguee'>
        <img src={require('./../../assets/logo/abadas_logo_box_180.png')} alt="Abada logo" />
        {productTitles.map((title, index) => (
          <Typography key={index} gutterBottom variant="h6" component="div">
            {/* {index === marqueeIndex && <img src={require('./../../assets/logo/abadas_logo_box_180.png')} alt="Abada logo" />} */}
            {title}
          </Typography>
        ))}
      </Marquee>
    </>
  )
}

export default DemoDate;