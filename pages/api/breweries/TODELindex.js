import nc from "next-connect";
import connectDB from "../../../lib/mongodb";
import Brewery from "../../../models/Brewery";
// required for building Brewery model, which relies on it
// eslint-disable-next-line no-unused-vars
import Review from "../../../models/Review";

const handler = nc().get(async (req, res) => {
  const page = req.query.page || 1;
  const limit = 12;
  const skip = page * (limit - 1); // skipping initial breweries that won't be displayed given the page

  const breweriesPromise = Brewery.find()
    .skip(skip)
    .limit(limit)

    // TODO: potentially remove this attribute, sort otherwise
    .sort({ created: "desc" });
  const countPromise = Brewery.count();
  const [breweries, count] = await Promise.all([
    breweriesPromise,
    countPromise,
  ]);
  const pages = Math.ceil(count / limit);
  if (!breweries.length && skip) {
    res.redirect(`/breweries/page/${pages}`);
    return;
  }

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

export default connectDB(handler);
