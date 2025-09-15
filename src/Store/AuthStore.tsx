import Cookies from 'js-cookie';
import { makeAutoObservable } from 'mobx';
export class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  async loginToNxtWatch(
    username: string,
    password: string,
    showErr: (error: string) => void
  ) {
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const responseData = await response.json();
    if (responseData.status_code === 400) {
      showErr(responseData.error_msg);
    } else {
      showErr('');
      Cookies.set('Token', responseData.jwt_token);
      return true;
    }
  }
}
