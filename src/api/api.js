import * as axios from 'axios';


const API_KEY = '90913beb-1c38-4638-9d50-6c42811abb79';


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY
  }
});

export const usersAPI = {

  getUsers(currentPage = 1, pageSize = 10) {
    return (
      instance
        .get(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data)
    );
  },
  follow(id) {
    return (
      instance
        .post(`follow/${id}`)
        .then(res => res.data)
    );
  },
  unfollow(id) {
    return (
      instance
        .delete(`follow/${id}`)
        .then(res => res.data)
    );
  }
}


export const profileAPI = {

  getProfile(userId) {
    return (
      instance
        .get(`profile/${userId}`)
        .then(res => res.data)
    );
  },
  getStatus(userId) {
    return (
      instance
        .get(`profile/status/${userId}`)
        .then(res => res.data)
    )
  },
  updateStatus(status) {
    return (
      instance
        .put(`profile/status`, { status })
    )
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return (
      instance
        .put(`profile/photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => res.data)
    )
  },
  saveProfile(profile) {
    return (
      instance
        .put(`profile`, profile)
        .then(res => res.data)
    )
  }
}



export const authAPI = {
  me() {
    return (
      instance
        .get(`auth/me`)
    );
  },
  login(email, password, rememberMe = false) {
    return (
      instance
        .post(`auth/login`, { email, password, rememberMe })
    );
  },
  logout() {
    return (
      instance
        .delete(`auth/login`)
    );
  }
}




