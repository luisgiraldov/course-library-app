import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {

    return (
        <>
            <div id="sign-wrapper">
                <div id="hole1" className="hole"></div>
                <div id="hole2" className="hole"></div>
                <div id="hole3" className="hole"></div>
                <div id="hole4" className="hole"></div>
                <div id="header-forbidden">
                    <h1 className="h1-forbidden">403 forbidden</h1>
                    <div id="strike1" className="strike"></div>
                    <div id="strike2" className="strike"></div>
                </div>
                <section id="sign-body-forbidden">
                    <div id="copy-container-forbidden">
                        <h2 className="h2-forbidden">Authorized Personel Only</h2>
                        <p className="p-forbidden"><strong>Error 403: Forbidden</strong>. You do not have permission to view this page.</p>
                    </div>
                    <div id="circle-container-forbidden">
                        <svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                            <defs>
                                <pattern id="image" patternUnits="userSpaceOnUse" height="450" width="450">
                                    <image x="25" y="25" height="450" width="450" xlinkHref="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"></image>
                                </pattern>
                            </defs>
                            <circle cx="250" cy="250" r="200" strokeWidth="40px" stroke="#ef5350" fill="url(#image)"/>
                            <line x1="100" y1="100" x2="400" y2="400" strokeWidth="40px" stroke="#ef5350"/>
                        </svg>
                    </div>
                </section>
            </div>
            <div className="bounds small-devices-layout">
                <h1>Forbidden</h1>
                <p>Oh oh! You can't access this page.</p>
            </div>
            <div className="home-page-button">
                <Link className="button" to={"/"}>Go to Home page</Link>
            </div>
        </>     
    );
};

export default Forbidden;