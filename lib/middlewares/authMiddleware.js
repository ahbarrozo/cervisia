import passport from "./passport";
import session from "./session";

const authMiddleware = [session, passport.initialize(), passport.session()];

export default authMiddleware;
