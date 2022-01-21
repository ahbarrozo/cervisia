import nextConnect from "next-connect";
import middleware from "../../../lib/middlewares/middleware";

/*  Several things need to happen:

    1- Check DB connection (or connect)
    2- Get/create session with DB
    3- Initialize PassportJS authentication module
    4- Alter the request object to change the 'user' 
       value that is currently the session ID (from 
       the client cookie) into the true deserialized 
       user object (fetched from the DB)
*/
const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => res.json({ user: req.user }));

export default handler;
