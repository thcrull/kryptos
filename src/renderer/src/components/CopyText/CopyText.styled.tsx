import styled from "@emotion/styled";

export const CopyContainer = styled.div<{ sameRow?: boolean }>`
  display: flex;
  flex-direction: ${({ sameRow }) => (sameRow ? "row" : "column")};
  align-items: center;
  gap: 10px;
`;

export const CopyField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-direction: row;
  transition: opacity 0.2s;
  transition: scale 0.2s;

  &:hover {
    opacity: 0.7;
    scale: 1.1;
  }
`;

export const CopyTextContainer = styled.span`
  word-break: break-word;
  font-weight: 500;
  font-family: monospace;
`;

export const CopyCta = styled.h3`
  margin: 0;
`;
