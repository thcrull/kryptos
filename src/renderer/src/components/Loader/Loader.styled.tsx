import styled from "@emotion/styled";
import {
  COLORS,
  SPACING,
  RADIUS,
  FONTS,
  SHADOWS,
} from "@renderer/constants/constants";

export const StyledLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.sm};
  position: relative;
`;

export const LoaderText = styled.span`
  font-family: ${FONTS.body};
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  color: ${COLORS.textSecondary};
`;

export const StyledLoader = styled.span`
  width: 64px;
  height: 44px;
  position: relative;
  border: 4px solid ${COLORS.accent};
  border-radius: ${RADIUS.md};
  box-shadow: ${SHADOWS.glow};

  &:before {
    content: "";
    position: absolute;
    border: 4px solid ${COLORS.accent};
    width: 32px;
    height: 28px;
    border-radius: 50% 50% 0 0;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
  }

  &:after {
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${COLORS.accent};
    box-shadow:
      16px 0 ${COLORS.accent},
      -16px 0 ${COLORS.accent};
    animation: flash 0.6s ease-in-out infinite alternate;
  }

  @keyframes flash {
    0% {
      background-color: ${COLORS.textMuted};
      box-shadow:
        16px 0 ${COLORS.textMuted},
        -16px 0 ${COLORS.accent};
    }
    50% {
      background-color: ${COLORS.accent};
      box-shadow:
        16px 0 ${COLORS.textMuted},
        -16px 0 ${COLORS.textMuted};
    }
    100% {
      background-color: ${COLORS.textMuted};
      box-shadow:
        16px 0 ${COLORS.accent},
        -16px 0 ${COLORS.textMuted};
    }
  }
`;
