import "./TextEditor.css";
import { ProseMirror } from "@nytimes/react-prosemirror";
import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { useState } from "react";
import { exampleSetup } from "prosemirror-example-setup";
import { addListNodes } from "prosemirror-schema-list";
import { Schema, DOMParser } from "prosemirror-model";
import placeholder from "../../placeholder/placeholder";

const EDITOR_PLACEHOLDER_TEXT = "Write anything...";
export default function TextEditor({ isOpen }: { isOpen: boolean }) {
  // It's important that mount is stored as state,
  // rather than a ref, so that the ProseMirror component
  // is re-rendered when it's set
  const [mount, setMount] = useState(document.getElementById(""));
  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks,
  });
  const [editorState, setEditorState] = useState(
    EditorState.create({
      doc: mount ? DOMParser.fromSchema(mySchema).parse(mount) : undefined,
      plugins: [
        ...exampleSetup({ schema: mySchema, menuBar: false }),
        placeholder(EDITOR_PLACEHOLDER_TEXT),
      ],
      schema: schema,
    }),
  );

  return (
    <>
      <ProseMirror
        mount={mount}
        state={editorState}
        dispatchTransaction={(tr) => {
          setEditorState((s) => s.apply(tr));
        }}
      >
        <div
          id="editor"
          className={`editor ${isOpen ? "open" : "closed"}`}
          ref={setMount}
        ></div>
      </ProseMirror>
      <div className="container-test"></div>
    </>
  );
}
