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

    //Get course's details when loading
    componentDidMount(){
        this.courseDetails();
    }

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
                <h1 className="top-60 grid-100 white-letters">Update Course</h1>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.handleSubmit}
                    submitButtonText="Update Course"
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
                <div className="modal-container">
                    <div className="modal">
                        <button type="button" id="modal-close-btn" className="modal-close-btn" onClick={this.closeModal}><strong>X</strong></button>
                        <div className="modal-info-container">
                            <h3 className="modal-text">Are you sure you want to update this course?</h3>
                            <div className="modal-btn-container">
                                <button type="button" 
                                        className="button modal-update" 
                                        onClick={() => {
                                            this.handleSubmit(true);
                                        }}>
                                        Update
                                </button>
                                <button type="button" 
                                        className="button button-secondary modal-cancel"
                                        onClick={this.closeModal}>
                                        Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit = (confirm = false) => {
        const modal = document.querySelector('.modal-container');
        if(confirm) {
            modal.classList.remove('is-open');
            this.submit();
        } else {
            modal.classList.add('is-open');
        }

    }

    courseDetails = () => {
        const { context } = this.props;
        const pathArray = window.location.pathname.split('/');
        const id = pathArray[pathArray.length - 2];

        context.data.getCourseDetails(id)
            .then( data => {
                const course = data.CourseFound[0];

                this.setState(() => {
                    return {
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded
                    };
                });

            })
            .catch( err => console.log('Error!', err) );
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
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: context.pathname } };
        this.props.history.push(from);
    }

    closeModal = () => {
        const modal = document.querySelector('.modal-container');
        modal.classList.remove('is-open');
    }

    submit = () => {
        const { context } = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;
        const pathArray = window.location.pathname.split('/');
        const id = pathArray[pathArray.length - 2];
        //Course payload
        const course = {
            title: title.trim(),
            description: description.trim(),
            estimatedTime: estimatedTime.trim(),
            materialsNeeded: materialsNeeded.trim()
        };

        if(context.authenticatedUser) {
            context.data.updateCourse(id, course)
                .then( errors => {
                    if(errors.length) {
                        this.setState({ errors });
                    } else {
                        // Cookies.remove('coursePayload');
                        this.props.history.push(context.coursePath);
                    }
                })
                .catch( err => {
                    console.log(err.stack);
                    this.props.history.push('/error');
                });
        } else {
            const location = {
                pathname: '/signin',
                state: { from: window.location.pathname }
            }
            this.props.history.push(location);
        }
    }//End submit
}// End class