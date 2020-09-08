import React, { Component } from 'react';
import Form from './Form';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

export default class CreateCourse extends Component {
    state = {
        title: Cookies.getJSON('coursePayload') ? 
                    Cookies.getJSON('coursePayload').title 
                    : 
                    '',
        description: Cookies.getJSON('coursePayload') ? 
                        Cookies.getJSON('coursePayload').description
                        : 
                        '',
        hours: Cookies.getJSON('coursePayload') ? 
                    Cookies.getJSON('coursePayload').hours 
                    : 
                    '',
        materials: Cookies.getJSON('coursePayload') ? 
                        Cookies.getJSON('coursePayload').materials 
                        : 
                        '',
        errors: [],
    };

    render() {
        const {
            title,
            description,
            hours,
            materials,
            errors,
        } = this.state;

        const { context } = this.props;
        const user = context.authenticatedUser ? 
                        `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`
                        :
                        "Guest";
        
        return (
            <div className="bounds course-detail">
                <h1 className="top-60 grid-100">Create Course</h1>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={() => (
                            <div>
                                <div className="grid-66 small-devices">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input 
                                                id="title"
                                                name="title"
                                                type="text"
                                                className="input-title course--title--input"
                                                value={title}
                                                onChange={this.change}
                                                placeholder="Course Title..." />
                                        </div>
                                        <p>By {user}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description"
                                                name="description"
                                                value={description}
                                                onChange={this.change}
                                                placeholder={"Course description..."}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right small-devices">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input
                                                        id="hours"
                                                        name="hours"
                                                        type="text"
                                                        className="course--time-input"
                                                        value={hours}
                                                        onChange={this.change}
                                                        placeholder="Hours" />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea
                                                        id="materials"
                                                        name="materials"
                                                        value={materials}
                                                        onChange={this.change}
                                                        placeholder="List materials...">
                                                    </textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    )} 
                />
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value.trim();

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    cancel = () => {
        this.props.history.push('/');
        this.setState(() => { 
            return {
              authenticatedUser: null,
            }
           });
           Cookies.remove('coursePayload');
    }

    submit = () => {
        const { context } = this.props;
        const {
            title,
            description,
            hours,
            materials,
            coursePayload,
        } = this.state;

        //New course payload
        const course = {
            title,
            description,
            hours,
            materials,
        };

        //Authenticated user
        let credentials = null;
        if(context.authenticatedUser) {
            console.log(context);
            credentials = {
                username: context.authenticatedUser.username,
                password: context.authenticatedUser.password
            };

            console.log("credentials: ", credentials);
        } else {
            Cookies.set('coursePayload', JSON.stringify(course), { expires: 1 });
            // const location = {
            //     pathname: '/signin',
            //     state: { from: window.location.href }
            // }
            // this.props.history.push(location);
            this.props.history.push("/signin")
        }

        // context.data.createCourse(course )
        //     .then( errors => {
        //         if(errors.length){
        //             this.setState({ errors });
        //         } else {
        //             context.actions.signIn(emailAddress, password)
        //                 .then(() => {
        //                     this.props.history.push('/authenticated');
        //                 });
        //         }
        //     })
        //     .catch( err => {
        //         console.log(err);
        //         this.props.history.push('/error');
        //     });
    }
}