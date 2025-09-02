import styled from 'styled-components';

export const LeftPanelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95vh;
  width: 20vw;
  @media (max-width: 576px) {
    display: none;
  }
`;

export const CatVideoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

export const SepCatVideo = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 2px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => (props.active ? 'gray' : 'white')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
  > * {
    margin-right: 10px;
    padding-left: 10px;
  }
  p {
    font-size: 15px;
  }
  &:hover {
    color: red;
  }
`;

export const SocialMediaSection = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin-right: 10px;
  }
`;

export const SocialMediaIcons = styled.img`
  height: 30px;
`;

export const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  padding: 10px;
`;
