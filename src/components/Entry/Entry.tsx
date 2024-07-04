import { useDispatch } from "react-redux";
import { setCurrentEntry } from "../../stores/journalSlice";
import { Entry as EntryType } from "../../types/entry.type";
export default function Entry({ entry }: { entry: EntryType }) {
  const dispatch = useDispatch();

  return (
    <li key={entry.id} onClick={() => dispatch(setCurrentEntry(entry.id))}>
      <div className="m-2 cursor-default select-none p-2 hover:rounded hover:bg-zinc-700 hover:text-white">
        <h4>
          <strong>{entry.title}</strong>
        </h4>
        <h5>{entry.createdOn?.toString()}</h5>
        <p className="text-sm"></p>
      </div>
    </li>
  );
}
