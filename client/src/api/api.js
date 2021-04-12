import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://81.177.141.123:637',
    withCredentials: true,
    headers: {
      'SameSite': 'None',
    },
});

export const usersApi = {
  createUsers(amount) {
    return instance.post(`/dev/test_users?amount=${amount}`);
  },

  getUsers(page, size) {
    return instance.get(`/users/list?page=${page}&size=${size}`);
  },

}


export const userInfoApi = {
  getUserInfo(id) {
    return instance.get(`/profile/info?userId=${id}`);
  },

  postUserInfo(body) { // при первом входе
    return instance.post(`/profile/info`, {
      ...body,
    });
  },

  putUserInfo(body) { // поля которые в настройках
    return instance.put(`/profile/info`, {
      ...body,
    });
  },

  changeBio(biography) { // поля которые в настройках
    return instance.patch(`/profile/biography`, {
      biography
    });
  },

  patchSex(value) {
    return instance.patch(`/profile/sex`, {
      "sex": value
    });
  },

  patchSexPreference(value) {
    return instance.patch(`/profile/sex_preference`, {
      "sexPreference": value
    });
  },

  patchRelationshipStatus(value) {
    return instance.patch(`/profile/relationship_status`, {
      "relationshipStatus": value
    });
  },

  patchAttitudeToAlcohol(value) {
    return instance.patch(`/profile/attitude_to_alcohol`, {
      "attitudeToAlcohol": value
    });
  },

  patchAttitudeToSmoking(value) {
    return instance.patch(`/profile/attitude_to_smoking`, {
      "attitudeToSmoking": value
    });
  },

  patchUserInfo(key, value) {
    return instance.patch(`/profile/info`, {
      "field": key,
      "status": value
    });
  },

  getSexesList() {
    return instance.get(`/profile/sexes_list`);
  },

  getRelationshipsList() {
    return instance.get(`/profile/relationships_list`);
  },

  getAttitudesList() {
    return instance.get(`/profile/attitudes_list`);
  },

  patchSharingLocation(status) {
    return instance.patch(`/profile/location_sharing_status`, {
      status
    });
  },

  sendLocation(latitude, longitude) {
    return instance.put(`/profile/coordinates`, {
      latitude, longitude
    })
  }
}

export const userInterestsApi = {
  getInterests() {
    return instance.get(`/profile/interests`);
  },

  postInterests(interests) {
    return instance.post(`/profile/interests`, {
      interests
    });
  },

  putInterests(interests) {
    return instance.put(`/profile/interests`, {
      interests
    });
  },
}

export const userPhotosApi = {
  getAvatar() {
    return instance.get(`/profile/avatar`);
  },

  postAvatar(formData) {
    return instance.post(`/profile/avatar`, formData, {
      'Content-Type': `multipart/form-data;`,
    });
  },

  putAvatar(formData) {
    return instance.put(`/profile/avatar`, formData, {
      'Content-Type': `multipart/form-data;`,
    });
  },

  getPhotos() {
    return instance.get(`/profile/photos`);
  },

  postPhotos(formData) {
    return instance.put(`/profile/photo`, formData, {
      'Content-Type': `multipart/form-data;`
    });
  },

  putProfilePhoto(formData) {
    return instance.put(`/profile/photo`, formData, {
      'Content-Type': `multipart/form-data;`
    });
  },
}

export const userAuthApi = {
  register(email, login, name, surname, password) {
    return instance.post(`/account/register`, {
      email, login, name, surname, password,
    });
  },

  logout() {
    return instance.post(`/account/logout`);
  },

  getAuthData() {
    return instance.get(`profile/auth_data`);
  },

  updateLogin(newLogin, password) {
    return instance.put(`/profile/change_login`, {
      newLogin, password,
    });
  },

  confirmEmail(code) {
    return instance.post(`/account/confirm_email?code=${code}`);
  },

  updateEmail(newEmail) {
    return instance.put(`/profile/change_email`, {
      newEmail
    });
  },

  updatePassword(currentPassword, newPassword) {
    return instance.put(`/profile/change_password`, {
      currentPassword, newPassword
    });
  },
}

export const usersAPI = {
  getUser(id) {
    return instance.get(`/profile/get_info?userId=${id}`);
  },
  putUser(body) {
    console.log(body);
    return instance.put(`/profile/put_info`, {
      ...body,
    });
  },



  getProfileAvatar() {
    return instance.get(`/profile/avatar`);
  },

  getProfilePhotos() {
    return instance.get(`/profile/photos`);
  },

  uploadProfileAvatar(formData) {
    return instance.put(`/profile/avatar`, formData, {
      'Content-Type': `multipart/form-data;`,
    });
  },

  uploadProfilePhoto(formData) {
    return instance.put(`/profile/photo`, formData, {
      'Content-Type': `multipart/form-data;`
    });
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

  confirmEmail(code) {
    return instance.post(`/account/confirm_email?code=${code}`);
  },
}

export const devAPI = {
  usersList() {
    return instance.get(`/dev/users_list`);
  },
}
