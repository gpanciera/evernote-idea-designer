import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Note from './Note.jsx';
// import Draggable from 'react-draggable';
// import { useSpring, animated } from 'react-spring'
// import { useGesture, withGesture, Gesture } from 'react-with-gesture'

// http://reactcommunity.org/react-modal/accessibility/
ReactModal.setAppElement('#root');

class Noteboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotNotes: false,
      notes: [],
      showModal: false,
      isDragging: false,
      modalIndexToView: 0,
    }
    // this.clickHandler = this.clickHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    // this.onDrag = this.onDrag.bind(this);
    // this.onDragStop = this.onDragStop.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }
  escFunction(e) {
    if(e.keyCode === 27) {
      this.setState({ showModal: false });
    }
  }

  // onDrag(e) {
  //   this.setState({...this.state, isDragging: true})
  //   console.log("Noteboard -> onDrag -> this.state", this.state)
  // }

  // onDragStop (e) {
  //   // HACK: add some delay otherwise a click event is sent
  //   console.log("onDragStop called")
  //   // setTimeout((obj) => { obj.isDragging = false }, 200, this)
  //   this.setState({...this.state, isDragging: false})
  // }

  handleClick (i) {
    console.log("Noteboard -> handleClick -> i", i)
    // if(!this.state.isDragging) 
    this.setState({ showModal: true, modalIndexToView: i });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    
    fetch('/api/')
      .then( res => res.json())
      .then( notes => {
        if (!Array.isArray(notes)) notes = [];

        return this.setState({
          notes,
          gotNotes: true
        });
     });
  
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    if (!this.state.gotNotes) return (
        <div>
        <h1>Loading data, please wait...</h1>
      </div>
    );
    
    const { notes } = this.state;
    
    if (!notes) return null;
    
    if (!notes.length) return (
      <div>No notes found</div>
      );
      
    const allNotes = notes.map((note, i) => {
      return ( 
            <Note key={i} note={note} onClick={() => this.handleClick(i)}/> 
      );
    });
    
    return (
      <div className="mainSection">
        <div className="noteContainer">{ allNotes }</div>
        <ReactModal isOpen={this.state.showModal} 
                    className="modal"
                    overlayClassName="modal-overlay"
                    contentLabel="Test Label" 
                    parentSelector={() => document.querySelector('#root')}>
          {this.state.notes[this.state.modalIndexToView].note}
        </ReactModal>
      </div>
    );
  }
}

export default Noteboard;
