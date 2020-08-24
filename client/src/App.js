import React from 'react';
import './styles/global.css';
import Header from './components/Header';
import Courses from './components/Courses';

function App() {  
  return (
    <div>
        <Header />
        <hr />
        <Courses />
    </div>
  );
}

export default App;
