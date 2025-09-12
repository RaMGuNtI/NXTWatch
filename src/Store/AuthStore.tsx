import Cookies from 'js-cookie';
import { makeAutoObservable } from 'mobx';
export class AuthStore {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setError(error: string) {
    this.error = error;
  }
  async loginToNxtWatch() {
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    });
    const responseData = await response.json();
    if (responseData.status_code === 400) {
      this.setError(responseData.error_msg);
    } else {
      this.setError('');
      Cookies.set('Token', responseData.jwt_token);
      return true;
    }
  }
}
