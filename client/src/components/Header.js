import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    { context.authenticatedUser ?
                        <div className="nav-content"><span>Welcome, { context.authenticatedUser.firstName }!</span><Link to="/signout">Sign Out</Link></div>
                      : 
                        <div className="nav-content"><span>Welcome, Guest!</span><Link className="signin" to={"/signin"}>Sign In</Link><Link className="signup" to="/signup">Sign Up</Link></div>
                    }
                </nav>
            </div>
        </div>
    );
};

export default Header;