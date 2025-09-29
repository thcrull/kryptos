import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100vh;
  padding: 2rem;
  background: #f5f7fa;
  color: #333;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  padding: 0.6rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #c0392b;
  }
`;

export const List = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  strong {
    display: block;
    font-size: 1.1rem;
  }

  span {
    color: #666;
  }
`;
