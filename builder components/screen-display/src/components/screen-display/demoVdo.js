import React from 'react';
import ReactPlayer from 'react-player';

const DemoVdo = (props) => {

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', width: '100%', height: '100%', margin: '10px' }}>
      <ReactPlayer
        loop
        controls
        url={props.url}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default DemoVdo; 