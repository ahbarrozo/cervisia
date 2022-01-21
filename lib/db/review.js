import { LIMIT } from "../constants";

export async function findReviewsByBreweryId(db, obdb_id) {
  return db
    .collection("reviews")
    .find({ obdb_id }, { projection: { _id: 0 } })
    .sort({
      created: -1,
    })
    .toArray();
}

export async function countReviewsByBreweryId(db, obdb_id) {
  return db.collection("reviews").find({ brewery: obdb_id }).count();
}

export async function findReviewsByBreweryIdPagination(
  db,
  obdb_id,
  page = 1,
  limit = LIMIT
) {
  const skip = page * limit; // skipping reviews from previous pages
  return db
    .collection("reviews")
    .find({ brewery: obdb_id }, { projection: { _id: 0 } })
    .sort({
      created: -1,
    })
    .limit(limit)
    .skip(skip)
    .toArray();
}

export async function insertReview(
  db,
  { created, author, brewery, text, rating }
) {
  const review = {
    created,
    author,
    brewery,
    text,
    rating,
  };
  return db.collection("reviews").insertOne(review);
}
