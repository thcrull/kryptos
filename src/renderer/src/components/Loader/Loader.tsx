import { FC, useEffect, useRef, useState } from "react";
import {
  LoaderText,
  StyledLoader,
  StyledLoaderContainer,
} from "./Loader.styled";

type LoaderProps = {
  text?: string;
  displayInstantly?: boolean;
};

const Loader: FC<LoaderProps> = ({ text, displayInstantly = true }) => {
  const [showLoader, setShowLoader] = useState(displayInstantly);
  const loaderTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (displayInstantly) {
      return;
    }

    loaderTimeoutRef.current = window.setTimeout(
      () => setShowLoader(true),
      500
    );

    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
        loaderTimeoutRef.current = null;
      }
    };
  }, [displayInstantly]);

  if (!showLoader) {
    return null;
  }

  return (
    <StyledLoaderContainer>
      <StyledLoader />
      {text && <LoaderText>{text}</LoaderText>}
    </StyledLoaderContainer>
  );
};

export default Loader;
