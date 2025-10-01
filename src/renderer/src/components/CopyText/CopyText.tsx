import { FC, useState } from "react";
import { FaClipboard, FaCheck } from "react-icons/fa";
import { CopyContainer, CopyField } from "./CopyText.styled";

type CopyTextProps = {
  sameRow?: boolean;
  onClick: () => void;
};

const CopyText: FC<CopyTextProps> = ({ sameRow, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onClick();
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CopyContainer sameRow={sameRow}>
      <CopyField>
        {copied ? (
          <FaCheck size={20} />
        ) : (
          <FaClipboard
            size={20}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        )}
      </CopyField>
    </CopyContainer>
  );
};

export default CopyText;
