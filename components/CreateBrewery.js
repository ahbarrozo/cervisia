/* eslint-disable camelcase */
import { useRouter } from "next/router";
import { useCurrentUser } from "@/lib/hooks/useUser";
import { useCallback, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import toast from "react-hot-toast";
import fetcher from "@/lib/fetcher";

import CForm from "@/components/styles/CForm";
import { Button, FloatingLabel } from "react-bootstrap";

/* The JSON from Mapbox is quite particular, with fields 
   like city and city including some indexes of search.
   This function parses the JSON to extract all the relevant 
   information. */
function parseReverseGeo({ result }) {
  let city, state, country, postcode;
  if (result.context) {
    result.context.forEach((v) => {
      if (v.id.indexOf("locality") >= 0) {
        city = v.text;
      }
      if (v.id.indexOf("postcode") >= 0) {
        postcode = v.text;
      }
      if (v.id.indexOf("region") >= 0) {
        state = v.text;
      }
      if (v.id.indexOf("country") >= 0) {
        country = v.text;
      }
    });
  }

  return {
    coordinates: result.center,
    address: (result.address ? `${result.address} ` : "") + result.text,
    city,
    state,
    postcode,
    country,
  };
}

export default function CreateBrewery() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 8,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const [brewData, setBrewData] = useState({ coordinates: [0, 0] });

  const handleResult = useCallback((result) => {
    setBrewData(parseReverseGeo(result));
  }, []);

  const { data: { user } = {} } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const choices = [
    "Wifi",
    "Open Late",
    "Family Friendly",
    "Vegan",
    "LGBT Friendly",
  ];

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  function handleCheckboxes() {
    const checkboxDiv = document.querySelector(".tags");
    const checkboxes = checkboxDiv.querySelectorAll("input:checked");
    const tags = [];
    checkboxes.forEach((checkbox) => tags.push(checkbox.value));

    return tags;
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user) toast.error("You must be logged in.");
      else {
        try {
          setIsLoading(true);
          const tags = handleCheckboxes();
          const body = {
            author: user.username,
            name: e.currentTarget.name.value,
            description: e.currentTarget.description.value,
            // photo: e.currentTarget.photo.value,
            brewery_type: e.currentTarget.brewery_type.value,
            website_url: e.currentTarget.website_url.value,
            location: {
              type: "Point",
              coordinates: brewData.coordinates,
              address: brewData.address,
              city: brewData.city,
              state: brewData.state,
              county_province: "",
              country: brewData.country,
            },
            phone: e.currentTarget.phone.value,
            tags,
          };
          const response = await fetcher("/api/breweries/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const { obdb_id } = response;
          toast.success("Cheers for the new brewery! Care to leave a review?");
          router.replace(`/breweries/${obdb_id}`);
        } catch (e) {
          toast.error(e.message);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [router, user, brewData]
  );

  return (
    <CForm encType="multipart/form-data" onSubmit={handleSubmit}>
      <FloatingLabel className="mb-3" label="Brewery name" controlId="name">
        <CForm.Control placeholder="Brewery name" aria-label="Brewery name" />
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Brewery Description"
        controlId="description"
      >
        <CForm.Control
          placeholder="Brewery description"
          aria-describedby="descText"
        />
        <CForm.Text id="descText" muted>
          Tell us about this brewery: beers, food, ambiance, etc.
        </CForm.Text>
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="photo">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          type="file"
          accept="image/gif, image/png, image/bmp, image/jpg"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <div style={{ height: "100vh" }}>
          <ReactMapGL
            ref={mapRef}
            {...viewport}
            width="auto"
            height="100%"
            mapStyle={process.env.MAPBOX_STYLE}
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={process.env.MAPBOX_KEY}
          >
            <Geocoder
              mapRef={mapRef}
              placeholder="Brewery address"
              onResult={handleResult}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.MAPBOX_KEY}
              position="top-left"
            />
          </ReactMapGL>
        </div>
      </Form.Group>

      <FloatingLabel className="mb-3" label="Website" controlId="website_url">
        <CForm.Control
          placeholder="Brewery website"
          aria-describedby="descWebsite"
          required
        />
        <CForm.Text id="descWebsite" muted>
          Write down their web address, Facebook, Instagram page or Twitter
          account
        </CForm.Text>
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Phone" controlId="phone">
        <CForm.Control
          placeholder="Brewery phone number"
          aria-label="Brewery phone number"
        />
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Brewery type"
        controlId="brewery_type"
      >
        <CForm.Select aria-label="Brewery type selection">
          <option value="brewpub">Brewpub</option>
          <option value="micro">Micro</option>
          <option value="taproom">Taproom</option>
          <option value="proprietor">Proprietor</option>
          <option value="regional">Regional</option>
          <option value="large">Large</option>
        </CForm.Select>
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="tags">
        <Form.Label>Tags</Form.Label>
        <ul className="tags">
          {choices.map((choice) => (
            <div key={choice} className="tag tag__choice">
              <input type="checkbox" id={choice} value={choice} />
              <label htmlFor={choice}>{choice}</label>
            </div>
          ))}
        </ul>
      </Form.Group>

      <Button variant="warning" type="submit" disabled={isLoading}>
        Save
      </Button>
      {/*       <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
      /> */}
    </CForm>
  );
}
