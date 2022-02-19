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
  padding: 0 2rem;
`;

export const Room = styled.li`
  font-size: 1.2rem;
  margin: 1rem auto;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:hover {
    text-decoration: underline;
  }
`;

export const DeleteRoom = styled.button`
  outline: none;
  border: none;
  background: red;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 20px;
  padding: 5px 10px;

  :active {
    transform: scale(0.9);
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
