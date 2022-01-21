import nextConnect from "next-connect";
import ncOpts from "@/lib/middlewares/ncOpts";
import database from "@/lib/middlewares/database";
import validateBody from "@/lib/middlewares/validateBody";
import ValidateProps from "@/lib/middlewares/ValidateProps";
import { insertReview } from "@/lib/db/review";

const handler = nextConnect(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: "object",
    properties: {
      text: ValidateProps.review.text,
      rating: ValidateProps.review.rating,
    },
    required: ["text", "rating"],
    additionalProperties: true,
  }),
  async (req, res) => {
    console.log(req.body);
    let { author, brewery, created, text, rating } = req.body;

    await insertReview(req.db, {
      author,
      brewery,
      created,
      text,
      rating,
    });

    res.status(200).end();
  }
);

export default handler;
