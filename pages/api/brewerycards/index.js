import { findNearBreweriesPagination } from "@/lib/db/brewery";
import database from "@/lib/middlewares/database";
import ncOpts from "@/lib/middlewares/ncOpts";
import nextConnect from "next-connect";

const handler = nextConnect(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  let limit, maxDist, page;

  req.query.limit ? (limit = parseInt(req.query.limit)) : (limit = 12);
  req.query.maxDist
    ? (maxDist = parseInt(req.query.maxDist))
    : (maxDist = 10e7);
  req.query.page ? (page = parseInt(req.query.page)) : 1;

  if (!req.query.coordinates) res.json({ breweries: [] });

  const coords = req.query.coordinates
    .split(",")
    .map((coord) => parseFloat(coord));
  const breweries = await findNearBreweriesPagination(
    req.db,
    coords,
    page,
    limit,
    maxDist
  );

  res.json(breweries);
});

export default handler;
