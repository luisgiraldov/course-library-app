import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    useEffect( () => {
        document.querySelector('.cont_principal').className= "cont_principal cont_error_active";
    }, []);
    
    return (
        <>
            <div className="not-found-container">
                <div className="cont_principal">
                    <div className="cont_error">
                        <h1>404 Not Found!</h1>  
                        <p>The Page you're looking for isn't here.</p>
                        <Link className="button" to={"/"}>Home page</Link>
                    </div>
                    <div className="cont_aura_1"></div>
                    <div className="cont_aura_2"></div>
                </div>
            </div>
            <div className="bounds small-devices-layout">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
                <div className="home-page-button">
                    <Link className="button" to={"/"}>Go to Home page</Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;