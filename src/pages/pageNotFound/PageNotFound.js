import React from 'react';
import PageNotFoundImg from './3828537.jpg';

const PageNotFound = () => {
    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
        >
            <img
                style={{
                    height: "97vh",
                    // width: "100%"
                }}
                src={PageNotFoundImg ?? ""}
                alt="Page not found"
            />
        </div>
    )
}

export default PageNotFound;