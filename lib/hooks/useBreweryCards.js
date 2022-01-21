import { fetcher } from "@/lib/fetcher";
import useSWRInfinite from "swr/infinite";

export function useBreweryCards({ coordinates, limit = 12, maxDist = 10e7 }) {
  const { data, error, size, isValidating } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      //console.log({ index });
      if (previousPageData && previousPageData.length === 0) {
        //previousPageData.breweries
        return null;
      }
      const searchParams = new URLSearchParams();
      searchParams.set("page", index);
      searchParams.set("limit", limit);
      searchParams.set("maxDist", maxDist);
      if (index === 0) searchParams.set("coordinates", coordinates);
      if (index !== 0 && coordinates.length === 2) {
        // using furthest brewery in terms of coordinates as cursor
        // We want to fetch breweries that are the closest
        // to the last displayed brewery
        console.log("HERE I STAND!");
        const lastCoords =
          previousPageData.breweries[previousPageData.breweries.length - 1]
            .location.coordinates;

        searchParams.set("coordinates", lastCoords.join());
      }
      return `/api/brewerycards?${searchParams.toString()}`;
    },
    fetcher
  );

  const breweries = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = size === limit;
  const isRefreshing = isValidating && data && data.length === size;

  console.log(breweries);
  return {
    breweries,
    error,
    size,
    isEmpty,
    isLoadingMore,
    isRefreshing,
    isReachingEnd,
  };
}
