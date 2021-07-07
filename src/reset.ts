import { createGlobalStyle } from "styled-components";

const Reset = createGlobalStyle`
* {
  margin: 0;
    padding: 0;
    box-sizing: border-box;
}
  body {
    font-size: 16px;  
    background: #efefef;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export default Reset;
