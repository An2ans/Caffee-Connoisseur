import table, { findRecordsById, getRecords } from "../../lib/airtable";

const voteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id) {
        const records = await findRecordsById(id);
        if (records.length !== 0) {
          const record = records[0];
          const calculateScore = parseInt(record.score) + 1;
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                score: calculateScore,
              },
            },
          ]);
          if (updateRecord) {
            const updatedRecord = getRecords(updateRecord);
            res.status(200);
            res.json(updatedRecord);
          }
        } else {
          res.json({ error: "record does not exist" }, id);
          res.status(400);
        }
      } else {
        res.status(400);
        res.json({ error: "id is missing" });
      }
    } catch (e) {
      res.status(500);
      res.json({ error: "there was an error when voting", e });
    }
  }
};

export default voteCoffeeStoreById;
