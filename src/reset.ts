import { createGlobalStyle } from "styled-components";

const Reset = createGlobalStyle`
* {
  margin: 0;
    padding: 0;
    
}
  body {
    box-sizing: border-box;
    font-size: 16px;  
    background: #efefef;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export default Reset;
