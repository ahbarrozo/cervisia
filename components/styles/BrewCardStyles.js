import styled from "styled-components";

const BrewCardStyles = styled.div`
  background: var(--secondary, white);
  border-radius: 10px;
  box-shadow: var(--bs);
  margin: 1.25em 0 0 1.25em;
  width: 100%;

  .brewcard--wide {
    width: 100%;
  }

  .brewcard__details {
    padding: 2rem;
  }

  .brewcard__details > p {
    line-height: 1.2;
    margin-bottom: 0;
    color: var(--primary, black);
  }

  @media all and (max-width: 1000px) {
    width: 80%;
  }
  @media all and (max-width: 650px) {
    width: 75%;
    min-width: 200px;
    margin: 0em 0 0 0em;
  }

  .brewcard__actions {
    position: relative;
    z-index: 2;
    margin-bottom: 50px;
    padding-top: 10px;
    padding-bottom: 50px;
    display: flex;
    color: var(--secondary, white);
    align-items: center;
    justify-content: space-around;
  }

  .brewcard__action {
    font-size: 15px;
  }
  .brewcard__action > svg {
    width: 30px;
    fill: var(--secondary, white);
  }
  .brewcard__action--edit > a {
    border-bottom: 0;
  }

  .brewcard__hero {
    position: relative;
    padding: 20px 10px 0 10px;
    text-align: right;
  }

  .brewcard__hero::before {
    display: block;
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(
        45deg,
        hsla(34, 96%, 18%, 1) 0%,
        hsla(190, 95%, 43%, 0) 90%
      ),
      linear-gradient(
        135deg,
        hsla(42, 100%, 37%, 1) 10%,
        hsla(219, 93%, 48%, 0) 90%
      ),
      linear-gradient(
        225deg,
        hsla(50, 100%, 50%, 1) 10%,
        hsla(293, 93%, 48%, 0) 80%
      ),
      linear-gradient(
        315deg,
        hsla(50, 52%, 88%, 1) 100%,
        hsla(130, 96%, 45%, 0) 70%
      );
    z-index: 1;
    opacity: 0.6;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }
  .brewcard__hero > span > img {
    height: 100%;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: absolute;
    object-fit: cover;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }
`;

export default BrewCardStyles;
