import styled from 'styled-components';

export const light = styled.div`
  background-color: #fff;
  color: #000;
`;

export const dark = styled.div`
  background-color: #181818;
  color: #fff;
`;

export const TrendingPageUI = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  width: 80vw;
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
