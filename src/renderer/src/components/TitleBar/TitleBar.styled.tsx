import styled from '@emotion/styled'

export const TitleBarContainer = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;

  p {
    font-weight: bolder;
    text-decoration: underline;
  }
`

export const TrafficLights = styled.div`
  display: flex;
  gap: 10px;

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .red {
    background-color: #ff5f57;
    cursor: pointer;
  }

  .yellow {
    background-color: #ffbd2e;
  }

  .green {
    background-color: #27c93f;
  }
`
