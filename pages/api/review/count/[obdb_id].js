import { countReviewsByBreweryId } from "@/lib/db/review";
import database from "@/lib/middlewares/database";
import ncOpts from "@/lib/middlewares/ncOpts";
import nextConnect from "next-connect";

const handler = nextConnect(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const reviewCount = await countReviewsByBreweryId(req.db, req.query.obdb_id);

  res.json(reviewCount);
});

export default handler;
