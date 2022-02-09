const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Coffee-stores");

export default table;

export const findRecordsById = async (id) => {
  const records = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();
  return getRecords(records);
};

export const getRecords = (records) => {
  return records.map((record) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};
