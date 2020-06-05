import React, { Component } from 'react';
import {useSpring, animated} from 'react-spring'
// import Draggable from 'react-draggable';
import { useDrag } from 'react-use-gesture'

const Note = (props) => {

  const summary = props.note.summary;
    
  // See: https://use-gesture.netlify.app/docs/state
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y }))

  // Bind it to a component
  return ( 
    <animated.div {...bind()} style={{ x, y }} className="noteCard">
      <ul className="noteDetailsList">
        <li className="noteDetail" onClick={props.onClick}>{summary}</li>
      </ul>
    </animated.div>
  )  
}

export default Note;








// import React, { Component } from 'react';
// import {useSpring, animated} from 'react-spring'
// import Draggable from 'react-draggable';
// // import { useDrag } from 'react-use-gesture'

// const Note = (props) => {

//   const summary = props.note.summary;
//   const springy = useSpring({opacity: 1, from: {opacity: 0}});
  
//   return (
//     <Draggable handle=".noteCard">
//       <animated.div style={springy} className="noteCard">
//         <ul className="noteDetailsList">
//           <li className="noteDetail" onClick={props.onClick}>{summary}</li>
//         </ul>
//       </animated.div>
//     </Draggable>
//   )
// }
// export default Note;