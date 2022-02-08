var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Coffee-stores");

export default table;

export const getRecords = (records) => {
  return records.map((record) => {
    return {
      ...record.fields,
    };
  });
};
