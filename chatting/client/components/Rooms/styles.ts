import styled from "@emotion/styled";

export const RoomsWrapper = styled.div`
  width: 100%;
  height: 600px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid #e2e2e2;
  border-top: none;
  position: relative;
`;

export const List = styled.ul`
  overflow: auto;
  margin: 0 auto;
  width: 100%;
  height: 93%;
`;

export const Room = styled.li`
  font-size: 1.2rem;
  margin: 1rem auto;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const SendForm = styled.form`
  width: 100%;
  height: 7%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 2px solid #e2e2e2;
`;

export const Input = styled.input`
  width: 80%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1.2rem;
  padding: 10px;
`;

export const Button = styled.button`
  width: 20%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  border-left: 2px solid #efefef;
  transition: 0.2s;
`;
