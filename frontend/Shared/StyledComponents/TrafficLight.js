import styled, { css } from "styled-components";

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 10px;
  height: 10px;
  margin: 3px
  padding: 7px;

  ${(props) =>
    props.gs &&
    css`
      background: #5cb85c;
    `}

  ${(props) =>
    props.lw &&
    css`
      background: #dde033;
    `}

    ${(props) =>
    props.am &&
    css`
      background: #d6ff00;
    `}

    ${(props) =>
    props.cr_am &&
    css`
      background: #ec241a;
    `}
      
        ${(props) =>
    props.ex &&
    css`
      background: #000000;
    `}
`;

export default TrafficLight;
