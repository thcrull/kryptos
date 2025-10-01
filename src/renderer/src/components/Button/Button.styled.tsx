import styled from "@emotion/styled";
import { COLORS, RADIUS, SPACING, SHADOWS } from "@renderer/constants/styling";

type StyledButtonProps = {
  disabled?: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.sm} ${SPACING.lg};
  font-weight: 600;
  background: ${({ disabled }) =>
    disabled ? COLORS.buttonDisabled : COLORS.buttonBg};
  color: ${({ disabled }) =>
    disabled ? COLORS.textMuted : COLORS.textPrimary};
  border: 1px solid ${COLORS.glassBorder};
  border-radius: ${RADIUS.full};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);

  &:hover {
    background: ${({ disabled }) =>
      disabled ? COLORS.buttonDisabled : COLORS.buttonHover};
    box-shadow: ${({ disabled }) => (disabled ? "none" : SHADOWS.soft)};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.97)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 2px 6px rgba(0, 0, 0, 0.25)"};
  }

  &:focus {
    outline: none;
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : `0 0 8px ${COLORS.accent}`};
  }
`;

export const SpinnerWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSpinner = styled.span`
  width: 16px;
  height: 16px;
  border: 3px solid ${COLORS.textMuted};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
