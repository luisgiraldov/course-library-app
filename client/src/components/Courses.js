import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import helper from '../helper';
import { Link } from 'react-router-dom';

const Courses = () => {

    const [courses, setCourses] = useState(['none']);
    useEffect( () => {
        helper.getCourses('http://localhost:5000/api/courses')
        .then(data => setCourses(data.Courses))
        .catch(err => console.log('Error!', err));
    }, []);

    return(
        <div>
            <div className="hero-background">
            </div>
            <div className="hero-text-container">
                    <h2>Welcome to the Course Library</h2>
                    <p>This application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.  In addition, the project will require users to create an account and sign in to make changes to the database.</p>                  
                    <button className="goToBtn">Go to courses</button>
            </div>
            <ul className="tilesWrap">
                {
                    courses.map( course => {
                        const randomNumber = Math.floor(Math.random() * 4) + 1;
                        const id = course.id ? course.id.toString() : "";
                        return <li key={ id } className={"color" + randomNumber}>
                                    <h2>{ id }</h2>
                                    <h3>{ course.title }</h3>
                                    <p>{ course.description }</p>
                                    <Link to={`/courses/${id}`}>Read more</Link>
                                </li>
                    })
                }
                <li key={ "newCourse" }>
                            <h2>+</h2>
                            <h3>Add New Course</h3>
                            <p>Ready with your new class, create your new course here!</p>
                            <Link to={`#`}>Add</Link>
                </li>
            </ul>
        </div>
    );
};

export default Courses;