import nc from "next-connect";
import slug from "slug";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import { findUserByEmail, findUserByUsername, insertUser } from "@/lib/db/user";
import authMiddleware from "@/lib/middlewares/authMiddleware";
import database from "@/lib/middlewares/database";
import validateBody from "@/lib/middlewares/validateBody";
import ValidateProps from "@/lib/middlewares/ValidateProps";
import ncOpts from "@/lib/middlewares/ncOpts";

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: "object",
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      password: ValidateProps.user.password,
      email: ValidateProps.user.email,
    },
    required: ["username", "name", "password", "email"],
    additionalProperties: false,
  }),
  ...authMiddleware,
  async (req, res) => {
    let { username, name, email, password } = req.body;
    username = slug(req.body.username, "_");
    email = normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      gmail_convert_googlemaildotcom: false,
      outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
    });
    if (!isEmail(email)) {
      res.status(400).json({ error: { message: "Invalid e-mail address." } });
      return;
    }
    if (await findUserByEmail(req.db, email)) {
      res
        .status(403)
        .json({ error: { message: "E-mail address already taken." } });
      return;
    }
    if (await findUserByUsername(req.db, username)) {
      res.status(403).json({ error: { message: "Username already taken." } });
      return;
    }
    const user = await insertUser(req.db, {
      email,
      originalPassword: password,
      name,
      username,
    });
    req.logIn(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        user,
      });
    });
  }
);

export default handler;
