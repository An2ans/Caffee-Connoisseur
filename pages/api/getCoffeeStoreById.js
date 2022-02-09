import { findRecordsById } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordsById(id);
      if (records.length !== 0) {
        res.status(200);
        res.json(records);
      } else {
        res.json({ error: "No records found" });
      }
    } else {
      res.status(400);
      res.json({ error: "id is missing" });
    }
  } catch (e) {
    res.status(500);
    res.json({ message: "something went wrong", e });
  }
};

export default getCoffeeStoreById;
