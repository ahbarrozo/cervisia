import { LIMIT } from "../constants";

export async function findBreweryById(db, obdbId) {
  return db
    .collection("breweries")
    .findOne({ obdb_id: obdbId }, { projection: { _id: 0 } });
}

/* Function to obtain list of nearby breweries. 10 km 
   distance, up to 20 nearest Breweries by default. */
export async function findNearestBreweries(
  db,
  coordinates,
  limit = LIMIT,
  maxDist = 10000
) {
  const query = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates,
        },
        $maxDistance: maxDist, // 10 km by default
      },
    },
  };

  return db
    .collection("breweries")
    .find(query, { name: 1, obdb_id: 1, description: 1, location: 1, photo: 1 })
    .limit(limit)
    .toArray();
}

export async function findNearBreweriesPagination(
  db,
  coordinates,
  page = 1,
  limit = LIMIT,
  maxDist = 10e7
) {
  const skip = page * limit; // skipping breweries from previous pages
  const query = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates,
        },
        $maxDistance: maxDist, // 10 km by default
      },
    },
  };
  return db
    .collection("breweries")
    .find(query, { name: 1, obdb_id: 1, description: 1, location: 1, photo: 1 })
    .limit(limit)
    .skip(skip)
    .toArray();

  //  const countPromise = db.collection("breweries").count();
  //  const [breweries, count] = await Promise.all([
  //    breweriesPromise,
  //    countPromise,
  //  ]);
  //
  //  return [breweries, count];
}

export async function findBreweriesSearch(db, input, limit = 5) {
  /*  In our Schema, we indexed 'name', 'address' and 'description' as text. So 
      we will use the text tag in mongoDB find to look at both at the same time. 
      A score will be assigned based on the relevance of the word being searched 
      (like how many times it was included in the name and description). Finally, 
      limit to the 5 best cases. */
  return db
    .collection("breweries")
    .find(
      {
        $text: {
          $search: input,
        },
      },
      {
        score: {
          $meta: "textScore",
        },
      }
    )
    .sort({
      score: {
        $meta: "textScore",
      },
    })
    .limit(limit)
    .toArray();
}

export async function insertBrewery(
  db,
  {
    obdb_id,
    name,
    description,
    author,
    brewery_type,
    website_url,
    phone,
    tags,
    location,
  }
) {
  const brewery = {
    obdb_id,
    name,
    description,
    author,
    brewery_type,
    website_url,
    phone,
    tags,
    location,
  };
  return db.collection("breweries").insertOne(brewery);
}
