/* eslint-disable camelcase */
import React from "react";
// import { useRouter } from "next/router";
import nextConnect from "next-connect";
import { findBreweryById } from "@/lib/db/brewery";
import database from "@/lib/middlewares/database";
import Brewery from "@/components/Brewery";

export default function BreweryPage({ brewery, reviews }) {
  return <Brewery brewery={brewery} reviews={reviews} />;
}

export async function getServerSideProps(context) {
  await nextConnect().use(database).run(context.req, context.res);

  const brewery = await findBreweryById(context.req.db, context.params.obdb_id);
  return { props: { brewery } };
}
