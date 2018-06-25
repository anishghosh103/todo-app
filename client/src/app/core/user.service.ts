import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable()
export class UserService {

  public userId: string | null = null;
  public user = null;
  private http = this.api.httpHelper(`${env.apiUrl}/users`);
  private unknownError = { message: 'Error occurred.' };

  constructor(private api: ApiService) { }

  private promise(cb) {
    return new Promise((resolve, reject) => {
      const obj = {};
      cb({
        set: (key, value) => obj[key] = value,
        success: (data) => resolve(data !== undefined ? data : obj),
        error: (data) => reject(data !== undefined ? data : obj)
      });
    });
  }

  setUser(userId: string) {
    this.userId = userId;
    this.getUserDetails(userId)
      .then(user => this.user = user)
      .catch(err => {});
  }

  getAuthStatus() {
    return this.promise(cb => {
      this.http.get('/auth-status').subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error();
          }
        },
        err => cb.error()
      );
    });
  }

  login(user) {
    return this.promise(cb => {
      this.http.post('/login', user).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else if (response.status === 404) {
            cb.error({ email: response.message });
          } else if (response.status === 400) {
            if (response.message.toLowerCase().includes('password')) {
              cb.error({ password: response.message });
            } else {
              cb.error({ email: response.message });
            }
          } else {
            cb.error({ message: response.message });
          }
        },
        err => cb.error({ message: 'Error occurred.' })
      );
    });
  }

  signup(user) {
    user.mobile = user.countryCode + '-' + user.mobile;
    return this.promise(cb => {
      this.http.post('/signup', user).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else if (response.status === 400) {
            cb.error({ email: response.message });
          } else {
            cb.error({ message: response.message });
          }
        },
        err => cb.error({ message: 'Error occurred.' })
      );
    });
  }

  logout() {
    return this.promise(cb => {
      this.http.post('/logout').subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response.message);
          }
        },
        err => cb.error('Error occurred.')
      );
    });
  }

  forgotPassword(email: string) {
    return this.promise(cb => {
      this.http.post('/forgot-password', { email }).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else if (response.status === 404) {
            cb.error({ email: response.message });
          } else {
            cb.error({ message: response.message });
          }
        },
        err => cb.error({ message: 'Error occurred.' })
      );
    });
  }

  activateUser(userId: string) {
    return this.promise(cb => {
      this.http.post('/activate', { userId }).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error({ message: response.message });
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  resetPassword(token: string, password: string) {
    return this.promise(cb => {
      this.http.put('/reset-password', { token, password }).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error({ message: response.message });
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  getUsers(term, page = 1) {
    return this.promise(cb => {
      this.http.get(`/?term=${term}&page=${page}`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  getNotifications(page = 1) {
    return this.promise(cb => {
      this.http.get(`/notifications?page=${page}`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  getFriends(userId: string) {
    return this.promise(cb => {
      this.http.get(`/${userId}/friends`).subscribe(
        (response: any) => {
          if (response.status === 200 || response.status === 404) {
            cb.success(response.data || []);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  getLists(userId?: string, page = 1) {
    const route = userId ? `/${userId}/lists?page=${page}` : `/lists?page=${page}`;
    return this.promise(cb => {
      this.http.get(route).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  getUserDetails(userId: string) {
    return this.promise(cb => {
      this.http.get(`/${userId}`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  getFriendStatus(friendId: string) {
    if (this.userId === friendId) {
      return this.promise(cb => cb.success({ status: 'self' }));
    }
    return this.promise(cb => {
      this.http.get(`/${friendId}/friend-status`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response.message);
          }
        },
        err => cb.error(err)
      );
    });
  }

  addFriend(userId: string) {
    return this.promise(cb => {
      this.http.put(`/${userId}/send-friend-request`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  acceptFriendRequest(userId: string) {
    return this.promise(cb => {
      this.http.put(`/${userId}/accept-friend-request`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  rejectFriendRequest(userId: string) {
    return this.promise(cb => {
      this.http.put(`/${userId}/reject-friend-request`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  unfriend(friendId: string) {
    return this.promise(cb => {
      this.http.put(`/${friendId}/unfriend`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  deleteNotification(notificationId: string) {
    return this.promise(cb => {
      this.http.delete(`/notifications/${notificationId}`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  deleteAllNotifications() {
    return this.promise(cb => {
      this.http.delete('/notifications').subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

}
