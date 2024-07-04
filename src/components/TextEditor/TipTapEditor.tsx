import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Typography } from "@tiptap/extension-typography";
import { Document } from "@tiptap/extension-document";
import { Heading } from "@tiptap/extension-heading";
import { Placeholder } from "@tiptap/extension-placeholder";
import { getCurrentEntryId } from "../../stores/journalSlice";
import { RootState } from "../../stores/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Entry as EntryType } from "../../types/entry.type";

const TiptapEditor = ({ isOpen }: { isOpen: boolean }) => {
  const state: RootState = useSelector((state: RootState) => state);
  const currentEntryId = getCurrentEntryId(state);
  const [saveInterval, setSaveInterval] = useState<NodeJS.Timer>();

  const getTitle = (editor: Editor | null) => {
    return "MockTitle";
  };
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
    window.databaseAPI.getEntry(currentEntryId).then((result: EntryType) => {
      if (result) {
        let parsedJSON;
        try {
          parsedJSON = JSON.parse(result?.content);
        } catch {
          console.log("could not parse");
        }
        editor?.commands.setContent(parsedJSON || result?.content);
      }
      clearInterval(saveInterval);
      setSaveInterval(
        setInterval(() => {
          if (currentEntryId !== null) {
            window.databaseAPI.updateEntry({
              id: currentEntryId,
              title: getTitle(editor),
              content: JSON.stringify(editor?.getJSON()),
            });
          }
        }, 10000),
      );
    });
  }, [editor, currentEntryId]);

  useEffect(
    () => () => {
      clearInterval(saveInterval);
    },
    [],
  );

  const markdownOutput = editor?.storage.markdown.getMarkdown();

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
