import styled from "styled-components";
import Nav from "./Nav";

const HeaderStyles = styled.header`
  .bar {
    padding-left: 50px;
    padding-right: 50px;
    width: 100%;
    border-bottom: 10px solid var(--primary, black);
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  @media all and (max-width: 1000px) {
  }

  .bar > svg {
    width: 100%;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--primary, black);
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <nav>
          <Nav />
        </nav>
      </div>
    </HeaderStyles>
  );
}
