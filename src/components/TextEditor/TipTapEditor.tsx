import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Typography } from "@tiptap/extension-typography";
import { getCurrentEntryId } from "../../stores/journalSlice";
import { RootState } from "../../stores/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Entry as EntryType } from "../../models/entry.model";
import { current } from "@reduxjs/toolkit";

const TiptapEditor = ({ isOpen }: { isOpen: boolean }) => {
  const state: RootState = useSelector((state: RootState) => state);
  const currentEntryId = getCurrentEntryId(state);
  let saveInterval: NodeJS.Timer;
  /* tslint:disable-next-line */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const editor = useEditor({
    extensions: [StarterKit, Typography, Markdown],
    content: "",
  });

  useEffect(() => {
    console.log("CURRENT", currentEntryId);
    window.databaseAPI
      .getEntry(currentEntryId)
      .then((result: EntryType) => {
        if (result) {
          editor?.commands.setContent(result?.content);
          window.databaseAPI.updateEntryContent(
            currentEntryId,
            result?.content,
          );
        }
      });
  }, [editor, currentEntryId]);

  useEffect(() => {
    console.log("INTERVAL SddET");
    saveInterval = setInterval(() => {
      console.log("Entry Saved!!!!!!!", currentEntryId);
      console.log(editor?.getText());
      window.databaseAPI.updateEntryContent(currentEntryId, editor?.getText());
    }, 10000);
  }, [editor, currentEntryId]);

  useEffect(
    () => () => {
      clearInterval(saveInterval);
    },
    [],
  );

  // const markdownOutput = editor?.storage.markdown.getMarkdown();

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
