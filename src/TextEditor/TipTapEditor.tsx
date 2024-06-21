import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Typography } from "@tiptap/extension-typography";
import { getCurrentEntryId } from "../JournalSlice";
import { RootState } from "../stores/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Entry } from "../models/Entry";

const TiptapEditor = ({ isOpen }: { isOpen: boolean }) => {
  const state: RootState = useSelector((state: RootState) => state);

  /* tslint:disable-next-line */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const editor = useEditor({
    extensions: [StarterKit, Typography, Markdown],
    content: "",
  });

  useEffect(() => {
    window.databaseAPI
      .getEntry(getCurrentEntryId(state))
      .then((result: Entry) => {
        if (result) {
          editor?.commands.setContent(result?.content);
        }
      });
  }, [editor, getCurrentEntryId(state)]);

  const markdownOutput = editor?.storage.markdown.getMarkdown();
  console.log(markdownOutput);

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
