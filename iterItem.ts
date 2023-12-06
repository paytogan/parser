//import { Database, Parser, parseSingleItem } from "shared";

const iterateItems = async (
  database: Database,
  isNew: boolean,
  parseUrl: string,
) => {
  let i = 0;
  for await (let doc of isNew
    ? Parser.find({ isNew: true, status: "pending" })
    : Parser.find({ status: "all" })) {
    try {
      if (doc.item === undefined) continue;
      console.log(`[Update] -> Item #${i}`);
      await parseSingleItem(doc, database, parseUrl, 10);
    } catch (e) {
      console.log("[Error] -> ", e);
    }
    i++;
    //await sleep(200);
  }
};

export default iterateItems;
