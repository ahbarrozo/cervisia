import styled from "styled-components";

const BreweryStyles = styled.div`
  .brewery__details {
    background: var(--secondary, white);
    margin: 0.25em 0 0 0.25em;
    box-shadow: var(--bs);
    width: 100%;
  }

  .brewery__hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 400px;
    width: 100%;
    position: relative;
    text-align: center;
    opacity: 0.6;
    z-index: 1;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
    -webkit-box-pack: center;
    -webkit-box-align: center;
  }

  .brewery__hero::before {
    display: block;
    box-sizing: inherit;
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(
        45deg,
        hsla(34, 96%, 28%, 1) 0%,
        hsla(190, 95%, 43%, 0) 70%
      ),
      linear-gradient(
        135deg,
        hsla(42, 100%, 47%, 1) 10%,
        hsla(219, 93%, 48%, 0) 80%
      ),
      linear-gradient(
        225deg,
        hsla(50, 100%, 50%, 1) 10%,
        hsla(293, 93%, 48%, 0) 80%
      ),
      linear-gradient(
        315deg,
        hsla(60, 52%, 88%, 1) 100%,
        hsla(130, 96%, 45%, 0) 70%
      );
    opacity: 0.333;
    z-index: 1;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }

  .brewery__details {
    padding: 3rem;
    position: relative;
    margin: 0 auto;
    margin-top: -5rem;
    max-width: 900px;
    z-index: 1;
    box-shadow: var(--bs);
  }

  .brewery__details > p {
    line-height: 1.2;
    color: var(--primary, black);
  }

  .brewery__image {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    object-fit: cover;
  }

  .brewery__image > span {
    display: inline-block;
    height: 400px;
    position: absolute;
    //clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }

  .brewery__image > span > img {
    position: absolute;
    object-fit: cover;
    box-sizing: border-box;
    //clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }

  @media all and (max-width: 850px) {
    width: calc(50% - 1.25em);
  }
  @media all and (max-width: 550px) {
    width: 100%;
  }

  .brewery__actions {
    position: relative;
    z-index: 2;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.2);
    margin-bottom: 50px;
    padding-top: 10px;
    padding-bottom: 20px;
    display: flex;
    color: white;
    align-items: center;
    justify-content: space-around;
  }

  .brewery__action {
    font-size: 10px;
  }
  .brewery__action > svg {
    width: 30px;
    fill: var(--secondary, white);
  }

  .brewery__action--edit > a {
    border-bottom: 0;
  }

  .brewery--wide {
    width: 100%;
  }

  .brewery__map {
    width: calc(100% + 6rem);
    max-width: none;
    margin-top: -3rem;
    margin-left: -3rem;
  }

  .mapmark > svg {
    background: transparent;
    width: 60px;
    fill: var(--lightGrey);
  }

  .mapmark > svg > path {
    stroke-width: "60";
  }

  .title {
    word-wrap: break-word;
    position: relative;
    margin: 0;
    font-size: 30px;
    z-index: 2;
    line-height: 1.1;
    transform: skew(0, -3deg);
    max-width: 600px;
    margin-top: -19rem;
    text-align: center;
  }

  .title--long {
    font-size: 30px;
  }

  .title::before {
    content: "";
    width: 50px;
    left: 0;
    top: 0;
    height: 100%;
    top: 100%;
    display: block;
    position: relative;
    z-index: -1;
    transform: skew(-5deg);
  }
  // inline link inside

  .title > a {
    border-bottom: 0;
    background-image: linear-gradient(
      to right,
      var(--yellow, yellow) 100%,
      var(--yellow, yellow) 50%
    );
  }
`;

export default BreweryStyles;
