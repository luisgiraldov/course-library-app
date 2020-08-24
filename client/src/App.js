import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const getCourses = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:5000/api/courses');
    xhr.onload = () => {
        if(xhr.status === 200){
            const data = JSON.parse(xhr.responseText);
            resolve(data);
        } else {
            reject(Error (xhr.statusText));
        }
    };
    xhr.onerror = () => reject(Error("A network error ocurred!"));
    xhr.send();          
  });//end Promise    
};//end getCourses


function App() {  
  // const coursesList = getCourses();
  // console.log(coursesList);
  const [courses, setCourses] = useState(['none']);
  useEffect( () => {
    getCourses('http://localhost:5000/api/courses')
      .then(data => setCourses(data.Courses))
      .catch(err => console.log('Oh noes!', err));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          { courses.map( course => {
            const id = course.id ? course.id.toString() : "";
            return <li key={id}>{ course.title }</li>
          })}
        </ul>
      </header>
      <p>
      </p>
    </div>
  );
}

export default App;
