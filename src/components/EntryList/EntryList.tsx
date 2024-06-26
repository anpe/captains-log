import Entry from "../Entry/Entry";
import { Entry as EntryType } from "../../models/entry.model";
export default function EntryList({ entries }: { entries: EntryType[] }) {
  return (
    <>
      <ul>
        <div className="m-2 p-2 text-xs">
          <strong>1 WEEK AGO</strong>
        </div>
        {entries?.map((entry) => (
          <Entry key={entry.id} entry={entry}></Entry>
        )) || []}
      </ul>
    </>
  );
}
