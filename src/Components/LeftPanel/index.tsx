import { Component, type ReactNode } from 'react';
import { FaHome, FaFire } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';
import { SiYoutubegaming } from 'react-icons/si';
import { type WithNavigationProps } from '../../withNavigation';
import { withNavigation } from '../../withNavigation';

import {
  LeftPanelBox,
  SocialMediaIcons,
  CatVideoSection,
  SepCatVideo,
  SocialMediaSection,
  ContactSection,
} from './styledComp';
import { AppContext } from '../../Context/ThemeSaveContext';
class LeftPanel extends Component<WithNavigationProps> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  render(): ReactNode {
    const ctx = this.context;
    if (!ctx) return null;
    const { theme } = ctx;
    return (
      <LeftPanelBox
        style={{
          backgroundColor: theme === 'light' ? '#fff' : '#242424',
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <CatVideoSection>
          <SepCatVideo
            style={{
              backgroundColor: theme === 'light' ? '' : '#242424',
              color: theme === 'light' ? '' : '#fff',
            }}
            active={this.props.location.pathname === '/'}
            onClick={() => {
              this.props.navigate('/');
            }}
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
            onClick={() => {
              this.props.navigate('/trending');
            }}
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
            onClick={() => {
              this.props.navigate('/gaming');
            }}
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
              this.setState({ activeTab: 'SavedVideo' });
              this.props.navigate('/saved-videos');
            }}
          >
            <CiSaveDown2 style={{ color: 'red', fontWeight: 'bold' }} />
            <p>Saved Videos</p>
          </SepCatVideo>
        </CatVideoSection>
        <ContactSection>
          <p>CONTACT US</p>
          <SocialMediaSection>
            <SocialMediaIcons
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook"
            />
            <SocialMediaIcons
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter"
            />
            <SocialMediaIcons
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linkedin"
            />
          </SocialMediaSection>
          <p>Enjoy! Now to see your channels and recommeded Videos</p>
        </ContactSection>
      </LeftPanelBox>
    );
  }
}

const LeftPanelWithNav = withNavigation(LeftPanel);
export default LeftPanelWithNav;
