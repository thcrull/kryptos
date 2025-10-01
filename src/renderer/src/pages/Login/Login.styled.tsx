import styled from "@emotion/styled";
import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
  FONTS,
} from "@renderer/constants/styling";

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
