import styled from "@emotion/styled";
import { COLORS, FONTS, SPACING } from "@renderer/constants/constants";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  color: ${COLORS.textPrimary};
  font-family: ${FONTS.body};
  user-select: none;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: ${SPACING.lg};
  overflow-y: auto;
`;
