
# Full Stack App with React and a REST API

This is a project that will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.

In addition, the project will require users to create an account and sign in to make changes to the database.

## Overview of the Provided Project Files

Treehouse supplied the following files for use: 

* The `seed` folder contains a starting set of data for the database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create the app's database and populate it with data (we'll explain how to do that below).
* We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to the GitHub repo.
* The `app.js` file configures Express to serve a simple REST API. They've also configured the `morgan` npm package to log HTTP requests/responses to the console. The project maintainer will update this file with the routes for the API.
* The `nodemon.js` file configures the nodemon Node.js module, which they are using to run the REST API.
* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.

### Prerequisites

You need Node JS and npm installed
http://treehouse.github.io/installation-guides/

```
Node JS
npm
```

### Installing

A step by step series of examples that tell you how to get a development env running for this project

steps will be:

- make sure you have npm and Node js installed, you can learn how to do that here: http://treehouse.github.io/installation-guides/

-- Download the project files, [here is the link if you need it](https://github.com/luisgiraldov/course-library-app)

- Unzip the project files

- Open two different terminal/console windows and make sure to be inside the project's folders.
for example
```
cd downloads/course_librarycourse-library-app-master/api
```
```
cd downloads/course_librarycourse-library-app-master/client
```


## Getting Started

To get up and running with this project, run the following commands on the terminal window that has the /api route

First, install the project's dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

Then repeat the following steps on the /client (terminal window) route

```
npm install

```

```
npm start
```

The browser should open a new tab with the app running, otherwise make sure the app is running on both terminal windows, and go to your browser and type:
[http://localhost:3000/](http://localhost:3000/).

## Deployment

Coming Soon with Heroku/Netlify

## Built With

* [Express](https://expressjs.com/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [Git](https://git-scm.com/) - Version Control System
* [Sequelize](https://sequelize.org/) - ORM
* [SQLite3](https://www.sqlite.org/index.html) SQL database engine
* [React](https://reactjs.org/) A JavaScript library for building user interfaces

## Authors

* **Lee Vaughn** - *Initial work* - [Teamtreehouse](https://teamtreehouse.com)
* **Robert Manolis** - *Initial work* - [Teamtreehouse](https://teamtreehouse.com)
* **Luis Giraldo** - *Functional Logic and style* - [Building Portfolio](https://luisgiraldov.com)

## Acknowledgments

* Transform Skew Property and nice List style taken from: https://codepen.io/vikassingh1111/pen/xBPmbL
* Not Found styles taken from https://codepen.io/THEORLAN2/pen/zqOLXQ
* Forbidden design taken from https://codepen.io/claireremmert/pen/MqzOxJ/
* Error page, design taken from https://codepen.io/gaiaayan/pen/QVVxaR
* Loading animation taken from https://codepen.io/bbckn/pen/QWNqGPP
* Checkmark animation taken from https://codepen.io/elevaunt/pen/VvKdVa
