import PropTypes from "prop-types";
import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Header from "./Header";

const InnerStyles = styled.div`
  max-width: 1720px;
  margin: 0 auto;
  padding: 0 3rem;
`;

// Need to properly stylize the grid, and make it responsive
// based on window width
export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
