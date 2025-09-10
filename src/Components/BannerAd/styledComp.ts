import styled from 'styled-components';

export const BannerBox = styled.div<{ visible?: string }>`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 200px;
  width: 97%;
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const BannerContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

export const BannerLeftPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 40px;
  }
  button {
    background-color: transparent;
    padding: 10px;
    height: 40px;
    width: 140px;
  }
`;

export const BannerImageText = styled.div``;
