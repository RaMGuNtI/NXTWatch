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
  align-items: center;
  padding: 10px;

  > * {
    margin-right: 25px;
  }
`;

export const ShowingTimerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 6%;
  right: 17%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 6;
  min-width: 150px;
  font-size: small;
  > * {
    margin: 0px;
  }
`;

export const UpdateTimeBox = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0px;
    margin-right: 3px;
    font-size: 20px;
    cursor: pointer;
  }
  h5 {
    margin: 0px;
  }
`;

export const TimerBtn = styled.button`
  width: 100px;
  background-color: orange;
  color: white;
  border-color: white;
`;

export const TimerBox = styled.div`
  position: 'relative';
  display: 'inline-block';
  * {
    font-size: 30px;
    color: orange;
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
  @media (max-width: 576px) {
    display: none;
  }
`;

export const SmallLogout = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
  }
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
