import { FC, ReactNode, useEffect, useRef } from "react";
import { ContentArea, LayoutContainer } from "./AppLayout.styled";
import TitleBar from "@renderer/components/TitleBar/TitleBar";
import { useNavigate } from "react-router-dom";
import { useVault } from "@renderer/context/VaultContext";
import { AUTO_LOGOUT_TIME } from "@renderer/constants/config";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { clearSession } = useVault();

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        clearSession();
        navigate("/", { replace: true });
      }, AUTO_LOGOUT_TIME);
    };

    resetTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);

  return (
    <LayoutContainer>
      <TitleBar />
      <ContentArea>{children}</ContentArea>
    </LayoutContainer>
  );
};

export default AppLayout;
