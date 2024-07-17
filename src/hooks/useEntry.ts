import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearSaveInterval,
  setActiveEntryId,
  setSaveInterval,
} from "../stores/journalSlice";
import { ENTRY_SAVE_INTERVAL } from "../constants/constants";
import { Editor, JSONContent } from "@tiptap/react";
import { Entry as EntryType } from "../types/entry.type";

export function useEntry(activeEntryId: string, editor: Editor | null) {
  const dispatch = useDispatch();

  useEffect(() => {
    startSaveInterval();
    return () => {
      dispatch(clearSaveInterval());
    };
  }, [activeEntryId]);

  useEffect(() => {
    loadEntry();
    return () => {
      saveEntry();
    };
  }, [activeEntryId]);

  const loadEntry = () => {
    window.databaseAPI.getEntry(activeEntryId).then((result: EntryType) => {
      if (result) {
        let parsedJSON;
        try {
          parsedJSON = JSON.parse(result?.content || "");
        } catch {
          console.log("Could not parse entry");
        }
        if (result.content !== JSON.stringify(editor?.getJSON())) {
          editor?.commands.setContent(parsedJSON || result?.content);
        }
      } else {
        console.log(`Could not find entry for id: ${activeEntryId}`);
      }
    });
  };

  const saveEntry = () => {
    if (editor?.getJSON()) {
      const title = getTitle();
      window.databaseAPI.updateEntry({
        id: activeEntryId,
        title: title,
        content: JSON.stringify(editor?.getJSON()),
      });
    }
  };

  const addEntry = () => {
    window.databaseAPI
      .addEntry(getTitle(), { data: JSON.stringify(editor?.getJSON()) })
      .then((id) => {
        dispatch(setActiveEntryId(id));
      });
  };

  const startSaveInterval = () => {
    dispatch(
      setSaveInterval(
        setInterval(() => {
          saveEntry();
        }, ENTRY_SAVE_INTERVAL),
      ),
    );
  };

  const getTitle = () => {
    const editorNode = editor?.getJSON();
    const titleNode = editorNode?.content?.find(
      (node: JSONContent) => node.type === "title",
    );
    const titleTextNode = titleNode?.content?.find(
      (node: JSONContent) => node.type === "text",
    );
    return titleTextNode?.text || "";
  };

  return { getTitle, saveEntry, addEntry };
}
