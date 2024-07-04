export type Entry = {
  id: string;
  createdOn: string;
  updatedOn: string;
  title: string;
  content: string;
};

export type EntryUpdate = Partial<Entry> & Pick<Entry, "id">;
