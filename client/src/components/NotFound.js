import React, { useEffect } from 'react';

const NotFound = () => {
    useEffect( () => {
        document.querySelector('.cont_principal').className= "cont_principal cont_error_active";
    }, []);
    
    return (
        <div className="not-found-container">
            <div className="cont_principal">
                <div className="cont_error">
                    <h1>Not Found!</h1>  
                    <p>The Page you're looking for isn't here.</p>
                    <button className="button">Go to home page</button>
                </div>
                <div className="cont_aura_1"></div>
                <div className="cont_aura_2"></div>
            </div>
        </div>
    );
};

export default NotFound;