// give full address
export default function printAddress(brewery) {
  let fullAddress = `${brewery.location.address}, ${brewery.location.city}`;
  if (brewery.location.county_province) {
    fullAddress += `, ${brewery.location.county_province}`;
  }
  if (brewery.location.state) {
    fullAddress += `, ${brewery.location.state}`;
  }
  return fullAddress;
}
