import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Typography } from "@tiptap/extension-typography";
import { getEntry } from "../Entry/EntrySlice";
import { getCurrentEntryId } from "../JournalSlice";
import { RootState, store } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TiptapEditor = ({ isOpen }: { isOpen: boolean }) => {
  const state: RootState = useSelector((state: RootState) => state);

  /* tslint:disable-next-line */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const entry = getEntry(state, getCurrentEntryId(state)); // @ts-ignore
  const content = entry?.content?.data || "";
  const editor = useEditor({
    extensions: [StarterKit, Typography, Markdown],
    content: content,
  });

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [editor, content]);

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
