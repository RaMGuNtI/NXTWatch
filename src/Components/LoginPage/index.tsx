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
import { observer, inject } from 'mobx-react';
import { RootAppStore } from '../../Store/RootAppStore';
interface LoginPageState {
  username: string;
  password: string;
  showPassword: boolean;
  showError: string;
  Token: string | undefined;
}


type Props = WithNavigationProps & { rootAppStore?: RootAppStore };

class LoginPage extends Component<Props> {
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

  handleError = (error: string): void => {
    this.setState({ showError: error });
  };

  submitCredentials = async () => {
    const { loginToNxtWatch } = this.props.rootAppStore!.authStore;
    const response = await loginToNxtWatch(
      this.state.username,
      this.state.password,
      this.handleError
    );
    if (response) this.props.navigate('/');
  };

  render() {
    const { rootAppStore } = this.props;
    const theme = rootAppStore!.themeStore.theme;
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

const HomeNavigation = withNavigation(
  inject('rootAppStore')(observer(LoginPage))
);

export default HomeNavigation;
