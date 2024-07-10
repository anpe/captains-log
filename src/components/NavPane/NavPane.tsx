import { useEffect, useState } from "react";
import NavPaneBar from "./NavPaneBar";
import NavPaneBarButton from "./NavPaneBarButton";
import NavPaneContent from "./NavPaneContent";
import NavTabContent from "./NavTabContent";
import { Entry as EntryType } from "../../types/entry.type";
import EntryList from "../EntryList/EntryList";
import { getCurrentEntryId, getEntryList, setEntryList } from "../../stores/journalSlice";
import { RootState } from "../../stores/store";
import { useDispatch, useSelector } from "react-redux";

export default function NavPane() {
  const [activeTab, setActiveTab] = useState("");
  const state: RootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const entryList = getEntryList(state);
  const currentEntryId = getCurrentEntryId(state);

  const defaultTab = "listView";

  useEffect(() => {
    setActiveTab(defaultTab);
    window.databaseAPI.getEntryList().then((entryList: EntryType[]) => {
      dispatch(setEntryList(entryList));
    });
  }, [defaultTab, currentEntryId]);

  return (
    <div className="flex flex-col">
      <NavPaneBar>
        <NavPaneBarButton
          tabId="listView"
          setActiveTab={(tabId: string) => {
            setActiveTab(tabId);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="hover:white h-6 w-6 hover:rounded hover:bg-zinc-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </NavPaneBarButton>
        <NavPaneBarButton
          tabId="calendarView"
          setActiveTab={(tabId: string) => {
            setActiveTab(tabId);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </NavPaneBarButton>
      </NavPaneBar>
      <NavPaneContent>
        <NavTabContent tabId="listView" activeTab={activeTab}>
          {entryList.length ? (
            <EntryList entryListItems={entryList}></EntryList>
          ) : (
            "No Entries"
          )}
        </NavTabContent>
        <NavTabContent tabId="calendarView" activeTab={activeTab}>
          CALENDAR
        </NavTabContent>
      </NavPaneContent>
    </div>
  );
}
