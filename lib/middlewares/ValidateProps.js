const ValidateProps = {
  user: {
    username: { type: "string", minLength: 4, maxLength: 20 },
    name: { type: "string", minLength: 1, maxLength: 50 },
    password: { type: "string", minLength: 8 },
    email: { type: "string", minLength: 1 },
  },
  brewery: {
    name: { type: "string", minLength: 1, maxLength: 50 },
    description: { type: "string", maxLength: 200 },
    brewery_type: { type: "string" },
    website_url: { type: "string", maxLength: 50 },
    phone: { type: "string", minLength: 6, maxLength: 15 },
    tags: { type: "array", uniqueItems: true },
    location: {
      type: "object",
      properties: {
        type: { type: "string" },
        coordinates: {
          type: "array",
          items: [{ type: "number" }, { type: "number" }],
          minItems: 2,
          maxItems: 2,
        },
        address: { type: "string", minLength: 1, maxLength: 50 },
        city: { type: "string", minLength: 1, maxLength: 50 },
        state: { type: "string" },
        county_province: { type: "string" },
        country: { type: "string", minLength: 1, maxLength: 50 },
      },
    },
  },
  review: {
    text: { type: "string", minLength: 1, maxLength: 500 },
    rating: { type: "number", minimum: 1, maximum: 5 },
  },
};

export default ValidateProps;
