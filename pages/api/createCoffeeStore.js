import table, { getRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, neighborhood, score, imgUrl } = req.body;

    //find the record//

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = getRecords(findCoffeeStoreRecords);
          res.json(records[0]);
        } else {
          //create new records //

          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  neighborhood,
                  address,
                  score,
                  imgUrl,
                },
              },
            ]);
            const records = getRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ error: "name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ error: "id is missing" });
      }
    } catch (error) {
      console.log("There was an error creating or finding the store", error);
      res.json(error);
      res.status(500);
    }
  }
};

export default createCoffeeStore;
