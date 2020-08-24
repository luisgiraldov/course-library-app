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

    return(
            <div className="bounds">
                {
                    courses.map( course => {
                        const id = course.id ? course.id.toString() : "";
                        return <div className="grid-33" key={id}><a className="course--module course--link" href="course-detail.html">
                                    <h4 className="course--label">Course</h4>
                                    <h3 className="course--title">{course.title}</h3>
                                </a>
                            </div>
                    })
                }
                <div class="grid-33"><a class="course--module course--add--module" href="create-course.html">
                    <h3 class="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" class="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </a></div>
            </div>
    );
};

export default Courses;