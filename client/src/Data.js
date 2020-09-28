import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
        };

        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        //check if auth is required
        if(requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    async getUser(username, password) {
        const response = await this.api('/users', 'GET', null, true, { username, password });
        if(response.status === 200) {
            return response.json().then(data => data);
        }
        else if(response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if(response.status === 201) {
            return [];
        }
        else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    async getCourses() {
        const response = await this.api('/courses', 'GET');
        if(response.status === 200) {
            return response.json().then(data => data);
        }
        else {
            throw new Error();
        }
    }

    async getCourseDetails(id) {
        const response = await this.api(`/courses/${id}`, 'GET');
        if(response.status === 200) {
            return response.json().then(data => data);
        }
        else if(response.status === 404) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async createCourse(course) {
        const response = await this.api('/courses', 'POST', course);
        if(response.status === 201) {
            return response.json().then(data => {
                return {link : data.link};
            });
        }
        else if(response.status === 400) {
            return response.json().then(data => {
                return { errors: data.errors}
            });
        }
        else if(response.status === 401) {
            throw new Error('Not authorized');
        }
        else {
            throw new Error();
        }
    }

    async updateCourse(id, course) {
        const response = await this.api(`/courses/${id}`, 'PUT', course);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else if(response.status === 401) {
           throw new Error('Not authorized');
        }
        else {
            throw new Error();
        }
    }

    async deleteCourse(id) {
        const response = await this.api(`/courses/${id}`, 'DELETE');
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else if(response.status === 401) {
            throw new Error('Not authorized');
        }
        else {
            throw new Error();
        }
    }

    //make the signout request to the server, to clear the jwt stored in the browser
    signout() {
       this.api('/signout', 'GET');
    }
}