//use axios to add global header
import axios from 'axios';

//helper function
const setAuthToken = token => {
    //check to see if there's a token in local storage
    if (token) {
        //set token to header
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        //else delete it
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;