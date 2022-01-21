import { findBreweriesPagination } from "@/lib/db/brewery";
import database from "@/lib/middlewares/database";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(database);
handler.get(async (req, res) => {
  let page;
  req.query.page ? (page = parseFloat(req.query.page)) : (page = 1);
  const limit = 12;

  const [breweries, count] = await findBreweriesPagination(req.db, page, limit);
  console.log(breweries, count);
  const pages = Math.ceil(count / limit);

  if (!breweries) {
    res.status(404).end();
  }

  res.status(200).json({
    breweries,
    page,
    pages,
    count,
  });
});

export default handler;
