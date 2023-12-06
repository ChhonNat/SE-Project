import { Grid } from '@mui/material';
import React from 'react';
import ListWrapper from './list';

const PreviewCounting = () => {
  return (
    <Grid container width={"100%"} direction="column" spacing={1} m={2} p={2}>
      {
        [1, 2, 3, 4, 5].map((item, index) => (
          <Grid item key={index}>
            <ListWrapper
              bgList='#3f50b5'
              bdrList='16px'
              lHeight='120px'
              numberTicked={`000${index + 1}`}
              numCounter={`COUNTER ${index + 1}`}
              fontList='h2'
            />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default PreviewCounting;
