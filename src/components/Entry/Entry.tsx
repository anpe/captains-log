import { useDispatch } from "react-redux";
import { setCurrentEntry } from "../../stores/journalSlice";
import { Entry as EntryType } from "../../models/entry.model";
export default function Entry({ entry }: { entry: EntryType }) {
  const dispatch = useDispatch();
  const getTitle = (entry: EntryType): string => {
    const titleRegex = /^(.*)\n\n/m;
    const match = entry.content.match(titleRegex);
    if (match) {
      return match[0];
      console.log(`First line: ${title}`);
    } else {
      console.log("No match found.");
      return "";
    }
  };
  const title = getTitle(entry);

  return (
    <li key={entry.id} onClick={() => dispatch(setCurrentEntry(entry.id))}>
      <div className="m-2 cursor-default select-none p-2 hover:rounded hover:bg-zinc-700 hover:text-white">
        <h4>
          <strong>
            {entry.createdOn?.toString() || entry.created_on.toString()}
          </strong>
        </h4>
        <p className="text-sm">{title}</p>
      </div>
    </li>
  );
}
