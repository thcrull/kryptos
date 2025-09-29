import { FC, ReactNode } from "react";
import { ContentArea, LayoutContainer } from "./AppLayout.styled";
import TitleBar from "@renderer/components/TitleBar/TitleBar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <TitleBar />
      <ContentArea>{children}</ContentArea>
    </LayoutContainer>
  );
};

export default AppLayout;
