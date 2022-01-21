import styled from "styled-components";

const SearchStyles = styled.div`
  position: relative;

  .search__input {
    width: 100%;
    padding: 10px;
  }

  .search__results {
    background: var(--secondary, white);
    border-radius: 10px;
    position: absolute;
    width: 100%;
    top: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 5;
    left: 0;
  }

  .search__result {
    padding: 5px;
    font-size: 12px;
    display: block;
  }
  .search__result:hover {
    background: var(--yellow, yellow);
    color: var(--primary, black);
    border-radius: 10px;
  }
`;

export default SearchStyles;
