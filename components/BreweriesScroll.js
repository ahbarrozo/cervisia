import styled from "styled-components";
import BreweryCard from "./BreweryCard";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import usePosition from "@/lib/hooks/usePosition";
import useOnScreen from "@/lib/hooks/useOnScreen";
import { LIMIT } from "@/lib/constants";
import fetcher from "@/lib/fetcher";

const BreweriesScrollStyles = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-gap: 30px;
  margin-top: -1.25em;
  padding-left: 1.25em;
  padding-right: 1.25em;

  @media all and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
`;

const getBrewCards = (
  pageIndex,
  previousPageData,
  coordinates,
  limit = LIMIT,
  maxDist = 10e7
) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  if (typeof coordinates[0] !== "number" || typeof coordinates[1] !== "number")
    return null;
  return `/api/brewerycards?limit=${limit}
            &page=${pageIndex}
            &maxDist=${maxDist}
            &coordinates=${coordinates[0]}%2C${coordinates[1]}`;
};

export default function BreweriesScroll() {
  /* ref created for infinite scroll, which will activate 
     once it is visible in screen. */
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const { latitude, longitude } = usePosition(false);
  const [coordinates, setCoordinates] = useState([]);
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getBrewCards(...args, coordinates),
    fetcher
  );

  const breweries = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isReachingEnd = size === LIMIT;
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(
    () => {
      if (longitude && latitude) {
        setCoordinates([latitude, longitude]);
      } else {
        setCoordinates([0, 0]);
      }

      if (isVisible && !isReachingEnd && !isRefreshing) {
        setSize(size + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [longitude, latitude, isVisible, isRefreshing]
  );
  return (
    <BreweriesScrollStyles>
      {breweries.map((brewery) => (
        <BreweryCard key={brewery.obdb_id} brewery={brewery} />
      ))}

      <div ref={ref}>
          {isLoadingMore ? (
            <p>Loading...</p>
          ) : isReachingEnd ? (
            <p>No more breweries found</p>
          ) : (
            <p> </p>
          )}
      </div>
    </BreweriesScrollStyles>
  );
}
