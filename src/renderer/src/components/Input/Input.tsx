import { InputHTMLAttributes, FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  StyledInputWrapper,
  StyledInput,
  StyledInputError,
  StyledIcon,
} from "./Input.styled";

type InputProps = {
  error?: string | null;
  minWidth?: number;
  maxWidth?: number;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | "onChange"
  | "onKeyDown"
  | "name"
  | "id"
  | "autoFocus"
  | "defaultValue"
  | "value"
  | "disabled"
  | "type"
  | "placeholder"
  | "onClick"
  | "onFocus"
>;

const Input: FC<InputProps> = ({ type, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <>
      <StyledInputWrapper>
        <StyledInput
          type={isPassword ? (showPassword ? "text" : "password") : type}
          {...props}
        />
        {isPassword && (
          <StyledIcon onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </StyledIcon>
        )}
      </StyledInputWrapper>
      {error && <StyledInputError>{error}</StyledInputError>}
    </>
  );
};

export default Input;
