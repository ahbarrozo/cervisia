import moment from "moment";
import PropTypes from "prop-types";
import ReviewCardStyles from "./styles/ReviewCardStyles";

// NEED TO ADD EXTRA CLASSES FOR WHEN WE ARE LOGGED IN
export default function ReviewCard({ review }) {
  return (
    <ReviewCardStyles>
      <div className="review__header">
        <div className="review__author">
          <p>{review.author}</p>
        </div>
        <div className="review__stars" title={`Rated ${review.rating}`}>
          {`★`.repeat(review.rating) + `☆`.repeat(5 - review.rating)}
        </div>
        {review.created ? (
          <time className="review__time" dateTime={review.created}>
            {moment(review.created).fromNow()}
          </time>
        ) : (
          ""
        )}
      </div>
      <div className="review__body">
        <p>{review.text}</p>
      </div>
    </ReviewCardStyles>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.object,
};
