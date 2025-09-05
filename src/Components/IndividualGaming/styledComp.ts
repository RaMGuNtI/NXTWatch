import styled from 'styled-components';

export const light = styled.div`
  background-color: white;
  color: black;
`;

export const dark = styled.div`
  background-color: #181818;
  color: white;
`;

export const GamingBoxUI = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GamingImage = styled.div`
  img {
    height: 300px;
  }
`;

export const GameInfo = styled.div`
  margin: 0px;
  h6 {
    font-weight: bold;
  }
  p {
    font-size: 12px;
  }
`;
