import { LIMIT } from "@/lib/constants";
import { findReviewsByBreweryIdPagination } from "@/lib/db/review";
import database from "@/lib/middlewares/database";
import ncOpts from "@/lib/middlewares/ncOpts";
import nextConnect from "next-connect";

const handler = nextConnect(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  let limit, page;

  if (!req.query.brewery_id) return res.json([]);
  req.query.limit ? (limit = parseInt(req.query.limit)) : (limit = LIMIT);
  req.query.page ? (page = parseInt(req.query.page)) : 1;

  const reviews = await findReviewsByBreweryIdPagination(
    req.db,
    req.query.brewery_id,
    page,
    limit
  );

  res.json(reviews);
});

export default handler;
