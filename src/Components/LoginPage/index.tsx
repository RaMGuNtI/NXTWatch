import { Component } from 'react';
import { withNavigation } from '../../withNavigation';
import type { WithNavigationProps } from '../../withNavigation';
import Cookies from 'js-cookie';
import {
  LoginPageUI,
  InputBox,
  Logo,
  UserCredentialBox,
  LoginBox,
  LogoBox,
  Input,
  ShowPassDiv,
  SubmitBox,
  ErrorMsg,
} from './styledComp';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../Context/ThemeSaveContext';
interface LoginPageState {
  username: string;
  password: string;
  showPassword: boolean;
  showError: string;
  Token: string | undefined;
}

interface OptionInterFace {
  method: string;
  body: string;
}

class LoginPage extends Component<WithNavigationProps> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  state: LoginPageState = {
    username: '',
    password: '',
    showPassword: false,
    showError: '',
    Token: Cookies.get('Token'),
  };

  handleUserInput = (username: string): void => {
    this.setState({ username: username });
  };

  handlePasswordInput = (password: string): void => {
    this.setState({ password: password });
  };

  submitCredentials = (): void => {
    const options: OptionInterFace = {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    fetch('https://apis.ccbp.in/login', options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status_code === 400) {
          this.setState({ showError: res.error_msg });
        } else {
          console.log(res);
          Cookies.set('Token', res.jwt_token);
          this.props.navigate('/');
        }
      });
  };

  render() {
    const ctx = this.context;
    if (!ctx) return null;

    const { theme } = ctx;
    if (Cookies.get('Token') !== undefined) {
      return <Navigate to="/" />;
    }
    return (
      <LoginPageUI>
        <LoginBox>
          <LogoBox>
            <Logo
              src={
                theme === 'light'
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              }
            />
          </LogoBox>
          <UserCredentialBox>
            <InputBox>
              <label htmlFor="username">USERNAME</label>
              <Input
                id="username"
                type="text"
                value={this.state.username}
                onChange={(e) => this.handleUserInput(e.target.value)}
                placeholder="Username"
              />
            </InputBox>
            <InputBox>
              <label htmlFor="password">PASSWORD</label>
              <Input
                id="password"
                value={this.state.password}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={(e) => this.handlePasswordInput(e.target.value)}
                placeholder="Password"
              />
              <ShowPassDiv>
                <input
                  type="checkbox"
                  onChange={() =>
                    this.setState((prevState: LoginPageState) => ({
                      showPassword: !prevState.showPassword,
                    }))
                  }
                />
                <p>Show Password</p>
              </ShowPassDiv>
            </InputBox>
          </UserCredentialBox>
          <div>
            <SubmitBox>
              <button onClick={this.submitCredentials}>Login</button>
            </SubmitBox>
            <ErrorMsg>{this.state.showError}</ErrorMsg>
          </div>
        </LoginBox>
      </LoginPageUI>
    );
  }
}

const HomeNavigation = withNavigation(LoginPage);

export default HomeNavigation;
