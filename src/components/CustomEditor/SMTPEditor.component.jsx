import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export function SMTPEditor({
  editorState,
  onChange,
  wrapperClassName,
  editorClassName,
  placeholder,
}) {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName={wrapperClassName}
      editorClassName={editorClassName}
      onEditorStateChange={onChange}
      placeholder={placeholder}
      toolbar={{
        options: ['inline', 'image'],
        inline: {
          options: ['bold', 'italic', 'underline'],
          bold: {
            icon: '/icon/smtp/bold.svg',
            className: 'demo-option-custom',
          },
          italic: {
            icon: '/icon/smtp/italic.svg',
            className: 'demo-option-custom',
          },
          underline: {
            icon: '/icon/smtp/underline.svg',
            className: 'demo-option-custom',
          },
        },
        image: {
          icon: '/icon/smtp/image.svg',
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true,
          // uploadCallback: undefined,
          // previewImage: false,
          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          alt: { present: false, mandatory: false },
          defaultSize: {
            height: 'auto',
            width: 'auto',
          },
        },
      }}
    />
  );
}
