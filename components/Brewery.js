import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Title from "./styles/Title";
import brewimg from "../public/static/brewimg.png";
import printAddress from "@/lib/printAddress";
import BreweryStyles from "./styles/BreweryStyles";
import ReactMapGL, { Marker } from "react-map-gl";
import SvgBrewMark from "./Icons/BrewMark";
import { useCurrentUser } from "@/lib/hooks/useUser";
import CreateReview from "./CreateReview";
import Reviews from "./Reviews";

export default function Brewery({ brewery }) {
  const { data: { user } = {} } = useCurrentUser();
  const longitude = brewery.location.coordinates[0];
  const latitude = brewery.location.coordinates[1];
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 15,
  });
  return (
    <BreweryStyles>
      <div className="brewery">
        <div className="brewery__hero">
          <div className="brewery__image">
            <Image src={brewery?.photo || brewimg} alt={brewery.name} />
          </div>
          <Link
            className="title"
            href={`/breweries/${brewery.obdb_id}`}
            passHref
          >
            <Title>{brewery.name}</Title>
          </Link>
        </div>
      </div>
      <div className="brewery__details">
        <div className="brewery__map">
          <ReactMapGL
            {...viewport}
            width="auto"
            height="400px"
            mapStyle={process.env.MAPBOX_STYLE}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={process.env.MAPBOX_KEY}
          >
            <Marker
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-40}
              offsetTop={-50}
            >
              <div className="mapmark">
                <SvgBrewMark />
              </div>
            </Marker>
          </ReactMapGL>
        </div>
        <p className="brewery__location">{printAddress(brewery)}</p>
        {brewery.description ? <p>{brewery.description}</p> : ""}

        {brewery.tags ? (
          <ul className="tags">
            {brewery.tags.map((tag) => (
              <li key={tag} className="tag">
                <Link href={`/tags/${tag}`}>
                  <a className="tag__link">
                    <span className="tag__text">{tag}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        {user ? <CreateReview brewery={brewery} /> : ""}

        <Reviews brewery={brewery} />
      </div>
    </BreweryStyles>
  );
}
