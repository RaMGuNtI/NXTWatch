import styled from 'styled-components';

export const SepCatVideo = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 2px;
  width: 99%;
  align-items: center;
  background-color: ${(props) => (props.$active ? '#585858ff' : 'white')};
  color: ${(props) => (props.$active ? 'white' : 'black')};
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
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
