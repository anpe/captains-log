import Database, { Statement } from "better-sqlite3";
import { Entry } from "../models/Entry";
import { Content } from "../models/Content";
const db = new Database("captains-log.db");
db.pragma("journal_mode = WAL");
db.prepare(
  "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, created_on DATETIME DEFAULT CURRENT_TIMESTAMP, updated_on DATETIME DEFAULT CURRENT_TIMESTAMP, title TEXT, content TEXT)",
).run();

const addEntry = (title: string, content: Content): Statement => {
  const statement = db.prepare(
    "INSERT INTO entries ( title, content) VALUES ( ?, ?)",
  );
  statement.run( title, content?.data || "");
  return statement;
};

const getEntryList = () => {
  const entryList = db.prepare("SELECT *, content FROM entries").all();
  console.log(entryList);
  return entryList;
};

const getEntry = (id: string) => {
  const statement = db.prepare("SELECT * FROM entries WHERE id = ?");
  const row = statement.get(id);
  console.log(row);
};

const updateEntry = (
  id: string,
  updatedTitle?: string,
  updatedContent?: string,
) => {
  let query = "UPDATE entries";
  if (updatedTitle !== undefined || updatedContent !== undefined) {
    query += "SET ";
    if (updatedTitle !== undefined) {
      query += "title = ?";
    }
    if (updatedContent !== undefined) {
      query += ", content = ? ";
    }
  }
  query += "WHERE id = ?";

  const statement = db.prepare(query);
  statement.run(id, updatedTitle, updatedContent);
};

export default { addEntry, getEntryList, getEntry, updateEntry };
