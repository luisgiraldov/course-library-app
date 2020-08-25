import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import helper from '../helper';

const Courses = () => {

    const [courses, setCourses] = useState(['none']);
    useEffect( () => {
        helper.getCourses('http://localhost:5000/api/courses')
        .then(data => setCourses(data.Courses))
        .catch(err => console.log('Oh noes!', err));
    }, []);

    // return(
    //         <div className="bounds">
    //             {
    //                 courses.map( course => {
    //                     const id = course.id ? course.id.toString() : "";
    //                     return <div className="grid-33" key={id}><a className="course--module course--link" href="course-detail.html">
    //                                 <h4 className="course--label">Course</h4>
    //                                 <h3 className="course--title">{course.title}</h3>
    //                             </a>
    //                         </div>
    //                 })
    //             }
    //             <div class="grid-33"><a class="course--module course--add--module" href="create-course.html">
    //                 <h3 class="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    //                     viewBox="0 0 13 13" class="add">
    //                     <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
    //                 </svg>New Course</h3>
    //             </a></div>
    //         </div>
    // );

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
                                    <button>Read more</button>
                                </li>
                    })
                }
                <li key={ "newCourse" }>
                            <h2>+</h2>
                            <h3>Add New Course</h3>
                            <p>Ready with your new class, create your new course here!</p>
                            <button>Add</button>
                </li>
            </ul>
        </div>
    );
};

export default Courses;