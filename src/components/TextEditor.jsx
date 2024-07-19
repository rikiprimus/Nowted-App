import { useState, useEffect } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useApp } from "../hooks/useApp";

const TextEditor = () => {
  const { noteId, note, updateNote } = useApp();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [timeoutId, setTimeoutId] = useState(null);

  // Effect to update the editor state when the note changes
  useEffect(() => {
    if (note) {
      const blocksFromHTML = convertFromHTML(note?.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      if (state !== editorState) {
        setEditorState(EditorState.createWithContent(state));
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [note, noteId]);

  // Function to handle changes in the editor state
  const handleEditorStateChange = (state) => {
    const currentContent = editorState.getCurrentContent();
    const newContent = state.getCurrentContent();

    if (currentContent !== newContent) {
      const selectionState = state.getSelection();
      setEditorState(state);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        const rawContentState = convertToRaw(state.getCurrentContent());
        const htmlContent = draftToHtml(rawContentState);
        updateNote(noteId, { content: htmlContent });
        // Restore the selection state
        const updatedState = EditorState.forceSelection(state, selectionState);
        setEditorState(updatedState);
      }, 300); // 300ms delay

      setTimeoutId(newTimeoutId);
    } else {
      setEditorState(state);
    }
  };

  return (
    <div className="h-full">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName="rd-editor-toolbar"
        editorClassName="w-full h-[650px] overflow-y-auto border-0 border-b-2 border-light-10 dark:border-dark-10 custom-scrollbar"
        toolbar={{
          options: [
            "history",
            "fontFamily",
            "blockType",
            "fontSize",
            "inline",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
          ],
          history: {
            options: ["undo", "redo"],
          },
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
          },
          blockType: { options: ["Normal", "H1", "H2", "H3", "Blockquote"] },
          list: { options: ["unordered", "ordered"], inDropdown: true },
          textAlign: { options: ["left", "center", "right"], inDropdown: true },
        }}
      />
    </div>
  );
};

export default TextEditor;