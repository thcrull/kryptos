import { FC, ReactNode, useEffect, useState } from "react";
import {
  ContentArea,
  LayoutContainer,
  LoaderContainer,
} from "./AppLayout.styled";
import TitleBar from "@renderer/components/TitleBar/TitleBar";
import { useNavigate } from "react-router-dom";
import Loader from "@renderer/components/Loader/Loader";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [vaultExists, setVaultExists] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVault = async () => {
      const exists = await window.context.vaultExists();
      setVaultExists(exists);
      if (exists) {
        navigate("/login", { replace: true });
      } else {
        navigate("/register", { replace: true });
      }
    };
    checkVault();
  }, []);

  if (vaultExists === null) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <LayoutContainer>
      <TitleBar />
      <ContentArea>{children}</ContentArea>
    </LayoutContainer>
  );
};

export default AppLayout;
