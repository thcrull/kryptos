import styled from "@emotion/styled";
import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "@renderer/constants/constants";

type AlertContainerProps = {
  type?: "error" | "info" | "success";
};

const alertColors = {
  error: {
    bg: "rgba(239, 68, 68, 0.15)",
    border: "rgba(239, 68, 68, 0.4)",
    glow: "0 0 8px rgba(239, 68, 68, 0.6)",
    text: COLORS.error,
  },
  success: {
    bg: "rgba(74, 222, 128, 0.15)",
    border: "rgba(74, 222, 128, 0.4)",
    glow: "0 0 8px rgba(74, 222, 128, 0.6)",
    text: COLORS.success,
  },
  info: {
    bg: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.4)",
    glow: "0 0 8px rgba(56, 189, 248, 0.6)",
    text: COLORS.info,
  },
};

export const AlertContainer = styled.div<AlertContainerProps>`
  display: flex;
  align-items: center;
  gap: ${SPACING.md};
  padding: ${SPACING.md} ${SPACING.lg};
  border-radius: ${RADIUS.md};
  backdrop-filter: blur(12px);
  box-shadow: ${({ type }) => (type ? alertColors[type].glow : SHADOWS.soft)};
  background: ${({ type }) =>
    type ? alertColors[type].bg : alertColors.info.bg};
  border: 1px solid
    ${({ type }) => (type ? alertColors[type].border : alertColors.info.border)};
  color: ${({ type }) => (type ? alertColors[type].text : COLORS.info)};
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
`;
