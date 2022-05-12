import React from 'react';
import pokeball from '../assets/images/Poké_Ball_icon.svg';


const LoadingSpinner = () => {
    return (
        <div className="spinner-container flex items-center justify-center">
            <div className="loading-spinner pokeball">
                <img src={pokeball} alt="pokeball"></img>
            </div>
        </div>
    );
}

export default LoadingSpinner;