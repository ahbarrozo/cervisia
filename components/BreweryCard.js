import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import BrewCardStyles from "./styles/BrewCardStyles";
import printAddress from "../lib/printAddress";
import SvgReview from "./Icons/Review";
import Title from "./styles/Title";
import brewimg from "../public/static/brewimg.png";
import fetcher from "@/lib/fetcher";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

// NEED TO ADD EXTRA CLASSES FOR WHEN WE ARE LOGGED IN
export default function BreweryCard({ brewery }) {
  const [count, setCount] = useState(0);

  const getReviewCount = useCallback(async () => {
    try {
      const response = await fetcher(`/api/review/count/${brewery.obdb_id}`);
      setCount(response);
    } catch (e) {
      toast.error(`Could not count reviews for ${brewery.name}`);
    }
  }, [brewery.name, brewery.obdb_id]);

  useEffect(() => {
    getReviewCount();
  }, [count, getReviewCount]);

  return (
    <BrewCardStyles>
      <div className="brewcard__hero">
        <div className="brewcard__actions">
          <div className="brewcard__action brewcard__action--count">
            <SvgReview />
            <span> {count}</span>
          </div>
        </div>
        <Image
          src={brewery?.photo || brewimg}
          alt={brewery.name}
          layout="fill"
        />
        <Link href={`/breweries/${brewery.obdb_id}`} passHref>
          <Title>{brewery.name}</Title>
        </Link>
      </div>
      <div className="brewcard__details">
        <p>{printAddress(brewery)}</p>
      </div>
    </BrewCardStyles>
  );
}

BreweryCard.propTypes = {
  brewery: PropTypes.object,
};
