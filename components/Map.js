import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { WebMercatorViewport } from "react-map-gl";
import usePosition from "@/lib/hooks/usePosition";

import MapStyles from "./styles/MapStyles";
import SvgBrewMark from "./Icons/BrewMark";
import fetcher from "@/lib/fetcher";
import toast from "react-hot-toast";
import BreweryCard from "./BreweryCard";
import SvgUser from "./Icons/User";

/*  Custom Popup component that renders BreweryCard
    Offsetting was required to align the card. */
function BrewPopup({ brewery, closePopup }) {
  return (
    <Popup
      latitude={brewery.location.coordinates[1]}
      longitude={brewery.location.coordinates[0]}
      onClose={closePopup}
      closeButton={false}
      closeOnClick={true}
      offsetLeft={27}
    >
      <BreweryCard brewery={brewery} />`
    </Popup>
  );
}

/*  Custom Marker component that includes a function 
    to open popup upon clicking. */
function BrewMarker({ brewery, index, openPopup }) {
  return (
    <Marker
      latitude={brewery.location.coordinates[1]}
      longitude={brewery.location.coordinates[0]}
    >
      <div className="mapmark" onClick={() => openPopup(index)}>
        <SvgBrewMark />
      </div>
    </Marker>
  );
}

export default function Map() {
  /*  latitude, longitude: user coordinates
      viewport: mapbox object for rendering map
      nearBrews: Array of breweries within 10 km 
                 of user coordinates
      bounds: two points to set limits of the map 
      selectedMarker: index of selected Marker in 
                      the map, for showing Popup */
  const watch = true;
  const { latitude, longitude } = usePosition(watch);

  const [viewport, setViewport] = useState(null);
  const [nearBrews, setNearBrews] = useState([]);
  const [bounds, setBounds] = useState([[], []]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  /*  callback to find nearby breweries to be passed to useEffect
      Note the inversion of coordinate indexes. This is because 
      MongoDB also inverts them. Since our queries are done with 
      it, we choose to invert them here. */
  async function getResponse() {
    if (nearBrews.length > 0 || !longitude || !latitude) return;

    try {
      const response = await fetcher(`/api/map/${longitude}/${latitude}`);
      setNearBrews(response.breweries);
    } catch (e) {
      toast.error("Could not find nearby breweries");
    }
  }

  /* Creating a variable to allow for zoom into a region with markers.
     Here, we start with the first and last places on the list, and 
     will iterate later on the map function to draw the map. */
  function getNewBounds(newPoint) {
    if (!latitude || !longitude) return;
    if (bounds[0].length === 0 || bounds[1].length === 0) {
      return setBounds([
        [longitude, latitude],
        [longitude, latitude],
      ]);
    }

    const newBounds = [...bounds];
    if (newPoint[0] < bounds[0][0]) {
      newBounds[0][0] = newPoint[0];
      setBounds((newBounds) => [...newBounds]);
    }
    if (newPoint[0] > bounds[1][0]) {
      newBounds[1][0] = newPoint[0];
      setBounds((newBounds) => [...newBounds]);
    }

    if (newPoint[1] < bounds[0][1]) {
      newBounds[0][1] = newPoint[1];
      setBounds((newBounds) => [...newBounds]);
    }

    if (newPoint[1] > bounds[1][1]) {
      newBounds[1][1] = newPoint[1];
      setBounds((newBounds) => [...newBounds]);
    }
  }

  const closePopup = () => {
    setSelectedMarker(null);
  };

  const openPopup = (index) => {
    setSelectedMarker(index);
  };

  function makeMarkers(breweries) {
    return breweries.map((brew, index) => {
      return (
        <BrewMarker
          brewery={brew}
          index={index}
          key={index}
          openPopup={openPopup}
        />
      );
    });
  }

  useEffect(() => {
    getResponse();
    if (nearBrews.length > 0) {
      nearBrews.forEach((brew) => {
        getNewBounds(brew.location.coordinates);
      });
    }
    if (bounds[0].length === 2 && bounds[1].length === 2) {
      setViewport(() => {
        const newViewport = new WebMercatorViewport({
          width: 800,
          height: 800,
          latitude,
          longitude,
        }).fitBounds(bounds, {
          padding: 10,
        });
        return newViewport;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, nearBrews.length, bounds]);

  if (nearBrews === [] || !latitude || !longitude) return <div>Loading...</div>;
  return (
    <MapStyles>
      <div id="map">
        <ReactMapGL
          {...viewport}
          width="auto"
          height="800px"
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
              <SvgUser />
            </div>
          </Marker>

          {nearBrews.length > 0 && makeMarkers(nearBrews)}
          {nearBrews.length > 0 && selectedMarker !== null && (
            <BrewPopup
              index={selectedMarker}
              brewery={nearBrews[selectedMarker]}
              closePopup={closePopup}
            />
          )}
        </ReactMapGL>
      </div>
    </MapStyles>
  );
}
