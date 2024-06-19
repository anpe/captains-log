import Database, { Statement } from "better-sqlite3";
import { Entry } from "../models/Entry";
const db = new Database("captains-log.db");
db.pragma("journal_mode = WAL");
db.prepare(
  "CREATE TABLE IF NOT EXISTS entries (id INT PRIMARY KEY, create_date DATETIME DEFAULT CURRENT_TIMESTAMP, title TEXT, content TEXT)",
).run();

export const addEntry = (entry: Entry): Statement=> {
  const statement = db.prepare("INSERT INTO entries (id, date, title, content) VALUES (?, ?, ?, ?)");
  statement.run(entry.id, entry.date, entry.title, entry.content?.data || '');
  return statement;
}

export const getEntryList = () => {
  const entryList = db.prepare("SELECT *, content FROM entries").all();
  console.log(entryList);
  return entryList;
}

export const getEntry = (id: string) => {
  const stmt2 = db.prepare("SELECT * FROM entries WHERE id = ?");
  const row = stmt2.get(id);
  console.log(row);
}
