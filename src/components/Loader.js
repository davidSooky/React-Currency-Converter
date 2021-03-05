import React from 'react';
import "./Loader.css";

const Loader = ({ text }) => {
    return(
        <main className="loader">
            <h1 className="loading-text">{text}</h1>
            <div className="dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    );
};  

export default Loader;