import nextConnect from "next-connect";
import ncOpts from "@/lib/middlewares/ncOpts";
import database from "@/lib/middlewares/database";
import slug from "slug";
import validateBody from "@/lib/middlewares/validateBody";
import ValidateProps from "@/lib/middlewares/ValidateProps";
import { insertBrewery } from "@/lib/db/brewery";

const handler = nextConnect(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: "object",
    properties: {
      name: ValidateProps.brewery.name,
      description: ValidateProps.brewery.description,
      brewery_type: ValidateProps.brewery.brewery_type,
      website_url: ValidateProps.brewery.website_url,
      phone: ValidateProps.brewery.phone,
      tags: ValidateProps.brewery.tags,
      location: ValidateProps.brewery.location,
    },
    required: ["author", "name", "location"],
    additionalProperties: true,
  }),
  async (req, res) => {
    console.log(req.body);
    let {
      author,
      name,
      description,
      brewery_type,
      website_url,
      phone,
      tags,
      location,
    } = req.body;
    const obdb_id = slug(name, "-") + "-" + slug(location.city, "-");

    /* TODO: LOOK FOR DUPLICATES
    if (await findBreweryByName(req.db, name)) {
      res
        .status(403)
        .json({ error: { message: "There is already a brewery with that name." } });
      return;
    }
*/
    await insertBrewery(req.db, {
      obdb_id,
      name,
      description,
      author,
      brewery_type,
      website_url,
      phone,
      tags,
      location,
    });

    res.status(201).json({ obdb_id });
  }
);

export default handler;
