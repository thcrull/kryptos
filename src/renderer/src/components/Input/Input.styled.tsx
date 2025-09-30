import styled from "@emotion/styled";
import { COLORS, SPACING, RADIUS } from "@renderer/constants/constants";

export const StyledInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledInput = styled.input<{
  minWidth?: number;
  maxWidth?: number;
}>`
  flex: 1;
  width: 100%;
  padding: ${SPACING.sm} ${SPACING.xl} ${SPACING.sm} ${SPACING.md};
  font-size: 1rem;
  color: ${COLORS.textPrimary};
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : undefined)};
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : undefined)};
  background: ${COLORS.glassBg};
  border: 1px solid ${COLORS.glassBorder};
  border-radius: ${RADIUS.full};
  backdrop-filter: blur(12px);
  transition: all 0.3s;

  &::placeholder {
    color: ${COLORS.textMuted};
  }

  &:focus {
    border-color: #00c6ff;
    box-shadow: 0 0 6px rgba(0, 198, 255, 0.8);
    outline: none;
  }

  &:disabled {
    background: ${COLORS.buttonDisabled};
    color: ${COLORS.textMuted};
    cursor: not-allowed;
  }
`;

export const StyledInputError = styled.div`
  color: ${COLORS.error};
  margin-top: ${SPACING.xs};
  font-size: 0.875rem;
`;

export const StyledIcon = styled.span`
  position: absolute;
  right: ${SPACING.md};
  width: 22px;
  height: 22px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.textSecondary};
  transition:
    opacity 0.2s,
    color 0.3s;

  &:hover {
    opacity: 0.9;
    color: #00c6ff;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
