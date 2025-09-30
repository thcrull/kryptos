import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background: rgba(35, 35, 71, 0.55);
  backdrop-filter: blur(18px) saturate(180%);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  min-width: 340px;
  padding: 48px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Input = styled.input`
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: rgba(46, 46, 77, 0.7);
  color: #fff;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 0 0 2px transparent;
  transition:
    box-shadow 0.2s,
    background 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px #6c63ff;
    background: rgba(46, 46, 77, 0.9);
  }
`;

export const Button = styled.button`
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(90deg, #6c63ff 0%, #48c6ef 100%);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(76, 110, 245, 0.15);
  transition: background 0.2s;

  &:hover {
    background: linear-gradient(90deg, #48c6ef 0%, #6c63ff 100%);
  }
`;

export const Title = styled.h1`
  margin-bottom: 28px;
  font-size: 2.1rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  letter-spacing: 0.5px;
`;

export const ErrorText = styled.span`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
`;
