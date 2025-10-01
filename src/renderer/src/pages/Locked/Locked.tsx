import Loader from "@renderer/components/Loader/Loader";
import { LoaderContainer } from "./Locked.styled";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Locked = () => {
  const navigate = useNavigate();

  const checkVault = useCallback(async () => {
    const exists = await window.context.vaultExists();
    if (exists) {
      navigate("/login", { replace: true });
    } else {
      navigate("/register", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = () => {
      checkVault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [checkVault]);

  return (
    <LoaderContainer>
      <LoaderContainer>
        <h1>Your Vault</h1>
        <Loader />
        <p>Press any key to unlock</p>
      </LoaderContainer>
    </LoaderContainer>
  );
};

export default Locked;
