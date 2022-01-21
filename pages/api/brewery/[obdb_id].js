import nextConnect from "next-connect";
// eslint-disable-next-line no-unused-vars
import ncOpts from "@/lib/middlewares/ncOpts";
import database from "@/lib/middlewares/database";
import { findBreweryById } from "@/lib/db/brewery";
import { findReviewsByBreweryIdPagination } from "@/lib/db/review";
import { LIMIT } from "@/lib/constants";

const handler = nextConnect(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  let limit, page;
  typeof req.query.page === "number"
    ? (limit = parseInt(req.query.limit))
    : (limit = LIMIT);
  typeof req.query.page === "number"
    ? (page = parseInt(req.query.page))
    : (page = 0);
  console.log({ page });

  const brewery = await findBreweryById(req.db, req.query.obdb_id);
  const reviews = await findReviewsByBreweryIdPagination(
    req.db,
    req.query.obdb_id,
    page,
    limit
  );
  res.status(200).json({
    brewery,
    reviews,
  });
});

//TO DO
// .post(async (req, res) => {
// creating new object, and await promise return
// to be able to use obdb_id for redirecting
// TO BE ADDED LATER:
// req.body.author = req.user._id;
//  console.log(req.body);
//  const reqBody = JSON.parse(req.body);
//  reqBody.author = "Ghost";
//  console.log({ newBrewery: reqBody });
//  await new Brewery(reqBody).save();
/* req.flash(
      'success',
      `Successfully created entry for ${brewery.name}. 
      Care to leave a review?`
    ); */
//   console.log("New entry created. Check DB to make sure it is saved");
//   res.status(200).json({
//     brewery: req.body,
//   });
// });

export default handler;
