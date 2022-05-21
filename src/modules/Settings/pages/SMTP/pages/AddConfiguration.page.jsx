import { EditorState } from 'draft-js';
import { useState } from 'react';

import { SMTPEditor } from 'components';
import './styles.scss';

const ConfigurationEditor = ({ editorState, onEditorStateChange }) => {
  return (
    <div className="configuration-editor">
      <div className="configuration-editor__container">
        <SMTPEditor
          editorState={editorState}
          wrapperClassName="configuration-editor__container-wrapper"
          editorClassName="configuration-editor__container-editor"
          onChange={onEditorStateChange}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
};

export function AddConfiguration() {
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
  const [editorState3, setEditorState3] = useState(EditorState.createEmpty());

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-[20px] px-[32px] py-[40px]">
      <div className="bg-[#191919]">MAIN EDITOR</div>
      <div className="flex flex-col gap-[20px]">
        <div className="bg-[#1E1E2D] rounded-[8px]">
          <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
            Signature
          </h6>
          <ConfigurationEditor
            editorState={editorState1}
            onEditorStateChange={(state) => setEditorState1(state)}
          />
        </div>
        <div className="bg-[#1E1E2D] rounded-[8px]">
          <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
            Signature
          </h6>
          <ConfigurationEditor
            editorState={editorState2}
            onEditorStateChange={(state) => setEditorState2(state)}
          />
        </div>
        <div className="bg-[#1E1E2D] rounded-[8px]">
          <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
            Signature
          </h6>
          <ConfigurationEditor
            editorState={editorState3}
            onEditorStateChange={(state) => setEditorState3(state)}
          />
        </div>
      </div>
    </div>
  );
}
