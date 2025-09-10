import { Component } from 'react';
import {
  BannerBox,
  BannerContent,
  BannerImageText,
  BannerLeftPart,
} from './styledComp';

class BannerAd extends Component {
  state: { visible: boolean } = {
    visible: true,
  };
  render() {
    return (
      <BannerBox
        style={{
          color: '#000',
        }}
        visible={this.state.visible.toString()}
        data-testid="banner"
      >
        <BannerContent>
          <BannerLeftPart>
            <BannerImageText>
              <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
              <p>Buy NXT Watch Premium prepaid plans with UPI</p>
            </BannerImageText>
            <button>GET IT NOW</button>
          </BannerLeftPart>
          <div
            onClick={() =>
              this.setState((prevState: { visible: boolean }) => ({
                visible: !prevState.visible,
              }))
            }
            style={{ cursor: 'pointer' }}
            data-testid="close-btn"
          >
            ✖️
          </div>
        </BannerContent>
      </BannerBox>
    );
  }
}

export default BannerAd;
