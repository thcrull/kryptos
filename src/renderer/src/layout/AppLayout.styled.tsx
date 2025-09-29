import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #1e1e2f;
  color: #fff;
  user-select: none;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;
