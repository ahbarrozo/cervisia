import { findBreweriesSearch } from "@/lib/db/brewery";
import database from "@/lib/middlewares/database";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(database);
handler.get(async (req, res) => {
  const input = req.query.q;

  const breweries = await findBreweriesSearch(req.db, input);

  if (!breweries) {
    res.status(200).json({
      breweries: [],
    });
  }

  res.status(200).json({
    breweries,
  });
});

export default handler;
