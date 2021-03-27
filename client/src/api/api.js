import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://81.177.141.123:637',
    withCredentials: true,
    headers: {
      'SameSite': 'None',
    },
});

export const usersAPI = {
  getUser(id) {
    return instance.get(`/profile/get_info?userId=${id}`);
  },
  putUser(body) {
    console.log(body);
    return instance.put(`/profile/update_info`, {
      ...body,
    });
  },

  getProfileAvatar() {
    return instance.get(`/profile/get_avatar`);
  },

  getProfilePhotos() {
    return instance.get(`/profile/get_photos`);
  },

  // uploadProfileAvatar(avatar) {
  //   return instance.put(`/profile/upload_avatar`, {
  //     avatar
  //   });
  // },
  //
  // uploadProfilePhoto(content, id) {
  //   return instance.put(`/profile/upload_photo`, {
  //     id,
  //     content
  //   });
  // },

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

  confirmEmail(code) {
    return instance.post(`/account/confirm_email?code=${code}`);
  },
}

export const devAPI = {
  usersList() {
    return instance.get(`/dev/users_list`);
  },
}
