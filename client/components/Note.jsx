import React, { Component } from 'react';
import {useSpring, animated} from 'react-spring'

const Note = (props) => {
  const summary = props.note.summary;
  // const type = JSON.stringify(props.note.type);
  // const note = props.note.note;
  // console.log("Note -> props.note", props.note)
  // console.log("Note -> note", note)
  // const related = props.note.related | []; 
  // let balls = {"note": {"_text": "This is a test note bro"}};
  const springy = useSpring({opacity: 1, from: {opacity: 0}});
  
  // onClick={ props.clickHandler }

  return (
    <animated.div style={springy} className="noteCard">
      <ul className="noteDetailsList">
        <li className="noteDetail">{summary}</li>
      </ul>
    </animated.div>
  )
}
export default Note;