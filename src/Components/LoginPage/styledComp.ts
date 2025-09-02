import styled from 'styled-components';

export const LoginPageUI = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginBox = styled.div`
  height: 350px;
  box-shadow: 5px 5px 5px 5px gray;
  width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-between;
`;

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    color: gray;
    font-size: small;
    margin: 5px 0px 5px 0px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
`;

export const Input = styled.input`
  padding: 8px;
`;

export const Logo = styled.img`
  height: 50px;
`;
export const UserCredentialBox = styled.div`
  margin: 10px;
`;

export const ShowPassDiv = styled.div`
  display: flex;
  justify-content: start;
  p {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 10px;
    cursor: pointer;
  }
`;

export const SubmitBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 95%;
    padding: 7px;
    background-color: blue;
    color: white;
    border-radius: 5px;
    border-width: 0px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const ErrorMsg = styled.p`
  color: red;
  font-size: 10px;
  text-align: center;
`;
