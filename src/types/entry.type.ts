export type Entry = {
  id: string;
  createdOn: string;
  updatedOn: string;
  title: string;
  content?: string;
};

export type EntryUpdate = Partial<Entry> & Pick<Entry, "id">;

export type EntryListItem = Partial<Entry> & Pick<Entry, "id" | "createdOn" | "title">;
