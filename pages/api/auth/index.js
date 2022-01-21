import passport from "@/lib/middlewares/passport";
import database from "@/lib/middlewares/database";
import authMiddleware from "@/lib/middlewares/authMiddleware";
import ncOpts from "@/lib/middlewares/ncOpts";
import nc from "next-connect";

const handler = nc(ncOpts);

// DB, next-session, passport.initialize and .session
handler.use(database, ...authMiddleware);
handler.post(passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

handler.delete(async (req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

export default handler;
