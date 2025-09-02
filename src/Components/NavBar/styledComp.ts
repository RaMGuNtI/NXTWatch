import styled from 'styled-components';

export const NavBarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NavLogo = styled.div`
  padding: 10px;
  img {
    height: 25px;
  }
`;
export const NavRight = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  > * {
    margin-right: 25px;
  }
`;

export const ProfileBox = styled.div`
  img {
    height: 25px;
  }
`;

export const LogoutBut = styled.button`
  background-color: transparent;
  padding: 5px;
  color: blue;
  border-color: blue;
  width: 90px;
  cursor: pointer;
`;

export const HamBurger = styled.div`
  @media (min-width: 576px) {
    display: none;
  }
`;

export const PopUPStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CancelBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
  border-width: 1px;
  width: 90px;
  padding: 5px;
`;
