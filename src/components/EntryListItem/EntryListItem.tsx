import { useDispatch } from "react-redux";
import { setActiveEntryId } from "../../stores/journalSlice";
import { EntryListItem as EntryListItemType} from "../../types/entry.type";
export default function EntryListItem({ entryListItem }: { entryListItem: EntryListItemType }) {
  const dispatch = useDispatch();
  return (
    <li key={entryListItem.id} onClick={() => dispatch(setActiveEntryId(entryListItem.id))}>
      <div className="m-2 cursor-default select-none p-2 hover:rounded hover:bg-zinc-700 hover:text-white">
        <h4>
          <strong>{entryListItem.title}</strong>
        </h4>
        <h5>{entryListItem.createdOn?.toString()}</h5>
        <p className="text-sm"></p>
      </div>
    </li>
  );
}
