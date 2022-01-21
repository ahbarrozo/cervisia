import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
html {
  --red: #ff4040;
  --yellow: #ffc600;
  --primary: #200000;
  --secondary: #fffeed;
  --tertiary: #9a8a7a;
  --lightTertiary: #baaa9a;
  --lightGray: var(--lightGrey);
  --offWhite: #ededed;
  --maxWidth: 1720px;
  --bs: 0 0 10px rgba(0,0,0,0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
  --darkBeerGrad: linear-gradient(
      0deg,
      #5a3000 0%,
      #c08000 70%,
      #ffc600 80%,
      #c0c0a0 90%
    )
    fixed;
  --lightBeerGrad: linear-gradient(
      0deg,
      #8d5103 0%,
      #f0a800 30%,
      #ffc600 60%,
      #f0f0d0 85%
    )
    fixed;
  --logoFontSize: 2rem;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
  margin: 0;
  font-size: 1.0rem;
  line-height:2;
  background-color: var(--primary, black);
}

a {
  text-decoration: none;
  color: var(--tertiary);
}
a:hover {
  text-decoration: none;
  color: var(--secondary);
}
button {
  font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
}
`;
