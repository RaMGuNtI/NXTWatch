import { Component, type ReactNode } from 'react';
import {
  NavBarBox,
  NavLogo,
  NavRight,
  ProfileBox,
  LogoutBut,
  HamBurger,
  // PopUPStyle,
  // CancelBtn,
} from './styledComp';
import Cookies from 'js-cookie';
import { type WithNavigationProps, withNavigation } from '../../withNavigation';
import { AppContext } from '../../Context/ThemeSaveContext';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CiSaveDown2 } from 'react-icons/ci';
import { FaHome, FaFire } from 'react-icons/fa';
import { SiYoutubegaming } from 'react-icons/si';
import { CatVideoSection, SepCatVideo } from '../LeftPanel/styledComp';
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { navStore } from '../../Store/navStore';

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
        <SepCatVideo
          style={{
            backgroundColor: theme === 'light' ? '' : '#242424',
            color: theme === 'light' ? '' : '#fff',
          }}
          active={this.props.location.pathname === '/'}
          onClick={() => this.props.navigate('/')}
        >
          <FaHome style={{ color: 'red' }} />
          <p>Home</p>
        </SepCatVideo>

        <SepCatVideo
          style={{
            backgroundColor: theme === 'light' ? '' : '#242424',
            color: theme === 'light' ? '' : '#fff',
          }}
          active={this.props.location.pathname === '/trending'}
          onClick={() => this.props.navigate('/trending')}
        >
          <FaFire style={{ color: 'red' }} />
          <p>Trending</p>
        </SepCatVideo>

        <SepCatVideo
          style={{
            backgroundColor: theme === 'light' ? '' : '#242424',
            color: theme === 'light' ? '' : '#fff',
          }}
          active={this.props.location.pathname === '/gaming'}
          onClick={() => this.props.navigate('/gaming')}
        >
          <SiYoutubegaming style={{ color: 'red' }} />
          <p>Gaming</p>
        </SepCatVideo>

        <SepCatVideo
          style={{
            backgroundColor: theme === 'light' ? '' : '#242424',
            color: theme === 'light' ? '' : '#fff',
          }}
          active={this.props.location.pathname === '/saved-videos'}
          onClick={() => {
            navStore.setActiveTab('SavedVideo');
            this.props.navigate('/saved-videos');
          }}
        >
          <CiSaveDown2 style={{ color: 'red', fontWeight: 'bold' }} />
          <p>Saved Videos</p>
        </SepCatVideo>
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
            <div onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              {theme === 'light' ? '🌛' : '☀️'}
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
            {/* <div>{this.renderPopUp()}</div> */}
          </NavRight>
        </NavBarBox>

        {navStore.panel ? this.renderPanel() : null}
      </div>
    );
  }
}

const NavBar = withNavigation(NavBarComp);
export default NavBar;
