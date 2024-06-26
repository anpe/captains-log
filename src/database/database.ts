import Database, { Statement } from "better-sqlite3";
import { Content } from "../models/content.model";
import { Entry as EntryType } from "../models/entry.model";
const db = new Database("captains-log.db");
db.pragma("journal_mode = WAL");
db.prepare(
  `
    CREATE TABLE 
    IF NOT EXISTS entries 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
      createdOn DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
      title TEXT,
      content TEXT)
  `,
).run();

const addEntry = (title: string, content: Content): Statement => {
  const statement = db.prepare(
    "INSERT INTO entries ( title, content) VALUES ( ?, ?)",
  );
  statement.run(title, content?.data || "");
  return statement;
};

const getEntryList = (): EntryType[] => {
  const entryList = db.prepare("SELECT *, content FROM entries").all();
  console.debug(`Retrieved EntryList: ${entryList}`);
  return entryList as EntryType[];
};

const getEntry = (id: string): EntryType => {
  const statement = db.prepare("SELECT * FROM entries WHERE id = ?");
  const row = statement.get(id);
  console.debug(`Retrieved Entry: ${JSON.stringify(row)}`);
  return row as EntryType;
};

const updateEntryTitle = (id: string, updatedTitle: string) => {
  const query = "UPDATE entries SET title = ? WHERE id = ?";
  const statement = db.prepare(query);
  statement.run(id, updatedTitle);
};

const updateEntryContent = (id: string, updatedContent: string) => {
  console.log("SAVING Edddntry", id, updatedContent);
  const query = "UPDATE entries SET content = ? WHERE id = ?";
  const statement = db.prepare(query);
  statement.run(updatedContent, id);
};

export default {
  addEntry,
  getEntryList,
  getEntry,
  updateEntryTitle,
  updateEntryContent,
};
