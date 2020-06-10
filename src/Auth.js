import axios from '../../axios';


const auth = {
    /**
    * Logs a user in, returning a promise with `true` when done
    * @param  {string} username The username of the user
    * @param  {string} password The password of the user
    */
    login(username, password) {
        if (auth.loggedIn()) return Promise.resolve(true)

        return axios.post('/users/login', { username, password })
            .then(response => {
                localStorage.authToken = response.token
                return Promise.resolve(true)
            })
    },

    logout() {
        return axios.post('/users/logout')
    },

    loggedIn() {
        return !!localStorage.authToken
    },

    register(username, password) {
        return axios.post('/users/register', { username, password })
            // Log user in after registering
            .then(() => auth.login(username, password))
    },

    onChange() { }
}

export default auth