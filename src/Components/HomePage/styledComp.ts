import styled from 'styled-components';

export const HomePageBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  width: 80vw;
  @media (max-width: 576px) {
    width: 100vw;
  }
`;

export const VideosSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e7e7e7;
`;

export const InputSection = styled.div`
  display: flex;
  padding: 10px;
  input {
    width: 30vw;
    padding: 5px;
  }
  button {
    width: 15%;
  }
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
