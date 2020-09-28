import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    };

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;

        const { context } = this.props;
        const user = context.authenticatedUser ? 
                        `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`
                        :
                        "Guest";
        
        return (
            <div className="bounds course-detail">
                <h1 className="top-60 grid-100 white-letters">Create Course</h1>
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
                                                        id="estimatedTime"
                                                        name="estimatedTime"
                                                        type="text"
                                                        className="course--time-input"
                                                        value={estimatedTime}
                                                        onChange={this.change}
                                                        placeholder="Estimated Time" />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea
                                                        id="materialsNeeded"
                                                        name="materialsNeeded"
                                                        value={materialsNeeded}
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
        const value = event.target.value;

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
    }

    submit = () => {
        const { context } = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;


        //New course payload
        const course = {
            title: title.trim(),
            description: description.trim(),
            estimatedTime: estimatedTime.trim(),
            materialsNeeded: materialsNeeded.trim(),
            userId: context.authenticatedUser.id
        };

        if(context.authenticatedUser) {
            context.data.createCourse(course)
                .then( data => {
                    if(data.errors) {
                        const errors = data.errors;
                        this.setState({ errors });
                    } else {
                        console.log('Course created!');
                        this.props.history.push(data.link);
                    }
                })
                .catch( err => {
                    console.log(err.stack);
                    console.log(err.message);
                    if(err.message === 'Not authorized') {
                        this.props.history.push('/forbidden');
                    } else {
                        this.props.history.push('/error');
                    }
                });
        } else {
            const location = {
                pathname: '/signin',
                state: { from: window.location.pathname }
            }
            this.props.history.push(location);
        }
    }
}