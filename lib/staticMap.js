export default function staticMap(brewery) {
  if (!brewery.location || !brewery.location.coordinates) return "";

  const [lng, lat] = brewery.location.coordinates;
  return `https://api.mapbox.com/styles/v1/barrozoah/ckvmhsbn2kg3415mp28lsv9kf/static/url-https%3A%2F%2Fwww.mapbox.com%2Fimg%2Frocket.png(${lng},${lat})/${lng},${lat},15.00,0.00,0.00/800x300@2x?access_token=${process.env.MAP_KEY}`;
}
