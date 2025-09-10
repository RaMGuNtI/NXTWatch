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
import { AppContext } from '../../Context/ThemeSaveContext';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CiSaveDown2 } from 'react-icons/ci';
import { FaHome, FaFire } from 'react-icons/fa';
import { SiYoutubegaming } from 'react-icons/si';
import { CatVideoSection, SepCatVideo } from '../LeftPanel/styledComp';
import 'reactjs-popup/dist/index.css';
import { navStore } from '../../Store/navStore';
import { IoTimer } from 'react-icons/io5';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { observer } from 'mobx-react';
import { IoLogOutSharp } from 'react-icons/io5';
interface NavBarState {
  panel: boolean;
  activeTab?: string;
}

type NavBarProps = WithNavigationProps;

class NavBarComp extends Component<NavBarProps, NavBarState> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  logout = () => {
    Cookies.remove('Token');
    this.props.navigate('/login');
  };

  showPanel = () => {
    navStore.setPanel();
  };

  renderPanel = () => {
    const ctx = this.context;
    if (!ctx) return null;

    const { theme } = ctx;

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
              if (item.path === '/saved-videos')
                navStore.setActiveTab('SavedVideo');
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

  // renderPopUp = () => {
  //   return (
  //     <Popup modal trigger={<LogoutBut type="button">Logout</LogoutBut>}>
  //       {(close) => (
  //         <PopUPStyle>
  //           <div>
  //             <p>Are you sure you want to Logout?</p>
  //           </div>
  //           <div>
  //             <CancelBtn type="button" onClick={close}>
  //               Cancel
  //             </CancelBtn>
  //             <LogoutBut type="button" onClick={this.logout}>
  //               Confirm
  //             </LogoutBut>
  //           </div>
  //         </PopUPStyle>
  //       )}
  //     </Popup>
  //   );
  // };

  startTimer = () => {
    const TimerKey = setInterval(() => navStore.minusTimer(), 60000);
    navStore.setTimerKey(TimerKey);
  };

  componentDidUpdate(): void {
    if (navStore.timerStartNum === 0) {
      navStore.setTimerStartNum();
      navStore.setIsStarted();
      this.logout();
    }
  }

  componentWillUnmount(): void {
    if (navStore.timerKey !== null) {
      clearInterval(navStore.timerKey);
    }
  }

  render(): ReactNode {
    const ctx = this.context;
    if (!ctx) return null;

    const { theme, toggleTheme } = ctx;

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

            <div
              onClick={toggleTheme}
              style={{ cursor: 'pointer', fontSize: '25px' }}
            >
              {theme === 'light' ? <MdDarkMode /> : <MdOutlineLightMode />}
            </div>

            <HamBurger>
              <GiHamburgerMenu onClick={this.showPanel} />
            </HamBurger>

            <ProfileBox>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </ProfileBox>
            <LogoutBut onClick={this.logout}>Logout</LogoutBut>
            <SmallLogout>
              <IoLogOutSharp onClick={this.logout} />
            </SmallLogout>
            {/* <div>{this.renderPopUp()}</div> */}
          </NavRight>
        </NavBarBox>

        {navStore.panel ? this.renderPanel() : null}
      </div>
    );
  }
}

// const NavBar = withNavigation(NavBarComp);
// eslint-disable-next-line react-refresh/only-export-components
export default withNavigation(observer(NavBarComp));
