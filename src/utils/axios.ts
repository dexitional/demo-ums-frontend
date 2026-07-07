import Axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useUserStore } from './authService';
const { REACT_APP_API_URL } = import.meta.env;

const cookies = new Cookies({}, { path: '/' });
//const token = cookies.get("@Auth:token");
//const token = localStorage.getItem("@Auth:token");
const { user, logout, token } = useUserStore.getState();

const axios = Axios.create({
  // Change it with your API baseURL
  baseURL: `${REACT_APP_API_URL}`,
  headers: { "Content-Type" : "application/json" }
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            logout();
            localStorage.removeItem("@Auth:token");
            useUserStore.setState({ user: null, token: null })
            return window.location.reload; 
        }

        if (error.response && error.response.status === 500) {
          return toast.error(error?.response?.data)
        }

        // Handle other errors here
        return Promise.reject(error);
    }
);


axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("@Auth:token");
  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
});


export default axios;