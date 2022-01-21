/* eslint-disable camelcase */
//import { useRouter } from "next/router";
import { useCurrentUser } from "@/lib/hooks/useUser";
import { useCallback, useState } from "react";

import toast from "react-hot-toast";
import fetcher from "@/lib/fetcher";

import CForm from "@/components/styles/CForm";
import { Button, FloatingLabel } from "react-bootstrap";

export default function CreateReview({ brewery }) {
  const { data: { user } = {} } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  //const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user) toast.error("You must be logged in to write a review.");
      else {
        try {
          setIsLoading(true);
          const body = {
            author: user.username,
            brewery: brewery.obdb_id,
            text: e.currentTarget.text.value,
            rating: parseInt(e.currentTarget.rating.value),
          };
          await fetcher("/api/review/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          toast.success("Cheers for the review! 🍻");
          //  router.replace(`/breweries/${obdb_id}`);
        } catch (e) {
          toast.error(e.message);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [brewery, user]
  );

  return (
    <CForm onSubmit={handleSubmit}>
      <FloatingLabel className="mb-3" label="Your review" controlId="text">
        <CForm.Control
          as="textarea"
          rows={5}
          placeholder="Your review"
          aria-describedby="descText"
        />
        <CForm.Text id="descText" muted>
          Tell us about your experience: beers, service, food, ambiance, etc.
        </CForm.Text>
      </FloatingLabel>

      <CForm.Group className="mb-3" controlId="rating">
        <CForm.Label>Rating</CForm.Label>
        <div className="reviewer__meta">
          <div className="reviewer__stars">
            {[5, 4, 3, 2, 1].map((num) => (
              <>
                <input
                  type="radio"
                  key={num}
                  required
                  id={`star${num}`}
                  name="rating"
                  value={num}
                />
                <label htmlFor={`star${num}`}>{num} Stars</label>
              </>
            ))}
          </div>
        </div>
      </CForm.Group>

      <Button variant="warning" type="submit" disabled={isLoading}>
        Save
      </Button>
    </CForm>
  );
}
