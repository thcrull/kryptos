import styled from "@emotion/styled";
import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
  FONTS,
} from "@renderer/constants/constants";

export const Container = styled.div`
  max-height: 100vh;
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

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  background: ${COLORS.glassBg};
  border: 1px solid ${COLORS.glassBorder};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.md};
  display: flex;
  gap: ${SPACING.md};
  align-items: center;
  font-size: 1rem;
  color: ${COLORS.textPrimary};
  box-shadow: ${SHADOWS.soft};
  transition: all 0.25s ease;
  backdrop-filter: blur(15px);

  &:hover {
    transform: scale(1.02);
    box-shadow: ${SHADOWS.glow};
    background: rgba(255, 255, 255, 0.15);
  }
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
  flex-direction: column;
  gap: ${SPACING.lg};
  padding: ${SPACING.lg};
  border-radius: ${RADIUS.lg};
  background: ${COLORS.glassBg};
  border: 1px solid ${COLORS.glassBorder};
  backdrop-filter: blur(16px);
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: flex-end;
  margin-top: ${SPACING.md};
`;
