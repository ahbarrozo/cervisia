import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { LIMIT } from "@/lib/constants";
//import { useCurrentUser } from "@/lib/hooks/useUser";
import fetcher from "@/lib/fetcher";
import useOnScreen from "@/lib/hooks/useOnScreen";
import ReviewCard from "./ReviewCard";
import styled from "styled-components";

const ReviewsStyles = styled.div`
  padding: 2rem;
`;

const getReviewCards = (
  pageIndex,
  previousPageData,
  breweryId,
  limit = LIMIT
) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/api/reviewcards?limit=${limit}&page=${pageIndex}&brewery_id=${breweryId}`;
};

export default function Reviews({ brewery }) {
  /* ref created for infinite scroll, which will activate 
     once it is visible in screen. */
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  // const { data: { user } = {} } = useCurrentUser();
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getReviewCards(...args, brewery.obdb_id),
    fetcher
  );

  const reviews = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isReachingEnd = size === LIMIT;
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(
    () => {
      if (isVisible && !isReachingEnd && !isRefreshing) {
        setSize(size + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isVisible, isRefreshing]
  );

  return (
    <ReviewsStyles>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}

      <div ref={ref}>
        {isLoadingMore ? (
          <p>Loading...</p>
        ) : isReachingEnd ? (
          <p>No more reviews found</p>
        ) : (
          <p> </p>
        )}
      </div>
    </ReviewsStyles>
  );
}
