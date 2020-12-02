import axios from 'axios';

const apiPort = process.env.API_PORT

const API_URL = 'http://localhost:'+apiPort+'/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  accessRoom(dataToSend) {
    
    return axios.post(API_URL + 'access-room', dataToSend)
    .then(response => {
      // if (response.data.accessToken) {
      //   localStorage.setItem('dataToSend', JSON.stringify(response.data));
      // }
      console.log(response)
      return response.data;
    });
  }
}

export default new AuthService();