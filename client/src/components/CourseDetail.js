import React, { useState, useEffect } from 'react';
// import '../styles/global.css';
import { Link } from 'react-router-dom';


//This functional component destructure context and history from props.
const CourseDetails = ({ context, history }) => {
    let canUpdate = null;
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
            .catch( err => console.log('Error!', err) )
    }, [context.data, id]);

    useEffect( () => {
        context.actions.recordPath();
        // eslint-disable-next-line
    }, []);

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
    });

    if(context.authenticatedUser && course.userId === context.authenticatedUser.id){
        canUpdate = true;
    }

    return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            { canUpdate ? 
                                <span>
                                    <button className="button" onClick={ () => {
                                        modifyCourse({
                                            pathname: `${id}/update`,
                                            history
                                        });
                                    }}>
                                        Update Course
                                    </button>
                                    <button className="button" onClick={ () => {
                                        modifyCourse({
                                            pathname: `${id}/delete`,
                                            history
                                        });
                                    }}>
                                        Delete Course
                                    </button>
                                </span> 
                                :
                                ''
                            }
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

//set the location to go to, when clicking update or delete buttons, and also sends a previous path to go back when signin
const modifyCourse = (data) => {
        const location = {
            pathname: data.pathname,
            state: { from: window.location.pathname }
        };
        data.history.push(location);
};

export default CourseDetails;