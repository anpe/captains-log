import Database, { Statement } from "better-sqlite3";
import { Content } from "../types/content.type";
import { Entry as EntryType, EntryUpdate } from "../types/entry.type";
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

const addEntry = (title: string, content: Content): number | bigint => {
  const statement = db.prepare(
    "INSERT INTO entries ( title, content) VALUES ( ?, ?)",
  );
  const info = statement.run(title, content?.data || "");
  return info.lastInsertRowid;
};

const getEntryList = (): EntryType[] => {
  const entryList = db
    .prepare("SELECT id, createdOn, title FROM entries ORDER BY createdOn DESC")
    .all();
  return entryList as EntryType[];
};

const getEntry = (id: string): EntryType => {
  const statement = db.prepare("SELECT * FROM entries WHERE id = ?");
  const row = statement.get(id);
  console.debug(`Retrieved Entry: ${JSON.stringify(row)}`);
  return row as EntryType;
};

const updateEntryTitle = (id: string, title: string) => {
  const query = "UPDATE entries SET title = ? WHERE id = ?";
  const statement = db.prepare(query);
  statement.run(id, title);
};

const updateEntryContent = (id: string, content: string) => {
  const query = "UPDATE entries SET content = ? WHERE id = ?";
  const statement = db.prepare(query);
  statement.run(content, id);
};

const updateEntry = (entry: EntryUpdate) => {
  if (entry.title != undefined && entry.content != undefined) {
    const query = "UPDATE entries SET title = ?, content = ? WHERE id = ?";
    const statement = db.prepare(query);
    statement.run(entry.title, entry.content, entry.id);
  } else if (entry.title !== undefined) {
    updateEntryTitle(entry.id, entry.title);
  } else if (entry.content !== undefined) {
    updateEntryContent(entry.id, entry.content);
  }
};

const getEntryByDate = (date: string): EntryType => {
  const stmt = db.prepare("SELECT * from entries WHERE DATE(createdOn) = ?");
  const row = stmt.get(date);
  return row as EntryType;
};

export default {
  addEntry,
  getEntryList,
  getEntry,
  getEntryByDate,
  updateEntry,
};
