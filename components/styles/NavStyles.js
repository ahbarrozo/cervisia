import styled from "styled-components";

const NavStyles = styled.ul`
  .nav__section {
    display: grid;
    width: 100%;
    max-width: 1720px;
    background: var(--primary, black);
    width: 100%;
    padding: 2rem;
    grid-template-areas: "logo menu search auth";
    grid-template-columns: 150px 3fr auto 1fr;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .nav__section--logo {
    grid-area: logo;
    width: 150px;
    transition: all 0.2s;
    cursor: pointer;
  }
  li {
    list-style: none;
  }

  .nav__section--menu {
    grid-area: menu;
    display: grid;
    grid-gap: 20px;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(5, minmax(100px, 1fr));
    padding: 0rem 2rem 0rem 2rem;
  }
  .nav__link {
    color: var(--tertiary, grey);
    display: grid;
    align-content: center;
    justify-content: center;
    justify-items: center;
    text-transform: uppercase;
    padding: 0.5rem 1rem 0.5rem 1rem;
    transition: all 0.2s;
    border-bottom: 5px solid transparent;
    max-width: 100%;
  }
  .nav__section--search {
    grid-area: search;
  }
  .nav__section--auth {
    display: grid;
    grid-area: auth;
    grid-auto-flow: column;
    grid-gap: 20px;
    grid-template-columns: repeat(2, minmax(50px, 1fr));
  }

  .nav__link > svg {
    background: transparent;
    width: 40px;
    transition: all 0.2s;
    fill: var(--tertiary, grey);
    margin-bottom: 0.5rem;
  }
  .nav__section--logo > span {
    position: absolute;
    width: inherit;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
  }

  .pseudoLink {
    cursor: pointer;
  }

  .nav__section--logo:hover,
  .nav__link:hover,
  .nav__section--logo.active,
  .nav__link.active {
    color: var(--secondary, white);
    text-decoration: none;
  }
  .nav__section--logo:hover,
  .nav__section--logo.active,
  .nav__link:hover > svg,
  .nav__link.active > svg {
    transform: scale(1.2);
    fill: var(--secondary, white);
  }

  .nav__link .nav__link--logo svg {
    width: 200px;
    margin: 0;
  }
  .nav__link .nav__link--logo .nav__link--logo:hover svg {
    transform: none;
  }

  .search {
    position: relative;
    width: 100%;
    display: flex;
  }
  .search__results {
    background: var(--secondary, white);
    position: absolute;
    width: 100%;
    top: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 5;
    left: 0;
  }
  .search__input {
    font-size: 1.25rem;
    background: none;
    color: var(--secondary, white);
    outline: 0;
    border: 0;
  }
  .search__result {
    padding: 10px;
    display: block;
    border-bottom: 1px solid #ececec;
  }
  .search__result--active {
    padding: 10px;
    display: block;
    border-bottom: 1px solid #ececec;
    background: #f1f1f1;
  }

  @media all and (max-width: 1500px) {
    .nav__section {
      grid-template-columns: 100px 3fr auto 1fr;
    }
    .nav__section--logo {
      width: 100px;
    }

    .nav__section--menu {
      grid-template-columns: repeat(5, minmax(60px, 1fr));
    }
    .nav__link {
      font-size: 75%;
    }
    .nav__link > svg {
      width: 30px;
    }
    .search__input {
      font-size: 1rem;
    }
  }

  @media all and (max-width: 1000px) {
    .nav__section {
      grid-template-columns: 100px 1fr 200px;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        "logo search auth"
        "menu menu menu";
    }
    .nav__section--logo {
      grid-area: logo;
      display: block;
      margin: auto;
    }

    .nav__section--menu {
      padding: 0rem 0rem 0rem 0rem;
    }
    .nav__section--search {
      padding-left: 2rem;
    }

    .nav__section--auth {
      grid-area: "auth";
    }
  }

  @media all and (max-width: 650px) {
    .nav__section {
      grid-template-columns: 100px auto 200px;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas:
        "logo void auth"
        "search search search"
        "menu menu menu";
    }

    .nav__section--search {
      padding-left: 0;
    }
    .nav__item {
      width: 33.333333%;
    }

    .heart-count:before {
      content: "♥️";
      margin-right: 1rem;
    }
  }
`;

export default NavStyles;
