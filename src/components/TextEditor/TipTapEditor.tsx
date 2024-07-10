import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Typography } from "@tiptap/extension-typography";
import { Document } from "@tiptap/extension-document";
import { Heading } from "@tiptap/extension-heading";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
  clearSaveInterval,
  getCurrentEntryId,
  setEntryList,
  setSaveInterval,
} from "../../stores/journalSlice";
import { RootState } from "../../stores/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Entry as EntryType, EntryListItem } from "../../types/entry.type";
import { ENTRY_SAVE_INTERVAL } from "../../constants/constants";

const TiptapEditor = ({ isOpen }: { isOpen: boolean }) => {
  const state: RootState = useSelector((state: RootState) => state);
  const currentEntryId = getCurrentEntryId(state);
  const dispatch = useDispatch();

  const DocumentWithTitle = Document.extend({
    content: "title block+",
  });

  const Title = Heading.extend({
    name: "title",
    group: "title",
    parseHTML: () => [{ tag: "h1:first-child" }],
  }).configure({ levels: [1] });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
        heading: false,
      }),
      DocumentWithTitle,
      Title,
      Heading,
      Typography,
      Markdown,
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: ({ node }) => {
          if (node.type.name === "title") {
            return "What's the title?";
          }

          return "What's on your mind?";
        },
      }),
    ],
    content: "",
  });

  useEffect(() => {
    loadEntry(editor, currentEntryId);
    startSaveInterval(editor, currentEntryId);

    return () => {
      dispatch(clearSaveInterval());
      saveEntry(currentEntryId, editor);
    };
  }, [currentEntryId]);

  const saveEntry = (id: string, editor: Editor | null) => {
    const title = getTitle(editor?.getJSON());
    window.databaseAPI.updateEntry({
      id: id,
      title: title,
      content: JSON.stringify(editor?.getJSON()),
    });
  };

  const startSaveInterval = (
    editor: Editor | null,
    entryId: string,
  ) => {
    if (entryId) {
      dispatch(
        setSaveInterval(
          setInterval(() => {
            saveEntry(entryId, editor);
          }, ENTRY_SAVE_INTERVAL),
        ),
      );
    }
  };

  const loadEntry = (editor: Editor | null, id: string) => {
    window.databaseAPI.getEntry(id).then((result: EntryType) => {
      if (result) {
        let parsedJSON;
        try {
          parsedJSON = JSON.parse(result?.content || "");
        } catch {
          console.log("could not parse");
        }
        editor?.commands.setContent(parsedJSON || result?.content);
      }
    });
  };

  const getTitle = (node: JSONContent | undefined) => {
    const titleNode = node?.content?.find(
      (node: JSONContent) => node.type === "title",
    );
    const titleTextNode = titleNode?.content?.find(
      (node: JSONContent) => node.type === "text",
    );
    return titleTextNode?.text || "";
  };

  const updateEntryList = (entryList: EntryListItem[], title: string) => {
    const updatedEntryList = entryList.map((entry) => {
      if (entry.id === currentEntryId) {
        return {
          ...entry,
          title,
        };
      }
      return entry;
    });
    dispatch(setEntryList(updatedEntryList));
  };

  return (
    <EditorContent
      id="editor"
      editor={editor}
      className={`transition: fixed left-0 right-0 z-10 h-full overflow-auto border-t-0 bg-zinc-700 p-10 text-white duration-500 ${
        isOpen ? "left-[calc(2.75rem+20rem)]" : "left-11"
      }`}
    />
  );
};

export default TiptapEditor;
