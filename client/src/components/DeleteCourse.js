import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DeleteCourse extends Component {

    state = {
        loading: true,
        success: false,
        fail: false
    };

    //Get course's details when loading
    componentDidMount(){
        this.courseDetails();
    }

    render() {
        const { loading, success, fail } = this.state;

        return(
            <>
                <div className="delete-container">
                    {
                        loading ? 
                        <section className="loading-container center">
                            <div className="circle-loading"></div>
                            <div className="circle-loading"></div>
                            <div className="circle-loading"></div>
                        </section> : ''
                    }

                    {
                        success ?
                        <div className="checkmark-container center">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" className="checkmark">
                                <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                            </svg>
                            <p className="success-checkmark text-checkmark">Oh Yeah! Course deleted</p>
                            <div className="home-page-button">
                                <Link className="button" to={"/"}>Go to Home page</Link>
                            </div>
                        </div> : ''
                    }
                    
                    {
                        fail ?
                        <div className="checkmark-container center">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" className="checkmark">
                                <circle className="path circle" fill="none" stroke="#D06079" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                                <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                            </svg>
                            <p className="error-checkmark text-checkmark">Bummer!</p>
                            <div className="home-page-button">
                                <Link className="button" to={"/"}>Go to Home page</Link>
                            </div>
                        </div> : ''
                    }  
                </div>
            </>
        );
    }

    courseDetails = () => {
        const { context } = this.props;
        const pathArray = window.location.pathname.split('/');
        const id = pathArray[pathArray.length - 2];
        if(id) {
            context.data.getCourseDetails(id)
                .then( data => {
                    if(data) {
                        const course = data.CourseFound[0];
                        if(context.authenticatedUser && context.authenticatedUser.id === course.userId) {
                            console.log("Authorized");
                            this.deleteCourse(id);
                        } else {
                            console.log("Not authorized");
                            this.props.history.replace("/forbidden");
                        } 
                    } else {
                        this.props.history.push('/notfound');
                    }
                })
                .catch( err => {
                    console.log('Error!', err);
                    this.props.history.push('/error');
                });
        } else {
            this.props.history.push('/error');
        }
    }

    deleteCourse = id => {
        const { context } = this.props;
        if(id){
            context.data.deleteCourse(id)
                .then( data => {
                    if(data){
                        console.log(" deletion succeded!");
                        this.setState({
                            loading: false,
                            success: true,
                            fail: false
                        });
                    } else {
                        this.setState({
                            loading: false,
                            success: false,
                            fail: true
                        });
                    }
                })
                .catch( err => {
                    console.log('Error!', err);
                    this.props.history.push('/error');
                });
        } else {
            this.props.history.push('/error');
        }
    }
    
}