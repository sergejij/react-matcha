import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://81.177.141.123:637',
    withCredentials: true,
});

export const usersAPI = {
  getUser(id) {
    return instance.get(`/account/&id=${id}`);
  },

  getPhoto() {
    return instance.get(`/dev/img`);
  },

  register(email, login, name, surname, password) {
    return instance.post(`/account/register`, {
      email, login, name, surname, password,
    });
  },

  login(email, password) {
    return instance.post(`/account/login`, {
      email, password,
    });
  },

  logout() {
    return instance.post(`/account/logout`);
  },

  confirm(code) {
    return instance.post(`/account/confirm_email?code=${code}`);
  },
}
