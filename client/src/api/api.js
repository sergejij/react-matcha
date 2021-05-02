import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://81.177.141.123:637',
    withCredentials: true,
    headers: {
      'SameSite': 'None',
    },
});

export const usersApi = {
  getMatches(page, size) {
    return instance.get(`/users/matches?page=${page}&size=${size}`);
  },

  createUsers(amount) {
    return instance.post(`/dev/test_users?amount=${amount}`);
  },

  getUsers(page, size, orderBy = "id", min = 0, max = 1) {
    return instance.get(`/users/list?page=${page}&size=${size}&orderBy=${orderBy}&min=${min}&max=${max}`);
  },

  getLikes(page, size) {
    return instance.get(`/users/likes?page=${page}&size=${size}`);
  },

  getVisits(page, size) {
    return instance.get(`/users/visits?page=${page}&size=${size}`);
  },

  getChats(page, size) {
    return instance.get(`/chats/preview?page=${page}&size=${size}`);
  },

  getMessages(page, size, userId) {
    return instance.get(`/chats/messages?page=${page}&size=${size}&userId=${userId}`);
  },

  putLike(userId) {
    return instance.post(`/profile/like?userId=${userId}`);
  },

  putDislike(userId) {
    return instance.post(`/profile/dislike?userId=${userId}`);
  },

  putVisit(userId) {
    return instance.post(`/profile/visit?userId=${userId}`);
  },

  getMaxRating() {
    return instance.get('/users/max_rating');
  },

  getMaxAge() {
    return instance.get('/users/max_age');
  },

  getShortInfo(id) {
    return instance.get(`/profile/short_info?userId=${id}`);
  }
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
    return instance.patch(`/geoposition/update`, {
      latitude, longitude
    })
  }
}

export const userInterestsApi = {
  getInterests(userId) {
    return instance.get(`/profile/interests${userId ? `?userId=${userId}` : ''}`);
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
  getAvatar(userId) {
    return instance.get(`/profile/avatar${userId ? `?userId=${userId}` : ''}`);
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

  getPhotos(userId) {
    return instance.get(`/profile/photos${userId ? `?userId=${userId}` : ''}`);
  },

  postPhotos(formData) {
    return instance.put(`/profile/photo`, formData, {
      'Content-Type': `multipart/form-data;`
    });
  },

  deletePhoto(id) {
    return instance.delete(`/profile/photo?id=${id}`);
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

export const userSessionApi = {
  getSessions() {
    return instance.get(`/profile/sessions`);
  },

  closeAllSessions() {
    return instance.post(`/profile/close_other_sessions`);
  },

  closeSession(sessionId) {
    return instance.post(`/profile/close_session_remotely`, {
      sessionId: sessionId,
    });
  },
}

export const usersAPI = {
  getUser(id) {
    return instance.get(`/profile/get_info?userId=${id}`);
  },
  putUser(body) {
    return instance.put(`/profile/put_info`, {
      ...body,
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
