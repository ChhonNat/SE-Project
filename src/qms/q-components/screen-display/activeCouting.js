import React from 'react';
import ListWrapper from './list';

const ActiveCounting = (props) => {

  const {
    bgList,
    bdrList,
    lHeight,
    numberTicked,
    numCounter,
    fontList,
  } = props;
  return (

    <ListWrapper
      bgList={bgList}
      bdrList={bdrList}
      lHeight={lHeight}
      numberTicked={numberTicked}
      numCounter={numCounter}
      fontList={fontList}
    />
  )
}

export default ActiveCounting;