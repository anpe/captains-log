import EntryListItem from "../EntryListItem/EntryListItem";
import { EntryListItem as EntryListItemType} from "../../types/entry.type";
export default function EntryList({ entryListItems }: { entryListItems: EntryListItemType[] }) {
  return (
    <ul>
      <div className="m-2 p-2 text-xs">
        <strong>1 WEEK AGO</strong>
      </div>
      {entryListItems?.map((entryListItem) => <EntryListItem key={entryListItem.id} entryListItem={entryListItem}></EntryListItem>)}
    </ul>
  );
}
