import React from 'react';
import "./Loader.css";

const Loader = () => {
    return(
        <main className="loader">
            <h1 className="loading-text">Getting currency rates...</h1>
            <div className="dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    );
};  

export default Loader;