import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import validators from '../validators';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder="First Name" />
                                <input 
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder="Last Name" />
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={this.change}
                                    placeholder="Confirm Password" />
                            </React.Fragment>
                        )} />
                    <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                    </p>   
                </div>
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value.trim();

        if(name === "firstName") {
            const isValid = validators.nameValidator(value);
            this.errorHandler(isValid, "First Name must be a valid name");
        }
        else if(name === "lastName") {
            const isValid = validators.nameValidator(value);
            this.errorHandler(isValid, "Last Name must be a valid last name");
        } 
        else if(name === "emailAddress") {
            const isValid = validators.emailValidator(value);
            this.errorHandler(isValid, "Email must be a valid email address");
        }
        else if(name === "password") {
            const isValid = validators.passwordValidator(value);
            this.errorHandler(isValid, "Password must be at least 8 characters long and must contain a combination of numbers, uppercase letters, lowercase letters, and special charaters such as these @$!%*?&");
        }
        else if(name === "confirmPassword") {
            const password = document.getElementById("password").value;
            const isValid = validators.confirmPasswordValidator(password, value);
            this.errorHandler(isValid, "Passwords do not match");
        } 

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;

        //New user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        context.data.createUser(user)
            .then( errors => {
                if(errors.length){
                    this.setState({ errors });
                } else {
                    console.log("Entro to signin!")
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            // this.props.history.push('/authenticated');
                            this.props.history.goBack();
                            console.log("it worked!!!!!!! ")
                        });
                }
            })
            .catch( err => {
                console.log(err.stack);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }


    //Check the errors array to offer real time validation to the form
    errorHandler = (isValid, errorToDisplay) => {
        let { errors } = this.state;

        if (isValid) {
            errors = errors.filter( error => {
                return error !== errorToDisplay;
            });
        } else {
            if(!errors.includes(errorToDisplay)) {
                errors.push(errorToDisplay);
            }
        }
        this.setState({ errors });
    }
}