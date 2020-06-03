import React, { Component } from 'react';


const Note = (props) => {
  const summary = props.note.summary;
  const type = props.note.type;
  const note = props.note.note;
  const related = props.note.related | []; 

  return (
    <div className="noteCard" onClick={ props.clickHandler }>
      <ul className="noteDetailsList">
        <li className="noteDetail">{summary}</li>
        {/* <li className="noteDetail">Detail: {note}</li> */}
      </ul>
    </div>
  )
}
export default Note;