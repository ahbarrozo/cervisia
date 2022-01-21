import styled from "styled-components";

const MapStyles = styled.div`
  padding: 20px;
  background: var(--secondary, white);
  box-shadow: var(--bs);

  #map {
    height: 800px;
  }

  .mapmark > svg {
    background: transparent;
    width: 60px;
    fill: var(--lightGrey);
  }

  .mapboxgl-popup-content {
    background: transparent;
    padding: 0;
    display: flex;
  }

  .mapboxgl-popup-anchor-bottom > .mapboxgl-popup-tip {
    border-top-color: var(--secondary, white);
  }

  .mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
    border-bottom-color: var(--secondary, white);
  }
`;

export default MapStyles;
