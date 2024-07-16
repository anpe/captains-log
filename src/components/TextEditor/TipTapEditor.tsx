import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Typography } from "@tiptap/extension-typography";
import { Document } from "@tiptap/extension-document";
import { Heading } from "@tiptap/extension-heading";
import { Placeholder } from "@tiptap/extension-placeholder";
import { getActiveEntryId, setActiveEntryId } from "../../stores/journalSlice";
import { RootState } from "../../stores/store";
import { useDispatch, useSelector } from "react-redux";
import { useEntry } from "../../hooks/useEntry";
import {useRef, useState} from "react";


const TiptapEditor = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const state: RootState = useSelector((state: RootState) => state);
  const activeEntryId = getActiveEntryId(state);
  const DocumentWithTitle = Document.extend({
    content: "title block+",
  });
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    return function(...args: Parameters<T>) {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const Title = Heading.extend({
    name: "title",
    group: "title",
    parseHTML: () => [{ tag: "h1:first-child" }],
  }).configure({ levels: [1] });


  const createNewEntry = debounce(function()  {
    if (!activeEntryId) {
      // TODO: after new entry is created and loaded, cursor moves to next line
      addEntry();
    }
  }, 1000);

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
            return "Enter a title";
          }

          return "What's on your mind?";
        },
      }),
    ],
    content: "",
    onUpdate:() => {
      createNewEntry();
    }
  });

  const { addEntry } = useEntry(activeEntryId, editor);

  return (
    <EditorContent
      id="editor"
      editor={editor}
      className={`transition: fixed left-0 right-0 z-10 h-full overflow-auto border-t-0 bg-zinc-700 p-10 text-white duration-500 ${
        isSidebarOpen ? "left-[calc(2.75rem+20rem)]" : "left-11"
      }`}
    />
  );
};

export default TiptapEditor;
