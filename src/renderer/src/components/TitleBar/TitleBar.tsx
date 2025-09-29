import { FC } from "react";
import { TitleBarContainer, TrafficLights } from "./TitleBar.styled";

const TitleBar: FC = () => {
  return (
    <TitleBarContainer>
      <TrafficLights>
        <div
          className="circle red"
          onClick={() => window.windowControls.close()}
        ></div>
        <div
          className="circle yellow"
          onClick={() => window.windowControls.maximize()}
        ></div>
        <div
          className="circle green"
          onClick={() => window.windowControls.minimize()}
        ></div>
      </TrafficLights>
    </TitleBarContainer>
  );
};

export default TitleBar;
