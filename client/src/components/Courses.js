import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import { Link, useHistory } from 'react-router-dom';
// Pending install node-html entities https://www.npmjs.com/package/html-entities
//To decode html entities inside JSX

const Courses = ({ context }) => {

    const history = useHistory();

    const [courses, setCourses] = useState(['none']);
    useEffect( () => {
        context.data.getCourses()
            .then(data => setCourses(data.Courses))
            .catch(err => {
                console.log('Error!', err);
                history.push("/error");
            });
    }, [context.data, history]);

    //track location to use when redirecting back to previous page
    useEffect(() => {
        return history.listen((location) => { 
            // console.log(`You changed the page to: ${location.pathname}`);
            context.actions.recordPath();
        }) 
    },[history, context]);

    return (
        <div>
            <div className="hero-background">
            </div>
            <div className="hero-text-container">
                    <h2>Welcome to the Course Library</h2>
                    <p>This application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.  In addition, the project will require users to create an account and sign in to make changes to the database.</p>                  
                    {/* <button className="goToBtn">Go to courses</button> */}
            </div>
            <ul className="tilesWrap">
                {
                    courses.map( course => {
                        const randomNumber = Math.floor(Math.random() * 4) + 1;
                        const id = course.id ? course.id.toString() : "";
                        // display course description up to 250 characters
                        let description = course.description ? course.description.substring(0,250) : "";
                        //Replace most of the special characters, to avoid markdown rendering. By doing so, not breaking the layout
                        // eslint-disable-next-line
                        description = description.replace(/[`~!@#$%^&*()_|+\-=?<>\{\}\[\]\\\/]/gi, '');
                        return <li key={ id } className={"color" + randomNumber}>
                                    <h2>{ id }</h2>
                                    <h3>{ course.title }</h3>
                                    <p>{ description }...</p>
                                    <Link to={`/courses/${id}`}>Read more</Link>
                                </li>
                    })
                }
                <li key={ "newCourse" }>
                            <h2>+</h2>
                            <h3>Add New Course</h3>
                            <p>Ready with your new class, create your new course here!</p>
                            <Link to={`/courses/create`}>Add</Link>
                </li>
            </ul>
        </div>
    );
};

export default Courses;