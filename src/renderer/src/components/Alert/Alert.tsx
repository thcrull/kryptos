import { FC } from "react";
import { AlertContainer } from "./Alert.styled";

type AlertProps = {
  text: string;
  type?: "error" | "info" | "success" | "warning";
};

const Alert: FC<AlertProps> = ({ text, type }) => {
  return (
    <AlertContainer type={type}>
      <div>{text}</div>
    </AlertContainer>
  );
};

export default Alert;
