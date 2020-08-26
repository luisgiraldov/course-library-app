import React from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';


const CourseDetails = () => {
    return (
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <Link className="button" to="#">
                                Update Course
                            </Link>
                            <Link className="button" to="#">
                                Delete Course
                            </Link>
                        </span>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
            </div>
    );
};

export default CourseDetails;