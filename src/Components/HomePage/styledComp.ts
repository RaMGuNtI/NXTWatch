import styled from 'styled-components';

export const light = styled.div`
  background-color: white;
  color: black;
`;

export const dark = styled.div`
  background-color: #181818;
  color: white;
`;

export const HomePageBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  width: 80vw;
  height: 95vh;
  @media (max-width: 576px) {
    width: 100vw;
  }
`;

export const VideosSection = styled.div`
  display: flex;
  flex-direction: column;
`;


export const DisplayVideos = styled.div`
  padding-left: 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 350px;
  }
`;
