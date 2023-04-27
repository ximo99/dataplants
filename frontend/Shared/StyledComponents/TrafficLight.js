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
      background: #18ff00;
    `}

  ${(props) =>
    props.lc &&
    css`
      background: #bdff00;
    `}

    ${(props) =>
    props.nt &&
    css`
      background: #d6ff00;
    `}

    ${(props) =>
    props.vu &&
    css`
      background: #ffed00;
    `}
  
    ${(props) =>
    props.en &&
    css`
      background: #ff8700;
    `}
  
      ${(props) =>
    props.cr &&
    css`
      background: #ff0000;
    `}

      
    ${(props) =>
    props.ew &&
    css`
      background: #000000;
    `}
    
        ${(props) =>
    props.ex &&
    css`
      background: #000000;
    `}
`;

export default TrafficLight;
