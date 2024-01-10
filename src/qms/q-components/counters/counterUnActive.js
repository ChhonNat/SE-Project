import React from 'react';
import counterUnactive from './../../assets/counterUnactive.png';

const CounterUnactive = () => {
    return (
        <div>
            <img
                style={{
                    height: "100%",
                    width: "100%"
                }}
                src={counterUnactive}
                alt="..."
            />
        </div>
    )
}

export default CounterUnactive;