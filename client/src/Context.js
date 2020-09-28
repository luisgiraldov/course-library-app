import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        coursePath: null
    };

    render() {
        const { authenticatedUser, coursePath } = this.state;
        const value = {
            authenticatedUser,
            coursePath,
            data: this.data,
            actions: {
                //Add the 'actions' property and object
                signIn: this.signIn,
                signOut: this.signOut,
                recordPath: this.recordPath
            }
        };
        
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }
    //receives emailAddress that would be the username
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if(user !== null) {
          this.setState(() => {
            return {
              authenticatedUser: user,        }      
          });
          //Set cookie
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
      }

    signOut = () => {
        //make the signout request to the server
        this.data.signout();
        //update state
        this.setState(() => { 
          return {
            authenticatedUser: null,
          }
         });
         Cookies.remove('authenticatedUser');
    }

    //record the actual path of the URL
    recordPath = () => {
        this.setState(() => {
            return {
                coursePath: window.location.pathname
            }
        });
    }
}

export const Consumer = Context.Consumer;
/**
* A higher-order component that wraps the provided component in a Context Consumer component.
* @param {class} Component - A React component.
* @returns {function} A higher-order component.
*/

 export default function withContext(Component) {
    return function contextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
 }

