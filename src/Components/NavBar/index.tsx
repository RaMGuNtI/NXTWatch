import { Component, type ReactNode } from 'react';
import {
  NavBarBox,
  NavLogo,
  NavRight,
  ProfileBox,
  LogoutBut,
  HamBurger,
  TimerBox,
  SmallLogout,
  ShowingTimerBox,
  UpdateTimeBox,
  TimerBtn,
} from './styledComp';
import Cookies from 'js-cookie';
import { type WithNavigationProps, withNavigation } from '../../withNavigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CiSaveDown2 } from 'react-icons/ci';
import { FaHome, FaFire } from 'react-icons/fa';
import { SiYoutubegaming } from 'react-icons/si';
import { CatVideoSection, SepCatVideo } from '../LeftPanel/styledComp';
import 'reactjs-popup/dist/index.css';
import { IoTimer } from 'react-icons/io5';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { observer, inject } from 'mobx-react';
import { IoLogOutSharp } from 'react-icons/io5';
import { RootAppStore } from '../../Store/RootAppStore';
interface NavBarState {
  panel: boolean;
  activeTab?: string;
}

type NavBarProps = WithNavigationProps & { rootAppStore?: RootAppStore };

class NavBarComp extends Component<NavBarProps, NavBarState> {
  logout = () => {
    Cookies.remove('Token');
    this.props.navigate('/login');
  };

  showPanel = () => {
    this.props.rootAppStore?.navStore.setPanel();
  };

  renderPanel = () => {
    const { navStore, themeStore } = this.props.rootAppStore!;
    const { theme } = themeStore;

    return (
      <CatVideoSection>
        {[
          {
            icon: <FaHome style={{ color: 'red' }} />,
            label: 'Home',
            path: '/',
          },
          {
            icon: <FaFire style={{ color: 'red' }} />,
            label: 'Trending',
            path: '/trending',
          },
          {
            icon: <SiYoutubegaming style={{ color: 'red' }} />,
            label: 'Gaming',
            path: '/gaming',
          },
          {
            icon: <CiSaveDown2 style={{ color: 'red', fontWeight: 'bold' }} />,
            label: 'Saved Videos',
            path: '/saved-videos',
          },
        ].map((item) => (
          <SepCatVideo
            key={item.label}
            style={{
              backgroundColor: theme === 'light' ? '' : '#242424',
              color: theme === 'light' ? '' : '#fff',
            }}
            $active={this.props.location.pathname === item.path}
            onClick={() => {
              if (item.path === '/saved-videos') {
                navStore.setActiveTab('SavedVideo');
              }
              this.props.navigate(item.path);
            }}
          >
            {item.icon}
            <p>{item.label}</p>
          </SepCatVideo>
        ))}
      </CatVideoSection>
    );
  };

  startTimer = () => {
    const { navStore } = this.props.rootAppStore!;
    const TimerKey = setInterval(() => navStore.minusTimer(), 60000);
    navStore.setTimerKey(TimerKey);
  };

  componentDidUpdate(): void {
    const { navStore } = this.props.rootAppStore!;
    if (navStore.timerStartNum === 0) {
      navStore.setTimerStartNum();
      navStore.setIsStarted();
      this.logout();
    }
  }

  componentWillUnmount(): void {
    const { navStore } = this.props.rootAppStore!;
    if (navStore.timerKey !== null) {
      clearInterval(navStore.timerKey);
    }
  }

  render(): ReactNode {
    const { themeStore, navStore } = this.props.rootAppStore!;
    const { theme, toggleTheme } = themeStore;

    return (
      <div>
        <NavBarBox
          style={{
            backgroundColor: theme === 'light' ? '#fff' : '#242424',
            color: theme === 'light' ? '#000' : '#fff',
          }}
        >
          <NavLogo>
            <img
              src={
                theme === 'light'
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              }
              alt="website logo"
            />
          </NavLogo>

          <NavRight>
            {/* Timer */}
            <TimerBox>
              <IoTimer onClick={() => navStore.setShowTimerBox()} />
              {navStore.showTimerBox && (
                <ShowingTimerBox>
                  <p style={{ margin: 0, fontSize: '15px' }}>Set Break Time</p>
                  <UpdateTimeBox>
                    <p onClick={() => navStore.decrementTime()}>➖</p>
                    <h5>{navStore.time} min</h5>
                    <p onClick={() => navStore.incrementTime()}>➕</p>
                  </UpdateTimeBox>
                  <div>
                    <TimerBtn
                      style={{ fontSize: '20px', color: 'white' }}
                      onClick={() => {
                        navStore.startTimer();
                        this.startTimer();
                      }}
                    >
                      {navStore.isStarted ? 'Started' : 'Start'}
                    </TimerBtn>
                  </div>
                </ShowingTimerBox>
              )}
            </TimerBox>

            {/* Theme Toggle */}
            <div
              onClick={() => toggleTheme()}
              style={{ cursor: 'pointer', fontSize: '25px' }}
            >
              {theme === 'light' ? <MdDarkMode /> : <MdOutlineLightMode />}
            </div>

            {/* Hamburger Menu */}
            <HamBurger>
              <GiHamburgerMenu onClick={this.showPanel} />
            </HamBurger>

            {/* Profile */}
            <ProfileBox>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </ProfileBox>

            {/* Logout */}
            <LogoutBut onClick={this.logout}>Logout</LogoutBut>
            <SmallLogout>
              <IoLogOutSharp onClick={this.logout} />
            </SmallLogout>
          </NavRight>
        </NavBarBox>

        {/* Left Panel */}
        {navStore.panel ? this.renderPanel() : null}
      </div>
    );
  }
}

const NavBar = withNavigation(inject('rootAppStore')(observer(NavBarComp)));

export default NavBar;
