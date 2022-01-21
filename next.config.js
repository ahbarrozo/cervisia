require("dotenv").config();

module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    MAPBOX_KEY: process.env.MAPBOX_KEY,
    MAPBOX_STYLE: process.env.MAPBOX_STYLE,
  },
};
