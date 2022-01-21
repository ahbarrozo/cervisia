import styled from 'styled-components';

const Title = styled.h2`
  margin: 0 1rem;
  background: var(--yellow, yellow);
  opacity: 0.8;
  font-weight: 600;
  position: relative;
  letter-spacing: -1px;
  text-align: center;
  z-index: 2;
  cursor: pointer;
  line-height: 1.25;
  transform: skew(0, -2deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  :before {
    content: '';
    width: 50px;
    display: block;
    z-index: -1;
    position: absolute;
    transform: skew(-3deg);
  }
  a {
    background: var(--red);
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    text-decoration: none;
    padding: 0 1rem;
  }
`;

export default Title;
