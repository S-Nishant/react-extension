import React from "react";
import ReactDOM from "react-dom";
import "./Editor.scss";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import parse from 'html-react-parser';

function Editor(props) {
  const {data , taskModified} = props;

  return (
    <div>
      <RichTextEditorComponent
       change={taskModified}>
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
        <>
        {parse(data)}
        </>
      </RichTextEditorComponent>
    </div>
  );
}

export default Editor;
