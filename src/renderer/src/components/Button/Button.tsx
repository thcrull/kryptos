import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { SpinnerWrapper, StyledButton, StyledSpinner } from "./Button.styled";

type ButtonProps = {
  children: ReactNode;
  loading?: boolean;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "disabled"
>;

const Button: FC<ButtonProps> = ({ children, loading, disabled, ...props }) => {
  const isDisabled = loading || disabled;

  const buttonContent = (
    <>
      {loading && (
        <SpinnerWrapper>
          <StyledSpinner />
        </SpinnerWrapper>
      )}
      {children}
    </>
  );

  return (
    <StyledButton disabled={isDisabled} {...props}>
      {buttonContent}
    </StyledButton>
  );
};

export default Button;
