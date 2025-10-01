import styled from "@emotion/styled";
import { COLORS, FONTS } from "@renderer/constants/styling";

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${COLORS.textPrimary};
  font-family: ${FONTS.body};
  user-select: none;
  text-align: center;

  h1 {
    font-family: ${FONTS.heading};
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: white;
  }

  p {
    font-size: 1.25rem;
    margin-top: 2rem;
    color: rgba(255, 255, 255, 0.85);
  }

  /* Loader spacing */
  > div {
    margin: 1rem 0;
  }
`;
