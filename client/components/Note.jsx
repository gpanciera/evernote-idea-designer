import React, { Component } from 'react';

const Note = (props) => {
  // const summary = JSON.stringify(props.note.summary);
  // const type = JSON.stringify(props.note.type);
  // const note = props.note.note;
  // console.log("Note -> props.note", props.note)
  // console.log("Note -> note", note)
  // const related = props.note.related | []; 
  let balls = {"note": {"_text": "This is a test note bro"}};

  return (
    <div className="noteCard" onClick={ props.clickHandler }>
      <ul className="noteDetailsList">
        {/* <li className="noteDetail">{summary}</li> */}
        <li className="noteDetail"><pre>{balls}</pre></li>
      </ul>
    </div>
  )
}
export default Note;