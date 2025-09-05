import styled from 'styled-components';

export const light = styled.div`
  background-color: white;
  color: black;
`;

export const dark = styled.div`
  background-color: #181818;
  color: white;
`;

export const GamePageBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  width: 80vw;
  padding-left: 10px;
`;

export const DisplayGamingVideos = styled.div`
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

export const PageSectionName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  * {
    margin-right: 20px;
    margin-left: 5px;
  }
`;
