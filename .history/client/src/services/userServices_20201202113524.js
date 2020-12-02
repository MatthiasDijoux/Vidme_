import axios from 'axios';
import authHeader from './authHeader';

const apiPort = process.env.API_PORT
const apiAddress = process.env.API_ADDRESS

const API_URL = `http://${apiAddress}:${apiPort}/api/`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  accessRoom() {
    return axios.get(API_URL + 'room');
  }
}

export default new UserService();