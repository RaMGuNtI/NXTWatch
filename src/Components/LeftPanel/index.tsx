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
  SocialMediaSection,
  ContactSection,
} from './styledComp';
import LeftPanelNavItem from '../LeftPanelNavItem';
import { RootAppStore } from '../../Store/RootAppStore';
import { inject, observer } from 'mobx-react';
interface RootProps {
  rootAppStore?: RootAppStore | undefined;
}
type Props = WithNavigationProps & RootProps;

class LeftPanel extends Component<Props> {
  render(): ReactNode {
    const { rootAppStore } = this.props!;
    const { themeStore } = rootAppStore!;
    const { theme } = themeStore;
    return (
      <LeftPanelBox
        style={{
          backgroundColor: theme === 'light' ? '#fff' : '#242424',
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <CatVideoSection>
          <LeftPanelNavItem
            navigate={this.props.navigate}
            location={this.props.location}
            theme={theme}
            icon={<FaHome style={{ color: 'red' }} />}
            text="Home"
            path="/"
          />
          <LeftPanelNavItem
            navigate={this.props.navigate}
            location={this.props.location}
            theme={theme}
            icon={<FaFire style={{ color: 'red' }} />}
            text="Trending"
            path="/trending"
          />
          <LeftPanelNavItem
            navigate={this.props.navigate}
            location={this.props.location}
            theme={theme}
            icon={<SiYoutubegaming style={{ color: 'red' }} />}
            text="Gaming"
            path="/gaming"
          />
          <LeftPanelNavItem
            navigate={this.props.navigate}
            location={this.props.location}
            theme={theme}
            icon={<CiSaveDown2 style={{ color: 'red' }} />}
            text="Saved Videos"
            path="/saved-videos"
          />
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

// eslint-disable-next-line react-refresh/only-export-components
export default withNavigation(inject('rootAppStore')(observer(LeftPanel)));
