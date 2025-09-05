import styled from 'styled-components';

export const light = styled.div`
  background-color: #f9f9f9;
  color: #000000;
`;

export const dark = styled.div`
  background-color: #272424;
  color: #ffffff;
`;

export const SavedVidUI = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  width: 80vw;
`;

export const NoSaveDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 350px;
  }
`;
