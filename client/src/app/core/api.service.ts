import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  userApi(method: string, route: string, data) {
    const baseUrl = `${env.apiUrl}/users`;
    const methods = {
      get: this.http.get(`${baseUrl}${route}`),
      post: this.http.post(`${baseUrl}${route}`, data),
      put: this.http.put(`${baseUrl}${route}`, data),
      delete: this.http.delete(`${baseUrl}${route}`, data),
    };
    return methods[method];
  }

  httpHelper(apiUrl: String) {
    return {
        get: (route: string) => this.http.get(`${apiUrl}${route}`),
        post: (route: string, data = null) => this.http.post(`${apiUrl}${route}`, data),
        put: (route: string, data = null) => this.http.put(`${apiUrl}${route}`, data),
        delete: (route: string) => this.http.delete(`${apiUrl}${route}`)
    };
  }

  login(user) {
    return this.userApi('post', '/login', user);
  }

  signup(user) {
    return this.userApi('post', '/signup', user);
  }

}
