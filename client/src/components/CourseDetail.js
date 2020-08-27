import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';


const CourseDetails = ({ context }) => {

    const [course, setCourse] = useState({
        title: "Loading...",
        User: {
            firstName: "Unknown",
            lastName: "Unknown"
        },
        materialsNeeded: "N/A"
    });
    const pathArray = window.location.pathname.split('/');
    const id = pathArray[pathArray.length - 1];
    useEffect( () => {
        context.data.getCourseDetails(id)
            .then( data => setCourse(data.CourseFound[0]) )
            // .then( data => console.log(data.CourseFound[0]) )
            .catch( err => console.log('Error!', err) );
    }, [context.data, id]);

    console.log("Returned: ", course);
    // Get the list of materials, and give them an id to pass key to react
    let materialsNeeded = course.materialsNeeded ? 
                            course.materialsNeeded.split(", ") 
                            : 
                            ["N/A"];

    materialsNeeded = materialsNeeded.map( (item, index) => {
        item = {
            id: index,
            material: item, 
        }
        return item;
    })

    console.log(materialsNeeded);

    return (
            <div>
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

                <div className="bounds course--detail">
                    <div className="grid-66 small-devices">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{ course.title }</h3>
                            <p>By {`${course.User.firstName} ${course.User.lastName}`}</p>
                        </div>
                        <div className="course--description">
                            <p>{course.description}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right small-devices">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {
                                            materialsNeeded.map( item => {
                                                return <li key={item.id}>
                                                    {item.material}
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
    );
};

export default CourseDetails;