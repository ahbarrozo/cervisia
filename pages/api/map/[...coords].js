import { findNearestBreweries } from "@/lib/db/brewery";
import database from "@/lib/middlewares/database";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(database);
handler.get(async (req, res) => {
  const coordinates = req.query.coords.map(parseFloat);
  const breweries = await findNearestBreweries(req.db, coordinates);

  res.status(200).json({
    breweries,
  });
});

export default handler;
