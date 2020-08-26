import React, { Component } from 'react';
import helper from './helper';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        courses: null
    }

    render() {
        helper.getCourses('http://localhost:5000/api/courses')
        .then(data => this.setState(() => {
            return {
                courses: data
            };
        }))
        .catch(err => console.log('Error!', err));
        
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
 }