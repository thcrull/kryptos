import styled from "@emotion/styled";
import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
  FONTS,
} from "@renderer/constants/constants";

export const Container = styled.div`
  padding: ${SPACING.lg};
  display: flex;
  gap: ${SPACING.md};
  flex-direction: column;
  color: ${COLORS.textPrimary};
  font-family: ${FONTS.body};
  backdrop-filter: blur(20px);
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${SPACING.md};
  border-bottom: 1px solid ${COLORS.glassBorder};
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 50px;
  gap: ${SPACING.sm};
  align-items: center;
`;

export const TableHeader = styled.div`
  font-weight: 600;
  font-family: ${FONTS.body};
  color: ${COLORS.textSecondary};
  padding: ${SPACING.sm} ${SPACING.md};
  border-bottom: 1px solid ${COLORS.glassBorder};
`;

export const TableRow = styled.div`
  display: contents;
`;

export const TableCell = styled.div`
  padding: ${SPACING.sm} ${SPACING.md};
  background: ${COLORS.glassBg};
  border: 1px solid ${COLORS.glassBorder};
  border-radius: ${RADIUS.sm};
  font-size: 0.95rem;
  height: 100%;
  color: ${COLORS.textPrimary};
  box-shadow: ${SHADOWS.soft};
  backdrop-filter: blur(12px);

  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;

  &:nth-of-type(2) {
    font-weight: 500;
  }
  &:nth-of-type(3) {
    font-family: monospace;
  }
`;

export const PasswordWrapper = styled.div`
  display: flex;
  gap: ${SPACING.sm};
  justify-content: space-between;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: ${COLORS.textMuted};
  font-style: italic;
  margin-top: ${SPACING.xl};
  font-size: 1rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${SPACING.md};
  padding: ${SPACING.md};
  border-radius: ${RADIUS.lg};
  background: ${COLORS.glassBg};
  border: 1px solid ${COLORS.glassBorder};
  backdrop-filter: blur(16px);
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${SPACING.sm};
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${COLORS.textSecondary};
  font-family: ${FONTS.body};
`;

export const Actions = styled.div`
  display: flex;
  margin-top: ${SPACING.lg};
`;

export const TrashButton = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  transition: scale 0.2s;

  &:hover {
    opacity: 0.7;
    scale: 1.1;
  }
`;
