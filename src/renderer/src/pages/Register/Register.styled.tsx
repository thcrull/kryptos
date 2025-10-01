import styled from "@emotion/styled";
import {
  COLORS,
  FONTS,
  RADIUS,
  SHADOWS,
  SPACING,
} from "@renderer/constants/constants";

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  border-radius: ${RADIUS.lg};
  background: ${COLORS.cardBg};
  border: 1px solid ${COLORS.glassBorder};
  box-shadow: ${SHADOWS.soft};
  min-width: 340px;
  padding: ${SPACING.xl} ${SPACING.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(20px);
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
`;

export const Title = styled.h1`
  margin-bottom: ${SPACING.lg};
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.textPrimary};
  font-family: ${FONTS.heading};
  text-align: center;
  letter-spacing: 0.5px;
`;

export const StrengthContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: -8px;
`;

export const StrengthBarWrapper = styled.div`
  width: 100%;
  height: 12px;
  border-radius: ${RADIUS.full};
  background-color: rgba(255, 255, 255, 0.15);
  overflow: hidden;
  margin-top: ${SPACING.sm};
`;

export const StrengthBarFill = styled.div<{ score: number }>`
  height: 100%;
  width: ${({ score }) => (score + 1) * 20}%;
  border-radius: ${RADIUS.full};
  background-color: ${({ score }) => {
    switch (score) {
      case 0:
        return "#ff6b6b";
      case 1:
        return "#ffa66b";
      case 2:
        return "#ffde6b";
      case 3:
        return "#6bfff2";
      case 4:
        return "#6bffb3";
      default:
        return "rgba(255,255,255,0.5)";
    }
  }};
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
`;

export const StrengthText = styled.p<{ score: number }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ score }) => {
    switch (score) {
      case 0:
        return "#ff6b6b";
      case 1:
        return "#ffa66b";
      case 2:
        return "#ffde6b";
      case 3:
        return "#6bfff2";
      case 4:
        return "#6bffb3";
      default:
        return "rgba(255,255,255,0.75)";
    }
  }};
  font-family: ${FONTS.body};
  margin: 0;
  margin-top: 4px;
  text-align: left;
`;
