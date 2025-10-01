import styled from "@emotion/styled";
import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "@renderer/constants/styling";

export const Container = styled.div`
  padding: ${SPACING.lg};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
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

export const InfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  gap: ${SPACING.md};
  flex-direction: column;
`;

export const StatsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: ${SPACING.md};
`;

export const StatCard = styled.div`
  background-color: ${COLORS.cardBg};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.md} ${SPACING.lg};
  flex: 1;
  min-width: 200px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: ${SHADOWS.soft};
`;

export const StatTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: ${SPACING.xs};
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
`;

export const Highlight = styled.div`
  background-color: ${COLORS.buttonBg};
  padding: ${SPACING.md};
  border-left: 4px solid ${COLORS.success};
  border-radius: ${RADIUS.sm};
`;

export const PasswordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

export const PasswordItem = styled.div<{ weak?: boolean; breached?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${RADIUS.sm};
  margin-bottom: ${SPACING.sm};
  font-weight: 500;
  background-color: ${({ weak, breached }) =>
    breached
      ? "rgba(239, 68, 68, 0.15)"
      : weak
        ? "rgba(234, 179, 8, 0.15)"
        : COLORS.buttonBg};
  border: ${({ breached }) =>
    breached ? `1px solid rgba(239, 68, 68, 0.4)` : "none"};
`;

export const StrengthLabel = styled.span`
  font-weight: 600;
  color: ${COLORS.textPrimary};
`;

export const HighLightsTitle = styled.h3`
  font-family: ${FONTS.heading};
`;

export const Title = styled.h3`
  font-family: ${FONTS.heading};
  margin-bottom: ${SPACING.md};
`;
