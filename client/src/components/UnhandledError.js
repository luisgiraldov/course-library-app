import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UnhandledError = () => {

    useEffect( () => {
        setTimeout(function(){
            document.querySelector('.loading').classList.remove('loading');
          }, 1000);
    }, []);

    return (
        <>
            <div className="loading">
                <h1 className="h1-error-page">500</h1>
                <h2 className="h2-error-page white-letters">Unexpected Error <b>:(</b>
                    <div className="home-page-button">
                        <Link className="button" to={"/"}>Go to Home page</Link>
                    </div>
                </h2>
                <div className="gears">
                    <div className="gear one">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <div className="gear two">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <div className="gear three">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </div>
            {/* <div className="bounds small-devices-layout">
                <h1>Error</h1>
                <p>Sorry! We just encountered an unexpected error.</p>
            </div>
            <div className="home-page-button">
                <Link className="button" to={"/"}>Go to Home page</Link>
            </div> */}
        </>
    );
};

export default UnhandledError;