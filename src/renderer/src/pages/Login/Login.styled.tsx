import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1e1e2f;
  color: #ffffff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.8rem;
  background: #4cafef;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #3a9cd9;
  }
`;
